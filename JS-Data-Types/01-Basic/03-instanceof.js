// 1. 利用 typeof + instanceof 区分对象，数组和null
const extendInstanceOf = obj => {
    if (typeof obj === 'object' && obj instanceof Object && !(obj instanceof Array)) return 'Objecct'
    if (typeof obj === 'object' && obj instanceof Array) return 'Array'
    if (typeof obj === 'object' && !(obj instanceof Object)) return 'Null'
    return 'Else Type'
}
console.log(extendInstanceOf({})) // Objecct
console.log(extendInstanceOf([])) // Array
console.log(extendInstanceOf(null)) // Null

// 2. 手动实现 instanceof
function myInstanceOf(left, right) {
    // 1. 如果左侧不是对象，返回 false
    if (typeof left !== 'object' || left == null) return false

    // 2. 获取 left 的原型
    let proto = Object.getPrototypeOf(left)

    // 3. 重复查找：看右侧的 prototype 属性是否出现在左侧对象的原型链上
    while (true) {
        if (proto == null) return false
        if (proto == right.prototype) return true
        proto = Object.getPrototypeOf(proto)
    }
}
console.log(myInstanceOf({}, Object)) // true
console.log(myInstanceOf([], Object)) // true
console.log(myInstanceOf({}, Array)) // false
console.log(myInstanceOf([], Array)) // true
console.log(myInstanceOf(null, Object)) // false