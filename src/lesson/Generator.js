/*
* Generator
*
*   1. 基本概念： 异步编程的解决方案（回调、事件、Promise、Generator）
*
*
*   2. next 函数的用法
*
*   3. yield* 的语法
*
*
*    Generator函数 与 Iterator 的关系：
*
*         任意对象的Iterator接口都部署在 Symbol.iterator 属性上
*         Generator函数就是一个遍历器生成函数，所以我们可以直接把它赋值给 Symbol.iterator，从而使这个对象有具备了Interator接口
*
*         总结：使用Generator也可以使用遍历器的返回值
*  */

{
    // 定义 Generator 函数
    let tell = function* () {
        // 与普通函数区别：
        //     1. function 后面多了个 *
        //     2. 函数中有 yield 语句

        yield 'a';  // yield表达式就是暂停标志
        yield  'b';
        return 'c';
    };

    let k = tell();

    // 只有调用next方法才会遍历下一个内部状态
    console.log(k.next());  //    {value: "a", done: false}
    console.log(k.next());  //    {value: "b", done: false}
    console.log(k.next());  //    {value: "c", done: true}
    console.log(k.next());  //    {value: undefined, done: true}

//  执行过程：
//        运行函数tell()时，会在遇到第一个 yield 处停下来，只执行第一个yield之前的语句。
//        等调用next()时，它会去执行第一个yield
//        再执行next()时，它会去执行下一个yield 或者是 return
//        以此类推，从而保证了这个函数体内部看上去是一个异步操作的过程

}

{
    // 对象不具备Iterator接口，但是可以自己部署----这次通过Generator函数方式
    let obj = {};
    obj[Symbol.iterator] = function* () {
        yield 1;
        yield 2;
        yield 3;
    };

    for(let key of obj) {
        console.log(key);   // 1  2  3
    }
}

{
    // A B C 状态机
    let state = function* () {
        while (1) {
            yield 'A';
            yield 'B';
            yield 'C';
        }
    };

    let status = state();

    console.log(status.next()); // {value: "A", done: false}
    console.log(status.next()); // {value: "B", done: false}
    console.log(status.next()); // {value: "C", done: false}
    console.log(status.next()); // {value: "A", done: false}
    console.log(status.next()); // {value: "B", done: false}
}

// async函数
// {
//     // async 函数是什么？一句话，它就是 Generator 函数的语法糖
//     let state = async function () {
//         while (1) {
//             await 'A';
//             await 'B';
//             await 'C';
//         }
//     };
//
//     let status = state();
//
//     console.log(status.next()); // {value: "A", done: false}
//     console.log(status.next()); // {value: "B", done: false}
//     console.log(status.next()); // {value: "C", done: false}
//     console.log(status.next()); // {value: "A", done: false}
//     console.log(status.next()); // {value: "B", done: false}
// }

