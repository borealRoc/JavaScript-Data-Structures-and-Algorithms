const { Stack } = require('./stack')

// 十进制转二进制
function decimalToBinary(num) {
    const binaryStack = new Stack()
    let binaryStr = ''
    // 1. 初始化商为传进来的十进制数值
    let quo = num
    let rem

    while (quo > 0) {
        // 2. 十进制数除以2取余
        rem = Math.floor(quo % 2)
        // 3. 把余数放进栈里面
        binaryStack.push(rem)
        // 4. 将商除以2，重置它的值
        quo = Math.floor(quo / 2)
    }

    // 5. 将栈里的余数逐一弹出，组成二进制值
    if (binaryStack.isEmpty()) {
        return ''
    }
    while (!binaryStack.isEmpty()) {
        binaryStr += String(binaryStack.pop())
    }
    return binaryStr
}

console.log('decimalToBinary 10', decimalToBinary(10)) // decimalToBinary 10 1010
console.log('decimalToBinary 0', decimalToBinary(0)) // decimalToBinary 10 ''

// 十进制转任意进制（2~36）
function decimalToAny(num, base) {
    const baseStack = new Stack()
    let baseStr = ''
    const baseStrTurn = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let quo = num
    let rem

    // 1. 超出[2, 36]进制之外的返回空字符串
    if (!(base >= 2 && base <= 36)) {
        return ''
    }

    while (quo > 0) {
        rem = Math.floor(quo % base)
        baseStack.push(rem)
        quo = Math.floor(quo / base)
    }

    if (baseStack.isEmpty()) {
        return '---'
    }

    while (!(baseStack.isEmpty())) {
        baseStr += String(baseStrTurn[baseStack.pop()])
    }

    return baseStr
}

console.log('decimalToAny 10 2', decimalToAny(10, 2)) // decimalToAny 10 2 1010
console.log('decimalToAny 10 8', decimalToAny(10, 8)) // decimalToAny 10 8 12
console.log('decimalToAny 10 16', decimalToAny(10, 16)) // decimalToAny 10 16 A
console.log('decimalToAny 100345 35', decimalToAny(100345, 35)) //decimalToAny 1000 32 2BW0
console.log('decimalToAny 100345 37', decimalToAny(100345, 37)) // decimalToAny 100345 37 ''
