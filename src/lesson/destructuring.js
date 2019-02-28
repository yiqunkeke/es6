// 解构赋值

// 1. 数组解构赋值
{
    let a, b;
    [a, b] = [1, 2];
    console.log(a, b);  // 1 2
}

{
    let a, b, rest;
    [a, b, ...rest] = [1, 2, 3, 4, 5];
    console.log(a,b,rest);  // 1 2  [3, 4, 5]
}

// 2. 对象解构赋值
{
    let a, b;
    ({a,b} = {a:1, b:2})
    console.log(a, b); // 1 2
}

// 其它类型的解构赋值都是在这两种之上的延伸。

// 3. 默认值
{
    let a, b, c;
    // 如果不给c赋默认值3，则c为undefined
    [a, b, c=3] = [1, 2];
    // 如果解构赋值没有在结构上成功配对，比如，等号左边是3个元素，右边只有2个，则c没有找到成功配对的值，此时，c的值为undefined,即，只声明了变量c,没有赋值。
    console.log(a, b, c); // 1 2 3
}

// 4. 数组解构赋值--使用场景
{
    // 变量交换---ES5中需要使用中间变量做存储
    let a =1;
    let b = 2;
    [a, b] = [b, a];
    console.log(a,b); // 2 1
}
{
    // 接收多个函数返回值---非常重要的使用场景
    function f() {
        return [1,2]
    }
    let [a, b] = f();
    console.log(a, b); // 1 2
}
{
    //接收部分函数返回值----选择性的接收某两个或者某几个变量
    function f() {
        return [1,2,3,4,5]
    }
    let [a,,,b] = f();
    console.log(a, b); // 1 4
}
{
    //
    function f() {
        return [1,2,3,4,5]
    }
    let [a,...b] = f();
    console.log(a, b); // 1 [2,3,4,5]
}
{
    //
    function f() {
        return [1,2,3,4,5]
    }
    let [a,,...b] = f();
    console.log(a, b); // 1 [3,4,5]
}

// 5. 对象解构赋值
{
    let o = {p:42,q:true};
    // 对象解构时,等号左侧是一个对象,右侧也是对象,它是按照key:value的形式来赋值的
    let {p,q} = o;
    console.log(p,q); // 42  true
}
{
    // 对象解构--默认值
    let {a=10, b=5}= {a:3};
    console.log(a,b); // 3  5
}
{
    //对象解构--使用场景--Json对象------一定要会这个特别常用的使用场景,对象和数组的嵌套
    // 取出meteData的两个 title的值
    let meteData = {
        title:'abc',
        test:[
            {
                title:'test',
                desc:'description'
            }
        ]
    };

    let{
        title:esTitle, // 给title指定一个接收的变量叫esTitle
        test:[
            {
                title:cnTitle // 给这个title指定一个接收的变量叫 cnTitle
            }
        ]
    } = meteData;
    console.log(esTitle, cnTitle); // abc test
}