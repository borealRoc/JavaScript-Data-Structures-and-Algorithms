// 1. 高级函数：函数的参数是函数或返回值是函数

// 2. 数组中的高阶函数
/**
 * 
 * 2.1 排序方法：sort([compareFunction])：如果省略 compareFunction，元素按照转换为的字符串的各个字符的 Unicode 位点进行排序
 * 2.2 搜索方法
 * find(callback(element[, index[, array]])[, thisArg])：返回数组中满足 callback 的第一个元素的值。否则返回 undefined
 * findIndex(callback(element[, index[, array]])[, thisArg])：返回数组中满足 callback 的第一个元素的索引。否则返回 -1
 * 2.3 迭代方法
 * every(callback(element[, index[, array]])[, thisArg])：测试一个数组内的所有元素是否都能通过 callback 的测试。返回一个布尔值
 * some(callback(element[, index[, array]])[, thisArg]): 测试数组中是不是至少有1个元素通过 callback 的测试。返回一个布尔值
 * filter(callback(element[, index[, array]])[, thisArg])：返回数组的元素满足 callback 测试组成的数组
 * map(callback(element[, index[, array]])[, thisArg])：返回数组中的每个元素调用 callback 后的新数组
 * forEach(callback(element[, index[, array]])[, thisArg])：对数组中的每个元素执行 calllback
 * 2.4 归并方法
 * reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])：对数组中的每个元素（从左往右）执行 callback 函数，将其结果汇总为单个返回
 * reduceRight(callback(accumulator, currentValue[, index[, array]])[, initialValue])：对数组中的每个元素（从右往左）执行 callback 函数，将其结果汇总为单个返回
 */

const { valid_array, valid_function, to_object, get_length } = require('../../utils/methods')


// 手动实现 sort

// 手动实现 find
Array.prototype._find = function (callback, thisArg) {
    // 1. 数组异常，函数异常校验
    valid_array(this, '_find')
    valid_function(callback)
    // 2. 数组转对象
    const obj = to_object(this)
    const len = get_length(this)
    // 3. 迭代数组，返回数组中满足 callback 的第一个元素的值
    for (let i = 0; i < len; i++) {
        if (i in obj) {
            const item = obj[i]
            if (callback.call(thisArg, item, i, obj)) {
                return item
            }
        }
    }
    // 4. 找不到返回 undefined
    return undefined
}

// 手动实现 findIndex
Array.prototype._findIndex = function (callback, thisArg) {
    // 1. 数组异常，函数异常校验
    valid_array(this, '_findIndex')
    valid_function(callback)
    // 2. 数组转对象
    const obj = to_object(this)
    const len = get_length(this)
    // 3. 迭代数组，返回数组中满足 callback 的第一个元素的索引
    for (let i = 0; i < len; i++) {
        if (i in obj) {
            const item = obj[i]
            if (callback.call(thisArg, item, i, obj)) {
                return i
            }
        }
    }
    // 4. 找不到返回 -1
    return -1
}

// 手动实现 every
Array.prototype._every = function (callback, thisArg) {
    // 1. 数组异常，函数异常校验
    valid_array(this, '_every')
    valid_function(callback)
    // 2. 数组转对象
    const obj = to_object(this)
    const len = get_length(this)
    // 3. 迭代数组，测试是否每一个元素都能通过 callback 测试
    for (let i = 0; i < len; i++) {
        if (i in obj) {
            const item = obj[i]
            // 4. 只要有一个不满足，则返回false
            if (!callback.call(thisArg, item, i, obj)) {
                return false
            }
        }
    }
    // 5. 全都满足返回 true
    return true
}

// 手动实现 some
Array.prototype._some = function (callback, thisArg) {
    // 1. 数组异常，函数异常校验
    valid_array(this, '_some')
    valid_function(callback)
    // 2. 数组转对象
    const obj = to_object(this)
    const len = get_length(this)
    // 3. 迭代数组，测试是否有元素都能通过 callback 测试
    for (let i = 0; i < len; i++) {
        if (i in obj) {
            const item = obj[i]
            // 4. 只要有一个满足，则返回 true
            if (callback.call(thisArg, item, i, obj)) {
                return true
            }
        }
    }
    // 5. 全都不满足返回 false
    return false
}

// 手动实现 filter
Array.prototype._filter = function (callback, thisArg) {
    // 1. 数组异常，函数异常校验
    valid_array(this, '_filter')
    valid_function(callback)
    // 2. 数组转对象
    const obj = to_object(this)
    const len = get_length(this)
    const filterArr = []
    let filterIndex = 0
    // 3. 迭代数组，把满足 callback 的元素放入 filterArr
    for (let i = 0; i < len; i++) {
        if (i in obj) {
            const item = obj[i]
            if (callback.call(thisArg, item, i, obj)) {
                filterArr[filterIndex++] = item
            }
        }
    }
    // 4. 返回过滤后的数组
    return filterArr
}

// 手动实现 map
Array.prototype._map = function (callback, thisArg) {
    // 1. 数组异常，函数异常校验
    valid_array(this, '_map')
    valid_function(callback)
    // 2. 数组转对象
    const obj = to_object(this)
    const len = get_length(this)
    const mapArr = []
    // 3. 迭代数组，对数组的每个元素执行 callback 方法
    for (let i = 0; i < len; i++) {
        if (i in obj) {
            mapArr[i] = callback.call(thisArg, obj[i], i, obj)
        }
    }
    // 4. 返回执行后的数组
    return mapArr
}

// 手动实现 reduce
Array.prototype._reduce = function (callback, initialValue) {
    // 1. 数组异常校验
    valid_array(this, '_reduce')
    valid_function(callback)
    // 2. 数组转对象
    const obj = to_object(this)
    const len = get_length(this)
    let accumulator = initialValue
    let i = 0
    // 3. 如果没有传入初值值 initialValue，将数值第一个有效值赋值给 accumulator
    if (initialValue === undefined) {
        for (; i < len; i++) {
            if (i in obj) {
                accumulator = obj[i]
                i++
                break
            }
        }
    }
    // 4. 如果数组全为空
    if (i === len && accumulator === undefined) {
        throw new Error('Each element of the array is empty')
    }
    // 5. 从头到尾迭代数组剩余项，不断对 accumulator 进行 callback 操作，并重新赋值
    for (; i < len; i++) {
        if (i in obj) {
            accumulator = callback.call(undefined, accumulator, obj[i], i, obj)
        }
    }
    // 6. 返回累加结果
    return accumulator
}

// 手动实现 reduceRight
Array.prototype._reduceRight = function (callback, initialValue) {
    // 1. 数组异常校验
    valid_array(this, '_reduceRight')
    valid_function(callback)
    // 2. 数组转对象
    const obj = to_object(this)
    const len = get_length(this)
    let accumulator = initialValue
    let i = len - 1
    // 3. 如果没有传入初值值 initialValue，将数值倒数第一个有效值赋值给 accumulator
    if (initialValue === undefined) {
        for (; i >= 0; i--) {
            if (i in obj) {
                accumulator = obj[i]
                i--
                break
            }
        }
    }

    // 4. 如果数组全为空
    if (i === 0 && accumulator === undefined) {
        throw new Error('Each element of the array is empty')
    }
    // 5. 从尾到头迭代数组剩余项，不断对 accumulator 进行 callback 操作，并重新赋值
    for (; i >= 0; i--) {
        if (i in obj) {
            accumulator = callback.call(undefined, accumulator, obj[i], i, obj)
        }
    }
    // 6. 返回累加结果
    return accumulator
}
