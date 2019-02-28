// 数组新增特性
    // Array.from
    // Array.of
    // copyWithin
    // find / findIndex
    // fill
    // entries\keys\values
    // includes

{
    // 用于将一组值，转换为数组-------Array.of()
    let arr = Array.of(3,4,7,9,11);
    console.log('arr=',arr); // [3,4,7,9,11]

    let empty = Array.of();
    console.log('empty=',empty); // []
}

{
    //Array.from方法用于将两类对象转为真正的数组：
    // 类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）

    let arrayLike = {
        '0': 'a',
        '1': 'b',
        '2': 'c',
        length: 3
    };
    console.log(Array.from(arrayLike));

    // Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组
    console.log(Array.from([1,3,5],item => item*2)); // [2, 6, 10]
}

{
    // 填充数组
    // fill方法使用给定值，填充一个数组。
    console.log('fill-7',[1,'a',undefined].fill(7)); // [7,7,7]

    // fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置(不包含结束位置)。
    console.log('fill-7-pos', [1,'a',undefined].fill(7,1,2));    // [1,7,undefined]
}

{
    // 数组遍历相关的 api

    // 1.keys()是对键名的遍历
    for(let key of ['a', 'b', 'c'].keys()){
        console.log(key);    // 0    1    2
    }

    // 2.values()是对键值的遍历
    // values()存在兼容性问题
    for(let value of ['a', 'b', 'c'].values()){
        console.log(value);    //  a   b   c
    }

    // 3.entries()是对键值的遍历
    // entries是不存在兼容性问题的,建议使用entries
    for(let [key, value] of ['a', 'b', 'c'].entries()){
        console.log(key, value);  // 0 "a"   1 "b"   2 "c"
    }
}

{
    // 数组实例的copyWithin()，
    // 在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。
    // 也就是说，使用这个方法，会修改当前数组。
    console.log([1,2,3,4,5].copyWithin(0,3,4))  // [4, 2, 3, 4, 5]

    // 这个的使用频率不高，使用场景也不多
}

{
    // find 和 findIndex

    // 1.find 只找出第一个符合的值，就返回，不会继续找
    console.log([1,2,3,4,5,6].find(item =>{
        return item > 3
    }));
    // 4

    // findIndex 只找出第一个符合的值的下标，就返回，不会继续找
    console.log([1,2,3,4,5,6].findIndex(item => {
        return item > 3
    }));
    // 3

}

{
    // includes
    // 返回布尔值
    // find更强大，可以自定义条件
    console.log('number', [1,2,NaN].includes(1))    // true
    console.log('number', [1,2,NaN].includes(NaN))    // true
}

// 总结：string 和 array 这两个是使用频率比较高的
// 建议大家多练习，记住