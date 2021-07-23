Array.prototype._myPush = function (...endAdds) {
    // 1. 把 endAdds 逐一添加到原数组后面
    const startLen = this.length
    for (let i = 0; i < endAdds.length; i++) {
        this[startLen + i] = endAdds[i]
    }
    // 2. 返回添加后的数组长度
    return this.length
}

Array.prototype._myUnshift = function (...startAdds) {
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

Array.prototype._myPop = function () {
    // 1. 暂存原数组最后一项
    const end = this[this.length - 1]
    // 2. 删除最后一项
    this[this.length - 1] = null
    this.length = this.length - 1
    // 3. 返回一开始暂存的最后一项
    return end
}

Array.prototype._myShift = function () {
    // 1. 暂存原数组第一项
    const start = this[0]
    // 2. 从第二项开始，把原数组每一项往前移动一个单位
    for (let i = 0; i < this.length; i++) {
        this[i] = this[i + 1]
    }
    this.length = this.length - 1
    // 3. 返回一开始暂存的第一项
    return start
}

Array.prototype._mySplice = function (startIndex, delCount, ...adds) {
    // 1. 缓存被删元素, 并给它们打上标记 
    const delArr = []
    for (let i = 0; i < delCount; i++) {
        // 1.1 当删除的元素超过原数组的范围，剔除超出部分的 undefined 元素
        if (this[startIndex + i] !== undefined) {
            delArr[i] = this[startIndex + i]
            this[startIndex + i] = 'DELETE_ITEM'
        }
    }

    // 2. 把 adds 从 startIndex 开始，添加到原数组, 在把原数组剩余元素向后移动
    const initialLen = this.length
    const addsLen = adds.length
    const leftLen = initialLen - startIndex - delCount
    // 2.1 如果原数组没有剩余元素，只需把 adds 从 startIndex 开始逐一添加到原数组
    // 而且，数组的长度变成 startIndex + addsLen
    if (leftLen <= 0) {
        for (let i = 0; i < addsLen; i++) {
            this[startIndex + i] = adds[i]
        }
        this.length = startIndex + addsLen
    } else {
        // 2.2 如果原数组有剩余元素, 把 adds 从 startIndex 开始逐一添加到原数组后，再把剩余元素依次向后移动 addsLen - delCount 个位置
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
        // 2.2.4 释放 leftArr
        leftArr.length = 0
    }

    // 3. 返回被删元素组成的数组
    return delArr
}


const arr = [3, 4]
console.log('arr', arr)

const _myPushRes = arr._myPush(5, 6)
console.log('_myPush', _myPushRes, arr) // _myPush 4 [ 3, 4, 5, 6 ]

const _myUnshiftRes = arr._myUnshift(1, 2)
console.log('_myUnshiftRes', _myUnshiftRes, arr) // _myUnshiftRes 6 [ 1, 2, 3, 4, 5, 6 ]

const _myPopRes = arr._myPop()
console.log('_myPopRes', _myPopRes, arr) // _myPopRes 6 [ 1, 2, 3, 4, 5 ]

const _myShiftRes = arr._myShift()
console.log('_myShiftRes', _myShiftRes, arr) // _myShiftRes 1 [ 2, 3, 4, 5 ]

const _mySpliceRes1 = arr._mySplice(0, 1, 1, 2)
console.log('_mySpliceRes1', _mySpliceRes1, arr) // _mySpliceRes1 [ 2 ] [ 1, 2, 3, 4, 5 ]
const _mySpliceRes2 = arr._mySplice(1, 5, 2, 3)
console.log('_mySpliceRes2', _mySpliceRes2, arr) // _mySpliceRes2 [ 2, 3, 4, 5 ] [ 1, 2, 3 ]

