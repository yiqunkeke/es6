// 对象的扩展
// 简洁表示法、属性表达式、扩展运算符、Object 新增方法

// 简洁表示法
{
    let o = 1;
    let k = 2;
    let es5 = {
        o: o,
        k: k
    };
    let es6 = {
        o,
        k
    };
    console.log(es5,es6);

    // 如果对象中有方法
    let es5_method = {
        hello: function () {
            console.log('es5_method','hello')
        }
    };
    let es6_method = {
        hello(){
            console.log('es6_method','hello')
        }
    };
    es5_method.hello()  // hello
    es6_method.hello()  // hello
}

// 属性表达式
{
    let a = 'b';
    let es5_obj = {
        a: 'c'
    };
    let es6_obj = {
        [a]: 'c'    //  b : 'c'
    };
    console.log(es5_obj, es6_obj);
}

// 新增api
{
    // 1. Object.is()---比较两个值是否相等，与 === 严格等于作用相同
    // 比较字符串
    console.log(Object.is('abc','abc'),'abc'==='abc')   // true
    // 比较数组--数组是引用类型
    // 虽然是两个空数组，在值上都是空，
    // 但是这两个数组引用的是两个不同的地址，所以在严格意义上讲，它俩不相等
    console.log(Object.is([],[]),[]===[]);   // false

    // 2. Object.assign()---拷贝
    // Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。
    console.log(Object.assign({a:'a'},{b:'b'})); // {a: "a", b: "b"}
    // 把第二个（源）对象中的属性，拷贝到第一个（目标）对象中，并返回一个新的对象

    // 注意：
    //  Object.assign()是浅拷贝---引用类型的话，只修改引用地址，而不是把所有的值拷贝
    //  只拷贝自身对象上的属性，不会拷贝继承的属性
    //  不会拷贝“不可枚举”的属性---->查阅ES5中对“不可枚举”的定义

    // 3. Object.entries()---对象名值对
    let test = {
        k: 123,
        o: 456
    };
    for(let [key, value] of Object.entries(test)) {
        console.log([key, value])
    }

    // 4.Object.values()--- 对象值的遍历
    // ES7的提案，有兼容性问题, 建议使用 Object.entries(),而不要使用values()
}

{
    // 扩展运算符
    // babel支持不是很友好，可能用不到

    let {a,b,...c} = {a:'test',b:'kill',c:'ddd',d:'ccc'};
    console.log(a); // test
    console.log(b); // kill
    console.log(c);  // {c:'ddd',d:'ccc'}
}