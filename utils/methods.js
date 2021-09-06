module.exports = {
    // 处理数组类型异常
    valid_array(arr, method) {
        if (arr === null || arr === undefined) {
            throw new Error(`Cannot red property '${method}' of null or undefined`)
        }
    },
    // 处理函数异常
    valid_function(fn) {
        if (typeof fn !== 'function') {
            console.log(`${fn} is not a function`)
            throw new Error(`${fn} is not a function`)
        }
    },
    // 数组转对象
    to_object(arr) {
        return Object(arr)
    },
    // 获取数组长度
    get_length(arr) {
        return arr.length >>> 0
    },
    // 全等比较
    defaultEqual(a, b) {
        return a === b
    },
    // 大小比较
    defaultCompare(a, b) {
        if (a === b) return 0
        return a < b ? -1 : 1
    }
}
