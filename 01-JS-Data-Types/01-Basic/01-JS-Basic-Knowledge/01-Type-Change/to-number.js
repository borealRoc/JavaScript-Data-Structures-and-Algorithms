console.log(Number(null)) // 0
console.log(Number(undefined)) // NaN
console.log(null == 0) // false

// 保2
let a = 10
let b1 = Number(a.toString(2))
let b2 = parseInt(b1, 2)
console.log(b1) // 1010
console.log(b2) // 10

// 忽8
let c = '070'
console.log(Number(c)) // 70

// 处16
let d = '0x10'
console.log(Number(d)) // 16

// 有效的浮点数
let e = '1.2'
let f = '1.2.3'
console.log(Number(e)) // 1.2
console.log(Number(f)) // NaN

// Number(对象)
const obj1 = {
    toString() {
        return 1
    },
    valueOf() {
        return 2
    },
    [Symbol.toPrimitive]() {
        return 3
    }
}
const obj2 = {
    toString() {
        return 1
    },
    valueOf() {
        return 2
    }
}
const obj3 = {
    toString() {
        return 1
    }
}
const obj4 = {
    toString() {
        return 1
    },
    valueOf() {
        return NaN
    },
}
console.log(Number(obj1)) //3
console.log(Number(obj2)) // 2
console.log(Number(obj3)) // 1
console.log(Number(obj4)) // NaN
