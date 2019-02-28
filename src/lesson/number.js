// 数值扩展
{
    // 二进制 和 八进制

    // 二进制 都是以 0b或者0B开头的
    console.log(0b111110111);
    console.log(0B111110111);

    // 八进制 都是以 0o 或者0O开头
    console.log(0o767);
    console.log(0O767);
}

{
    // 判断一个值是不是有尽----- Number.isFinite()
    console.log('15',Number.isFinite(15));   // true
    // NaN 本身就不是一个数字
    console.log('NaN',Number.isFinite(NaN));    // false
    // 分母为0的情况
    console.log('15/0',Number.isFinite(15/0));  // false
    // 参数保证必须是一个数（Number类型），否则为 false
    console.log('a',Number.isFinite('a')); // false

    // 判断一个值是否为NaN----- Number.isNaN()
    console.log('NaN',Number.isNaN(NaN));  // true
    console.log('0',Number.isNaN(0));    // false
    // 参数保证必须是一个数（Number类型），否则为false
    console.log('a',Number.isNaN('a'));  // false

    // Number.isFinite() 和 Number.isNaN() 使用频率不是很高
    // 了解它的作用和使用场景即可
}

{
    // 判断是不是整数-----Number.isInteger()
    console.log('25',Number.isInteger(25));  // true
    console.log('25.0',Number.isInteger(25.0));  // true
    console.log('25.1',Number.isInteger(25.1));  // false
}

{
    // 数的最大上限----Number.MAX_SAFE_INTEGER-------是一个常量
    console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991

    // 数的最小下限------是一个常量
    console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991

    // 判断一个数是不是安全的
    // 即是不是在下限--上限，这个范围之内。在则为 true,不在则为false
    console.log('10',Number.isSafeInteger(10));  // true

    // 参数保证必须是一个数（Number类型）
    // 因为 'a'是一个字符串，不是一个数，所以为 false
    console.log('a',Number.isSafeInteger('a'));  // false
}

{
    // 判断带小数的整数部分，并返回整数部分------这个是比较常用的功能

    // Math.trunc方法用于去除一个数的小数部分，返回整数部分(英文：trunc 是截取的意思)
    console.log('4.1', Math.trunc(4.1));    // 4
    console.log('4.9', Math.trunc(4.9));   // 4
}

{
    // 判断一个数到底是正数、负数、还是零 ------Math.sign()
    // 返回结果4种： -1， 0 ， 1， NaN
    console.log('-5',Math.sign(-5)); // -1
    console.log('0',Math.sign(0));  // 0
    console.log('5',Math.sign(5)); // 1
    console.log('50',Math.sign('50')); // 1
    console.log('foo',Math.sign('foo')); // NaN
}

{
    // 立方根
    console.log('-1', Math.cbrt(-1)); //  -1
    console.log('8', Math.cbrt(8)); // 2

    // 新增了 三角函数，对数 方法，自行查询 API 进行学习
}