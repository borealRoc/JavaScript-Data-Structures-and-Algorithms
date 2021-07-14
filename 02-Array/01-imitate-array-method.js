// 模拟 push 方法
Array.prototype.imitatePush = function (...endAdds) {
    const len = this.length
    for (let i = 0; i < endAdds.length; i++) {
        this[len + i] = endAdds[i]
    }
    return this.length
}

// 模拟 unshift 方法
Array.prototype.imitateUnshift = function (...startAdds) {
    const initialLen = this.length
    const startAddsLen = startAdds.length
    for (let i = initialLen + startAddsLen - 1; i >= startAddsLen; i--) {
        this[i] = this[i - startAddsLen]
    }
    for (let i = 0; i < startAddsLen; i++) {
        this[i] = startAdds[i]
    }
    return this.length
}

// 模拟 pop 方法
Array.prototype.imitatePop = function () {
    if (!this.length) return undefined
    const end = this[this.length - 1]
    this[this.length - 1] = null
    this.length = this.length - 1
    return end
}

// 模拟 shift 方法
Array.prototype.imitateShift = function () {
    if (!this.length) return undefined
    const start = this[0]
    this[0] = null
    for (let i = 0; i < this.length; i++) {
        this[i] = this[i + 1]
    }
    this.length = this.length - 1
    return start

}

// 模拟 splice 方法
Array.prototype.imitateSplice = function (startIndex, delCount, ...adds) {

    const initialLen = this.length
    const addsLen = adds.length

    // 缓存被删除元素组成的数组
    const delArr = []
    for (let i = 0; i < delCount; i++) {
        // 当被删除元素超出原数组范围是，要剔除 超出部分的 undefined 元素
        if (this[startIndex + i] !== undefined) {
            delArr[i] = this[startIndex + i]
        }
    }

    // 从原数组剔除被删除元素
    for (let i = 0; i < delCount; i++) {
        this[startIndex + i] = 'EDLETE_ITEM_XXX'
    }

    // 移动删除元素后面的原数组的元素，并添加新增元素
    // 1. 如果删除元素后面的原数组的元素全部删除, 则只需把 adds 从 startIndex 开始，逐一添加到原数组
    if (startIndex + delCount >= initialLen) {
        this.length = startIndex + addsLen
        for(let i = 0; i < addsLen; i++) {
            this[startIndex +i] = adds[i]
        }
    } else {
        // 2. 如果删除元素后面的原数组的元素有剩余，则要移动剩余元素，以及添加新增元素
        // 2.1 保存剩余元素
        const temp = []
        for (let i = 0; i < this.length - startIndex - delCount; i++) {
            temp[i] = this[startIndex + delCount + i]
        }
        // 2.2 添加新增元素 
        for (let i = 0; i < addsLen; i++) {
            this[startIndex + i] = adds[i]
        }
        // 2.3 移动剩余元素
        for (let i = 0; i < temp.length; i++) {
            this[startIndex + addsLen + i] = temp[i]
        }
    }

    // 返回被删除元素组成的数组
    return delArr
}


const arr = [1, 2, 3]

const res1 = arr.imitatePush(4, 5)
console.log(res1, arr) // 5 [ 1, 2, 3, 4, 5 ]

const res2 = arr.imitateUnshift(-1, -2)
console.log(res2, arr) // 7 [-1, -2, 1, 2, 3, 4, 5]

const res3 = arr.imitatePop()
console.log(res3, arr) // 5 [ -1, -2, 1, 2, 3, 4 ]

const res4 = arr.imitateShift()
console.log(res4, arr) // -1 [ -2, 1, 2, 3, 4 ]

const res5 = arr.imitateSplice(1, 2, ...[10, 20, 30])
console.log(res5, arr)



