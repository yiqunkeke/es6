/*
*  Promise 是异步编程的解决方案。比传统的解决方案---回调函数和事件--更合理，更强大。
*
*   1.什么是异步？
*   2.Promise的作用
*   3.Promise的基本用法
*
*
*   4. Promise定义：理解为一个容器，里面保存着某个未来才会结束的事件的结果（通常是一个异步操作的结果）。
*   从语法上说，Promise是一个对象，从它可以获取异步操作的消息。
*
*   5. Promise对象特点：
*
*       5.1 对象的状态不受外界影响。
*           Promise 对象代表一个异步操作，有三种状态：pending(进行中)、fulfilled(已成功)、rejected(已失败)。
*           只有异步操作的结果，可以决定当前是哪一种状态，任何其它操作都无法改变这个状态。这也是Promise这个名字的由来。（它的英语意思就是‘承诺’，表示其它手段无法改变）
*
*       5.2 一旦状态改变，就不会再变，任何时候都可以得到这个结果。
*           Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。
*           只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为resolved(已定型)。
*           如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。
*
*  6. 优点：
*       有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。
*
*   * */


{
    // ES5中通过回调函数来实现异步编程
    let ajax = function (callback) {
        // ajax 执行完之后，我们要执行下一个步骤，也就是我们这里的参数callback回调函数
        console.log('执行');
        setTimeout(function () {
            callback&&callback.call()
        },1000);
    };
    ajax(function () {
        console.log('timeout1');
    })

    // 结果是：先输出 ‘执行’，1s以后，才执行了回调函数callback,输出 'timeout1'
}

{
    // ES6--Promise
    let ajax = function () {
      console.log('执行2');
      // ajax函数运行完以后，不再执行回调了，而是返回了一个对象（也就是Promise实例），这个实例有then方法，表示去执行下一步的功能。
      return new Promise(function (resolve, reject) {
          // resolve表示要执行下一步的操作，
          // reject 表示要中断当前的操作
          setTimeout(function () {
              resolve();
          },1000)
      })
    };

    ajax().then(function () {
        console.log('timeout2')
    })

    // 结果：先输出 '执行2'，1s以后输出 'timeout2'

}

{
    // Promise实现多步：A完成后执行B, B完成后再去执行C...

    let ajax = function () {
        console.log('执行3');
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve();
            },1000)
        })
    };

    ajax()
        .then(function () {
            return new Promise(function (resolve,reject) {
                setTimeout(function () {
                    resolve()
                }, 2000)
            })
        })
        .then(function () {
            console.log('timeout3')
        })

    // 结果： 首先输出 '执行3'，3s以后输出‘timeout3’
}

{
    // 关于串行，如何捕获中间的错误？---Promise提供了catch方法
    let ajax = function (num) {
        console.log('执行4');
        return new Promise(function (resolve, reject) {
            if(num > 5){
                resolve();
            } else {
                throw new Error('出错了');
            }
        })
    };

    ajax(6)
        .then(function () {
            console.log(6);
        })
        .catch(function (err) {
            console.log(err);
        })

    ajax(3)
        .then(function () {
            console.log(3);
        })
        .catch(function (err) {
            console.log(err);
        })
}

{
    // Promise 高级用法：Promise.all 和 Promise.race
    // 所有的图片加载完再添加到页面

    // 加载图片
    function loadImg(src) {
        return new Promise((resolve, reject) => {
            let img = document.createElement('img');
            img.src = src;
            img.onload = function () {
                resolve(img);
            };
            img.onerror = function (err) {
                reject(err);
            }
        })
    }

    // 显示图片
    function showImgs(imgs) {
        imgs.forEach(function (img) {
            document.body.appendChild(img);
        })
    }

    // Promise.all 表示，把多个 Promise实例当作一个Promise实例
    // 把三个图片加载动作，放在 Promise.all()函数里面,生成一个新的Promise实例
    Promise.all([
        // loadImg 本身是一个Promise实例（做一个图片加载的动作）
        loadImg('http://cocosite.cn/demo/fcxMobile/images/indexImgSC01.jpg'),
        loadImg('http://cocosite.cn/demo/fcxMobile/images/indexImgSC02.jpg'),
        loadImg('http://cocosite.cn/demo/fcxMobile/images/indexImgSC03.jpg')
    ])
        // 当三个图片都加载完以后，才会触发显示图片showImgs的这个下一步
        .then(showImgs)
}

{
    // Promise.race()与 Promise.all()相反
    // 有一个图片加载完就添加到页面

    // 加载图片
    function loadImg(src) {
        return new Promise((resolve, reject) => {
            let img = document.createElement('img');
            img.src = src;
            img.onload = function () {
                resolve(img);
            };
            img.onerror = function (err) {
                reject(err);
            }
        })
    }

    // 显示图片
    function showImgs(img) {
        let p = document.createElement('p');
        p.appendChild(img);
        document.body.appendChild(p);
    }

    // Promise.race
    Promise.race([
        loadImg('http://cocosite.cn/demo/fcxMobile/images/indexImgSC01.jpg'),
        loadImg('http://cocosite.cn/demo/fcxMobile/images/indexImgSC02.jpg'),
        loadImg('http://cocosite.cn/demo/fcxMobile/images/indexImgSC03.jpg')
    ])
        .then(showImgs)
}




