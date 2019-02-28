function test() {
    //知识点 1. let 声明的变量，只在自己的块作用域内有效
    for(let i = 1; i<3; i++){
        console.log(i)
    }
    // 知识点 2. ES6是强制开启了严格模式的
    // ES3、ES5中使用 "use strict"来启动这个文件严格模式
    // 在严格模式中：i 的引用脱离了块作用域，变量未声明，不能被引用，否则就会报引用错误
    // console.log(i);  // 1  2  Uncaught ReferenceError: i is not defined

    // for(var i = 1; i<3; i++){
    //     console.log(i)
    // }
    // console.log(i); // 1  2  3

    // 知识点3：使用 let 定义变量，不能重复定义
    let a=1;
    // let a=2;
}
// test();

function last() {
    // 定义一个常量
    // 常量的含义就是不能修改
    //const PI = 3.1415926;

    // 知识点 1. 使用 const 定义的常量，是不能修改的
    // 可以修改对象，实际指针不变
    // PI=8;
    // console.log(PI)

    // 知识点 2. const 也是有块作用域的

    // 知识点 3. 使用const声明常量时，必须赋值
    // const PI;
    // PI = 8; // Unexpected token(报错： 语句不完整)
}
last()