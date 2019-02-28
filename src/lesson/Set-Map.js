// 数据结构--集合 {}
// Set、Map、WeakSet、WeakMap:

    // 1.Set的用法---当作数组Array:
        //  区别是：Set集合中的元素是不能重复的

    // 2.Map的用法---当作对象Object
        //  区别：对象中的key值必须是字符串，
        //        而 Map中的key值，可以是任意数据类型，如数组、对象

{
    // 声明一个集合变量
    let list = new Set();

    // 向Set集合中增加元素时，要使用 add()方法
    list.add(5);
    list.add(7);

    console.log('list',list); // {5, 7}

    // 使用 size 属性，获取集合中元素的个数
    console.log('size',list.size)   //  2
}

{
    // 另一种声明方式---初始化时,设置默认值
    let arr = [1,2,3,4,5];

    // 把一个数组转为 Set 类型的集合
    let list = new Set(arr);

    console.log('size', list.size);  // 5
}

{
    // 使用场景
    let list = new Set();
    list.add(1);
    list.add(2);

    // 添加重复的元素--不会报错，但同时，添加的元素也不会生效
    list.add(1);

    console.log(list);  // {1, 2}

    // 这个特性可以去重！---很重要的场景
    let arr = [1,2,3,1,'2'];
    let arr2 = new Set(arr);
    console.log('unique',arr2)  // {1, 2, 3, '2'}
}

{
    // Set 的 api---add()、delete()、clear()、has()

    let arr = ['add', 'delete', 'clear', 'has'];
    // 初始化一个Set类型,赋给变量list
    let list = new Set(arr);

    console.log('has',list.has('add')); // true
    console.log('delete', list.delete('add'), list);  // true    {'delete', 'clear', 'has'}
    list.clear(); //
    console.log('list', list);  // {}
}

{
    // Set 的读取--keys()、values()、entries()

    let arr = ['add', 'delete', 'clear', 'has'];
    let list = new Set(arr);

    // keys()
    for(let key of list.keys()){
        console.log('key-',key);    //  add, delete, clear, has
    }

    // 遍历 list.values()等于直接遍历 list
    for(let value of list.values()){
        console.log('value-',value);  //  add, delete, clear, has
    }
    // 可以看出，Set 集合的key值和value值默认是相等的

    // entries()
    for(let entry of list.entries()){
        console.log('entry-',entry);  //  ['add', 'add']    ['delete', 'delete'] ...
    }

    list.forEach(item => console.log(item));
}

// WeakSet
// WeakSet 和 Set 的区别：

//  1.WeakSet 和 Set 的支持的数据类型不一样
//      WeakSet的元素只能是对象，不能是数值、布尔、字符串等类型

//  2.WeakSet 中的对象，都是一个弱引用
//      它不会去检测这个对象，在其它地方有没有用过，意味着，它不会跟垃圾回收挂钩上

//  3. 没有size属性
//  4. 没有clear()方法
//  5. 不能遍历

{
    let weakList = new WeakSet();
    let arg = {};

    // 1. WeakSet的元素只能是对象，不能是数值、布尔、字符串等类型
    weakList.add(arg);
    // weakList.add(2); // 报错
    console.log('weakList',weakList);
}

// Map
{
    let map = new Map();
    let arr = [1, 2, 3];

    // Map 添加元素使用 set()方法
    // 不要跟 Set 添加元素弄混了，Set 添加元素使用 add()----这个地方特别容易记混淆

    // 用数组做 key值
    map.set(arr,456);
    console.log('map', map);  // {Array(3) => 456}

    //获取值使用 .get(key值)
    console.log(map.get(arr));   // 456
}

{
    // 第二种 Map 定义方式
    let map = new Map([['a',123], ['b',456]]);
    console.log('map-args',map); // {"a" => 123, "b" => 456}

    // size属性
    console.log('size',map.size); // 2
    // delete() 删除
    console.log('size',map.delete('a'), map);  // {"b" => 456}
    // clear() 清空
    console.log('size',map.clear(), map)  // {}
}
// Map的遍历跟Set 的 keys(),values(),entries()是一模一样的。-----这里不再赘述

// 接下来讲下 WeakMap()
// 与 Map() 区别：
//  1.WeakMap 和 Map 的支持的数据类型不一样
//      WeakMap 的元素只能是对象，不能是数值、布尔、字符串等类型

//  2.WeakMap 中的对象，都是一个弱引用
//      它不会去检测这个对象，在其它地方有没有用过，意味着，它不会跟垃圾回收挂钩上

//  3. 没有size属性
//  4. 没有clear()方法
//  5. 不能遍历

{
    let weakMap = new WeakMap();
    let o = {};

    // 1. WeakSet的元素只能是对象，不能是数值、布尔、字符串等类型
    weakMap.set(o,123);
    // weakMap.add(2); // 报错
    console.log('weakMap',weakMap); // {{…} => 123}
    console.log(weakMap.get(o));    // 123
}



