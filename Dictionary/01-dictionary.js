const { defaultString } = require('../utils/methods')
const { ValuePair } = require('../utils/models')

class Dictionary {
    constructor(toStrFn = defaultString) {
        this.table = {}
        this.toStrFn = toStrFn
    }

    // 1. 操作方法
    // 向字典中添加新元素。如果key已经存在，那么已存在的 value会被新的值覆盖
    set(key, val) {
        if (key != undefined && val != undefined) {
            this.table[this.toStrFn(key)] = new ValuePair(key, val)
            return true
        }
        return false
    }
    // 通过使用键值作为参数来从字典中移除键值对应的数据值
    remove(key) {
        if (this.hasKey(key)) {
            delete this.table[this.toStrFn(key)]
            return true
        }
        return false
    }

    // 2. 查询方法
    // 如果某个键值存在于该字典中，返回true，否则返回false
    hasKey(key) {
        return this.table[this.toStrFn(key)] != undefined
    }
    // 通过以键值作为参数查找特定的数值并返回
    get(key) {
        // if (this.hasKey(key)) {
        //     return this.table[this.toStrFn(key)].value
        // }
        // return undefined

        // 相比上面的方法：可以少访问一次 this.table
        const valuePair = this.table[this.toStrFn(key)]
        return valuePair == undefined ? undefined : valuePair.value
    }
    // 将字典所包含的所有键名以数组形式返回
    keys() {
        return this.keyValues().map(item => item.key)
    }
    // 将字典所包含的所有数值以数组形式返回
    values() {
        return this.keyValues().map(item => item.value)
    }
    // 将字典中所有[键，值]对返回
    keyValues() {
        return Object.values(this.table)
    }

    // 3. 常规方法
    size() {
        return this.keyValues().length
    }
    isEmpty() {
        return this.size() === 0
    }
    clear() {
        this.table = {}
    }
    toString() {
        if (this.isEmpty()) return ``

        const keyValues = this.keyValues()
        let str = `${keyValues[0].toString()}`
        for (let i = 1; i < keyValues.length; i++) {
            str = `${str}, ${keyValues[i].toString()}`
        }
        return str
    }

    // 4. 高阶方法
    // 自定义forEach：可以中断循环
    forEach(callbackFn) {
        const keyValues = this.keyValues()
        for (let i = 0; i < keyValues.length; i++) {
            const result = callbackFn(keyValues[i].key, keyValues[i].value)
            if (result === false) {
                break
            }
        }
    }
}