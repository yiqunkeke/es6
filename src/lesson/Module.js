// ES6 模块化
/*
*  1.基本概念
*  2.ES6的模块化语法
*       引入模块---使用 import
*       导出模块---使用 export
* */

export let A=123;
export function test() {
    console.log('test')
}
export class Hello {
    test(){
        console.log('class')
    }
}

/*
*   1. 传统的模块加载方案：CommonJS（用于服务器）、AMD（用于浏览器）。
*                       特点：只能在运行时确定这些东西。
*
*   2. ES6 Module:
*           编译时就能确定模块的依赖关系，以及输入和输出的变量。
*
* */

{
    // CommonJS模块
    // let { stat, exists, readFile } = require('fs');
    //
    // let _fs = require('fs');
    // let stat = _fs.stat;
    // let exists = _fs.exists;
    // let readFile = _fs.readFile;
}