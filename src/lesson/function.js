// 函数扩展
/*
*  参数默认值、rest参数、扩展运算符、箭头函数、this绑定、尾调用
* */

// 1. 参数默认值
{
    // 在有默认值的参数后面，不可以再有另一个不具备默认值的参数
    // 但可以有另一个具备默认值的参数
    function test(x, y = 'world') {
        console.log('默认值', x, y)
    }
    // 当没有传y时，y的默认值为 world
    test('hello')   // hello world
}

    // 作用域概念---与函数参数相关
{
    let x = 'test'
    function test2(x, y = x) {
        console.log('作用域', x, y)
    }
    test2('kill') // kill kill
    test2() // undefined undefined

    function test3(c, y = x) {
        console.log('作用域', c, y)
    }
    test3('kill')   // kill test
}

// 2. rest 参数
// 把离散的值，变成一个数组
{
    // ...rest：在参数不确定的情况下，
    // 把传递进来的参数，转为一个数组为rest
    function test4(...rest) {
        for (let item of rest) {
            console.log('rest参数', item)
        }
    }
    test4(1, 2, 3, 4, 'a')

    // 提示：...rest 参数后面不能再有其它的参数了，否则报错

    // 和 ES5中的arguments 有异曲同工之妙，
    // 区别是 ...rest不会有 arguments[0]的问题
}

// 3. 扩展运算符
// 扩展运算符与 rest参数 可以理解为 逆运用
{
    // 把数组拆成离散的值
    console.log(...[1, 2, 4]) //  1   2   4
    console.log('a',...[1, 2, 4])   // a  1  2  4

}

// 4. 箭头函数----革命性的函数，非常重要
{
    // 1. arrow 为函数名
    // 2. v 为函数参数
    // 3. v * 2 为函数返回值
    let arrow = v => v * 2;
    console.log('箭头函数arrow', arrow(3))

    // 如果没有参数，则用 () 代替 v
    let arrow2 = () => 5
    console.log('箭头函数arrow', arrow2())

    // 但是，用箭头函数时，一定要注意 this 绑定
}

// 5. 尾调用----理解概念
// 函数的最后一句话，是不是一个函数
{
    function tail(x) {
        console.log('tail', x)
    }
    function fx(x) {
        return tail(x)
    }
    fx(123); // tail 123
}
// 建议：提升性能
