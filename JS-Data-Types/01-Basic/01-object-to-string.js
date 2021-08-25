const obj1 = {
    toString() {
        return 1
    },
    valueOf() {
        return 2
    },
    [Symbol.toPrimitive]() {
        return NaN
    }
}
console.log(obj1.toString()) //1
console.log(String(obj1)) //NaN

const obj2 = {
    valueOf() {
        return 1
    }
}
console.log(obj2.toString()) //[object Object]
console.log(String(obj2)) //[object Object]