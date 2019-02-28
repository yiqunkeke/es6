{
    //ES3、ES5中默认参数的写法
    function f(x,y,z) {
        if(y===undefined){
            y=7
        }
        if(z===undefined) {
            z=42
        }
        return x+y+z
    }
    console.log(f(1,3)); // 46
}

{
    // ES6 默认参数
    function f(x,y=7,z=42) {
        return x+y+z
    }
    console.log(f(1)); // 50
}

{
    // 对函数必传参数的校验
    function checkParams() {
        throw new Error(`can't be empty`)
    }
    function f(x=checkParams(), y=7, z=42) {
        return x+ y + z
    }
    console.log(f(1)); // 如果不传x,则报错
}


{
    // ES3,ES5 可变参数
    function f(x) {
        console.log(x);
        // 当参数不固定时，ES3和ES5中借助arguments
        // 把传进来的参数，转成一个数组
        var a = Array.prototype.slice.call(arguments);
        var sum = 0;
        a.forEach(function (item) {
            sum += item
        })
        return sum;
    }
    console.log(f(1,2,3,6))
}

{
    //ES6中 可变参数
    function f(...a) {
        // ... 是扩展运算符
        // a 表示可变参数的列表，是一个数组
        var sum = 0;
        a.forEach(item => {
            sum += item
        })
        return sum;
    }
    console.log(f(1,2,3,6))
}

{
    // ES3,ES5 合并数组
    var params = ['hello', true, 7];
    var other = [1,2].concat(params);
    console.log(other);
}

{
    // ES6 利用扩展运算符合并数组
    var params = ['hello', true, 7];
    var other = [1,2,...params];
    console.log(other);
}