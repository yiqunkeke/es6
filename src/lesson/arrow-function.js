{
    // ES3, ES5
    var evens = [1,2,3,4,5];
    var odds = evens.map(function (v) {
        return v+1
    })
    console.log(evens, odds)
}

{
    // ES6
    let evens = [1,2,3,4,5];
    let odds = evens.map(v => v + 1);
    console.log(evens,odds)
}

{
    // ES3, ES5
    var factory = function () {
        this.a = 'a';
        this.b = 'b';
        this.c = {
            a: 'a+',
            b: function () {
                return this.a
            }
        }
    }
    console.log(new factory().c.b()) // a+
    //总结：this的指向是该函数被调用的对象；
    // 也就是说，函数被谁调用，this,就指向谁
    // b()是c这个对象调用的，所以b里面的this,指向的是c对象。那么this.a = c.a
    // 所以结果是 a+
}

{
    var factory = function () {
        this.a = 'a';
        this.b = 'b';
        this.c = {
            a: 'a+',
            b: () => {
                // 箭头函数体中this的指向，是定义时this的指向
                // 理解： 在定义b()时，this指向的是函数体中的this,也就是指向构造函数中的实例 new factory()
                // 那么 this.a = new factory().a
                // 所以结果是 a
                return this.a
            }
        }
    }
    console.log(new factory().c.b()) // a
}

// 讲解：
/*      ()=>{}
*       小括号()是用来存放参数的，当参数只有一个时，可以省略小括号()
*       当花括号{}中的表达式作为返回值，直接返回时，也可以省略花括号{}
*
*  与普通函数的区别：
*       在于 this 的绑定
*
*
* */