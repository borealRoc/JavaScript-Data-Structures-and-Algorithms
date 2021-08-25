// 1. 栈方法
/**
 * 
 * push(element1, ..., elementN)：将一个或多个元素添加到数组的末尾，并返回该数组的新长度
 * pop()：从数组中删除最后一个元素，并返回该元素的值
 */
// 2. 队列方法
/**
 * 
 * push() + shift()：从数组中删除第一个元素，并返回该元素的值
 * 或
 * pop() + unshift(element1, ..., elementN)：将一个或多个元素添加到数组的开头，并返回该数组的新长度
*/
// 3. 万能方法
// splice(start[, deleteCount[, item1[, item2[, ...]]]])：从 start 开始，删除 deleteCount 个元素
// （若省略 deleteCount 则删除从 start 开始的剩余所有元素），并从原地补充新增元素，最后返回被删元素组成的数组


Array.prototype._push = function (...endAdds) {
    // 1. 把 endAdds 逐一添加到原数组后面
    const startLen = this.length
    for (let i = 0; i < endAdds.length; i++) {
        this[startLen + i] = endAdds[i]
    }
    // 2. 返回添加后的数组长度
    return this.length
}

Array.prototype._pop = function () {
    // 1. 暂存原数组最后一项
    const end = this[this.length - 1]
    // 2. 删除最后一项
    this[this.length - 1] = null
    this.length = this.length - 1
    // 3. 返回一开始暂存的最后一项
    return end
}

Array.prototype._unshift = function (...startAdds) {
    // 1. 把原数组的元素逐一后移 startAdds.length 个位置
    const startAddsLen = startAdds.length
    this.length = this.length + startAddsLen
    for (let i = this.length - 1; i >= startAddsLen; i--) {
        this[i] = this[i - startAddsLen]
    }
    // 2. 把 startAdds 逐一添加到原数组前面
    for (let i = 0; i < startAddsLen; i++) {
        this[i] = startAdds[i]
    }
    // 3. 返回添加后的数组长度
    return this.length
}

Array.prototype._shift = function () {
    // 1. 暂存原数组第一项
    const start = this[0]
    // 2. 从第二项开始，把原数组每一项往前移动一个单位
    for (let i = 0; i < this.length - 1; i++) {
        this[i] = this[i + 1]
    }
    this.length = this.length - 1
    // 3. 返回一开始暂存的第一项
    return start
}

Array.prototype._splice = function (startIndex, delCount, ...adds) {
    const initialLen = this.length

    // 1. 缓存被删元素, 并给它们打上标记
    // 1.1 当没传入 delCount 时，delCount 为原数组从 startIndex 开始的剩余元素 
    delCount = delCount || initialLen - startIndex
    const delArr = []
    for (let i = 0; i < delCount; i++) {
        // 1.2 当删除的元素超过原数组的范围，剔除超出部分的 undefined 元素
        if (this[startIndex + i] !== undefined) {
            delArr[i] = this[startIndex + i]
            // 1.3 被删除元素在原数组的位置打上标记
            this[startIndex + i] = 'DELETE_ITEM'
        }
    }

    // 2. 把 adds 从 startIndex 开始，添加到原数组, 再把原数组从 startIndex 开始后的剩余元素进行移动
    const addsLen = adds.length
    const leftLen = initialLen - delCount - startIndex
    // 2.1 如果原数组没有剩余元素，只需把 adds 从 startIndex 开始逐一添加到原数组，而且，数组的长度变成 startIndex + addsLen
    if (leftLen <= 0) {
        for (let i = 0; i < addsLen; i++) {
            this[startIndex + i] = adds[i]
        }
        this.length = startIndex + addsLen
    } else {
        // 2.2 如果原数组有剩余元素, 把 adds 从 startIndex 开始逐一添加到原数组后，再把剩余元素依次移动 addsLen - delCount 个位置
        // 而且，数组的长度变成 initialLen - delCount + addsLen
        
        // 2.2.1 缓存剩余元素
        const leftArr = []
        for (let i = 0; i < leftLen; i++) {
            leftArr[i] = this[startIndex + delCount + i]
        }
        // 2.2.2 增添增加元素
        for (let i = 0; i < addsLen; i++) {
            this[startIndex + i] = adds[i]
        }
        // 2.2.3 补上剩余元素
        for (let i = 0; i < leftArr.length; i++) {
            this[startIndex + addsLen + i] = leftArr[i]
        }
        // 2.2.4 最后数组的长度变成 initialLen - delCount + addsLen
        this.length = initialLen - delCount + addsLen
        // 2.2.5 释放 leftArr
        leftArr.length = 0
    }

    // 3. 返回被删元素组成的数组
    return delArr
}