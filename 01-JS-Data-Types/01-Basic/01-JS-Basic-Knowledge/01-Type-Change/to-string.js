// 对象转字符串
// 不会调用 valueOf()
const obj1 = {
    valueOf() {
        return '1'
    }
}
console.log(String(obj1))  // '[object Object]'
console.log(obj1.toString()) // '[object Object]'
console.log(obj1.valueOf()) // '1'

// 优先调用 toPrimitive()
const obj2 = {
    toString() {
        return '11'
    },
    [Symbol.toPrimitive]() {
        return '22'
    }
}
console.log(String(obj2))  // '22'
console.log(obj2.toString()) // '11'
