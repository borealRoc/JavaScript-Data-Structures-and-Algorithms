const { Stack } = require('./02-object-stack')

// 十进制转二进制
function decimalToBinary(number) {
    let quo = number
    let binaryStr = ``
    const binaryStack = new Stack()

    // 1. 当商大于0时，不断除以2，并把余数加入栈中
    while (quo > 0) {
        const rem = Math.floor(quo % 2)
        binaryStack.push(rem)
        quo = Math.floor(quo / 2)
    }

    if (binaryStack.isEmpty()) return undefined

    // 2. 把栈中的元素一一弹出，倒序组成的字符串就是转换后的二进制数字
    while (!binaryStack.isEmpty()) {
        binaryStr += binaryStack.pop().toString()
    }

    return binaryStr
}

// 十进制转任意进制（2~36）
function baseConverter(number, base) {
    let quo = number
    let baseStr = ``
    const baseStack = new Stack()
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    if (base < 2 || base > 36) {
        throw new Error('只支持转换为2~36进制的数字')
    }

    while (quo > 0) {
        const rem = Math.floor(quo % base)
        baseStack.push(rem)
        quo = Math.floor(quo / base)
    }

    if (baseStack.isEmpty()) return undefined

    while (!baseStack.isEmpty()) {
        // 将10进制的余数转换为对应的进制字符
        baseStr += digits[baseStack.pop().toString()]
    }

    return baseStr
}
