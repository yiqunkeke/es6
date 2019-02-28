// 字符串扩展
{
    // 判断一个字符串中是否包含某些字符串
    let str = 'string';
    console.log(str.includes('c'));  // false

    // 判断一个字符串是否以某个字符为起始
    console.log(str.startsWith('str'));  // true

    // 判断一个字符串是否以某个字符为结尾
    console.log(str.endsWith('ng')); // true

}

{
    // 重复字符串
    let str = 'abc';
    console.log(str.repeat(2));  // abcabc
}

{
    // 模板字符串----非常重要！
    let name = 'list';
    let info = 'hello world';

    // 使用``包起来，里面的变量使用${}包起来
    let m = `I am ${name}, ${info}`;
    console.log(m); // I am list, hello world
}

{
    // padStart 和 padEnd-----非常重要！
    //  ES7草案，需要配合 babel-polyfill
    console.log('x'.padStart(2,'a'));    // ax
    console.log('x'.padEnd(2,'a')); // xa
    // 常用于日期格式补白  3 --> 03
}

{
    // 标签模板
    // 1. 怎么用？ 2.在哪里用？
    let user = {
        name: 'list',
        info: 'hello world'
    };

    // abc`I am ${user.name}, ${user.info}`
    //
    // function abc(s, v1, v2) {
    //     console.log(s, v1, v2)
    // }
}

{
    // String.raw
    // 使用的频率不是很高----了解一下作用即可

    // 换行没有生效
    console.log(String.raw`Hi\n${1+2}`); // Hi\n3

    // 换行生效
    console.log(`Hi\n${1+2}`);   // Hi
                                // 3
}