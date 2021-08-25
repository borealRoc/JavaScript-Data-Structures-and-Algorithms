const obj1 = {
    toString() {
        return 1
    },
    valueOf() {
        return 2
    } 
}
const obj2 = {
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
const obj3 = {
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
const obj4 = {
    toString() {
        return 1
    },
    valueOf() {
        return NaN
    }
}
const obj5 = {}
console.log(Number(obj1)) // 2
console.log(Number(obj2))  // 3
console.log(Number(obj3))  // NaN
console.log(Number(obj4))  // NaN
console.log(Number(obj5))  // NaN