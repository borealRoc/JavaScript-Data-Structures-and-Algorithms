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
    },
    // 转字符串
    defaultString(val) {
        return String(val)
    },
    // 散列函数
    defaultHashCode(key) {
        if (typeof key === 'number') return key
        const strKey = String(key)
        let hash = 0
        for (let i = 0; i < strKey.length; i++) {
            hash += strKey.charCodeAt(i)
        }
        return hash % 37
    },
    // djb2散列函数
    djb2HashCode(key) {
        const strKey = String(key)
        let hash = 5381
        for (let i = 0; i < strKey.length; i++) {
            hash = hash * 33 + strKey.charCodeAt(i)
        }
        return hash % 1013
    }
}
