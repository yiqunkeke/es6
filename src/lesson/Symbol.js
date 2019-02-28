/* Symbol 数据类型，是ES6新增的数据类型
*   1.Symbol 概念：这种数据类型提供一个独一无二的值
*   2.作用：
* */

{
    // 声明
    let a1 = Symbol();
    let a2 = Symbol();

    // Symbol声明的变量，永远是独一无二的
    console.log(a1===a2);   // false

    // Symbol.for()中的参数是key值
    // 使用这个key值时，会先去检查这个key值在全局是否注册过
    // 如果注册过，它就返回那个值。
    // 如果未注册过，我们可以理解为它去调 Symbol() 去生成了一个独一无二的值
    let a3 = Symbol.for('a3');
    let a4 = Symbol.for('a3');
    console.log(a3===a4);   // true
}

// 作用
{
    // 用 key值‘abc’生成一个变量 a1
    let a1 = Symbol.for('abc');
    let obj = {
        // 用 [a1]来取 a1这个变量的值，作为obj对象中的属性名（key值）
        // 不会与第二个'abc'冲突
        [a1]: '123',
        'abc': 345,
        'c': 456
    };
    console.log(obj);

    // 注意：
    // 如果对象中，有用到 Symbol做key值的话，通过 for...in 或者 let...of 都拿不到这个属性
    for(let [key, value] of Object.entries(obj)){
        console.log([key,value]);    // ["abc", 345]  ["c", 456]
    }

    // 那是不是没有办法取到对象中的Symbol变量的属性了呢？
    // 使用 Object.getOwnPropertySymbols(obj) ，返回的是一个数组
    Object.getOwnPropertySymbols(obj).forEach(item => {
        console.log('Symbol-key',item);   // Symbol(abc)
        console.log('Symbol-value',obj[item]);  // 123
    })
    // 但是只拿到了对象中的 Symbol变量的属性，而非 Symbol变量的属性没有拿到，
    // 如果想拿到对象中的所有属性，怎么做呢？

    // 使用Reflect对象的ownKeys()方法，Reflect是ES6中新增的对象
    // 这个方法返回的是一个数组，包含了Symbol变量作为key值的属性，也包含了非Symbol变量的属性
    Reflect.ownKeys(obj).forEach(item=>{
        console.log('all-key',item);
        console.log('all-value',obj[item]);
    })
}