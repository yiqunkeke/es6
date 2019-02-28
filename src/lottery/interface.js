import $ from 'jquery';

// 把所有的接口封装到一个类中，通过实例化以后，这个对象就能拿到所有的接口
// 如果把所有的接口都封装到不同的模块中，会不方便拿到这个接口，而且后期维护也不方便
// 这样做，后期如果要修改，只要找到这个类，就可以了
class Interface {
    // 获取遗漏数据接口
    getOmit(issue){
        // 参数issue代表期号

        // 通过self变量保留this指向，而不是通过在箭头函数中直接用this---这里是特别特别要注意的一点！！！
        // 箭头函数的this指向，是在它定义的时候，而不是运行时候
        let self = this;

        // 调用getOmit之后，就可以使用.then()
        return new Promise((resolve,reject) =>{
           $.ajax({  // jquery用法
               url:'/get/omit',
               data:{
                   issue: issue
               },
               dataType: 'json',
               success: function (res) {

                   // 当前这一步，还有必要把返回的数据保存到当前的对象上，方便在其它地方获取该数据
                   self.setOmit(res.data);
                   // 这个setOmit是我们接下来要创建的类中(其它模块)的一个方法
                   // lottery.js会多重继承 base.js、calculate.js、interface.js、timer.js这4个类
                   // 所以这个setOmit是其它类里面的一个方法


                   // 只有通信成功后才会执行resolve的下一步
                   // 把服务端返回的数据都传给resolve的下一步
                   // 保证了下一步在执行的时候能够取到当前这一步服务端返回来的数据！！！----尤其注意这一点
                   resolve.call(self, res);
               },
               error:function (err) {
                   // 如果出错，则阻塞掉下一步
                    reject.call(err);
               }
           })
        });
    }

    // 获取开奖号码
    getOpenCode(issue) {
        let self = this;
        return new Promise((resolve,reject) => {
            $.ajax({
                url: '/get/opencode',
                data: {
                    issue:issue
                },
                dataType:'json',
                success: function (res) {
                    self.setOpenCode(res.data);
                    resolve.call(self,res);
                },
                error: function (err) {
                    reject.call(err);
                }
            })
        });
    }

    // 获取当前状态
    getState(issue) {
        let self = this;
        return new Promise((resolve,reject) => {
            $.ajax({
                url: '/get/state',
                data: {
                    issue:issue
                },
                dataType:'json',
                success: function (res) {
                    resolve.call(self,res);
                },
                error: function (err) {
                    reject.call(err);
                }
            })
        });
    }

}

export default Interface

/*
*   知识点：
*       1.模块引入---import
*       2.使用class定义类---类中的方法，之间是不需要逗号分隔的
*               而且constructor构建函数也不是必须的：如果不需要特别给对象声明属性，如本例子中，只有方法，
*               没有属性，这时是可以不写constructor的，直接写方法就可以了。
*       3.用Promise对象解决了回调的问题，解决了异步处理的问题。
*       4.箭头函数：
*           this指向
*
*
*
*
*   思路：lottery.js会多重继承 base.js、calculate.js、interface.js、timer.js这4个类
*
*       例如：interface.js模块中，Interface类中的 getOpenCode()方法，在 lottery.js模块中会被继承的，
*       所以lottery.js模块中的实例对象能够直接访问 getOpenCode()方法
*       这也就是为什么我们要把这个接口封装成这3个方法。
*       就是为了方便在继承的类中，通过“对象.方法名”方式直接调用接口。然后使用.then()方式进行下一步操作。
*
*
*
*   该模块的特色：
*       1.通过Interface类里面的方法，返回一个Promise对象从而提供.then()方法，达到了异步操作的效果
*           // 这个是给调用这个对象的外部进行的
*       2.在Promise对象内部调用对象的其它方法传递数据  // 达到数据共享的效果
*           以上两个方面都避免了回调
* */