// ES5中常量的写法
// 在js中全局对象是window
Object.defineProperty(window, 'PI2', {
    value: 3.1415926,
    writable: false
})

console.log(window.PI2)

// result: 赋值无效，因为PI2是window全局对象中的，一个只读常量
// window.PI2 = 4
// 4
// window.PI2
// 3.1415926


//ES6的常量写法
const PI =3.1415926
console.log(PI)
// PI=4