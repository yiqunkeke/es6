// ES5中作用域
var callbacks = []
for(var i=0; i<=2; i++) {
    callbacks[i] = function () {
        return i * 2
    }
}
console.table([
    callbacks[0](),
    callbacks[1](),
    callbacks[2]()
])

// ES6中作用域
const callbacks2 = []
for(let j=0; j<=2; j++) {
    callbacks2[j] = function () {
        return j * 2
    }
}
console.table([
    callbacks2[0](),
    callbacks2[1](),
    callbacks2[2]()
])

