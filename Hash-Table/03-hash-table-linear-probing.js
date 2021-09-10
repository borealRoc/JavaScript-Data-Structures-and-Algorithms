const { defaultHashCode } = require('../utils/methods')
const { ValuePair } = require('../utils/models')


class HashTableLinearProbing {
    constructor(hashCode = defaultHashCode) {
        this.hashCode = hashCode
        this.table = {}
    }

    put(key, value) {
        if (key != undefined && value != undefined) {
            const hashKey = this.hashCode(key)
            // 1. 验证原始的 hashKey 位置是否存在元素
            if (this.table[hashKey] == undefined) {
                // 1.1 如果不存在，直接赋值
                this.table[hashKey] = new ValuePair(key, value)
            } else {
                // 1.2 如果存在，寻找 hashKey + 1，+2 ... 直到还没被赋值的位置，分配给该值
                let index = hashKey + 1
                while (this.table[index] != undefined) {
                    index++
                }
                this.table[index] = new ValuePair(key, value)
            }
            return true
        }
        return false
    }
    get(key) {
        if (key != undefined) {
            const hashKey = this.hashCode(key)
            // 1. 验证原始的 hashKey 位置是否有元素
            if (this.table[hashKey] != undefined) {
                // 1.1 如果有,且该位置的元素的key与要查找的key全等，则直接返回该位置的元素的value
                if (this.table[hashKey].key === key) {
                    return this.table[hashKey].value
                } else {
                    // 1.2 如果有,且该位置的元素的key与要查找的key不相等，则继续寻找 hashKey +1, +2 ... 的位置，直到找到和 key 相等的元素的位置
                    let index = hashKey + 1
                    while (this.table[index] != undefined && this.table[index].key !== key) {
                        index++
                    }
                    if (this.table[index] != undefined && this.table[index].key === key) {
                        return this.table[index].value
                    }
                }
            }
            // 1.3 如果没有
            return undefined
        }
        return undefined
    }

    remove(key) {
        if (key != undefined) {
            const hashKey = this.hashCode(key)
            if (this.table[hashKey] != undefined) {
                if (this.table[hashKey].key === key) {
                    delete this.table[hashKey]
                    // 删除后要对剩余元素进行位移
                    this.verifyRemoveSideEffect(key, hashKey)
                    return true
                } else {
                    let index = hashKey + 1
                    while (this.table[index] != undefined && this.table[index].key !== key) {
                        index++
                    }
                    if (this.table[index] != undefined && this.table[index].key === key) {
                        delete this.table[index]
                        // 删除后要对剩余元素进行位移
                        this.verifyRemoveSideEffect(key, index)
                        return true
                    }
                }
            }
            return false
        }
        return false
    }

    verifyRemoveSideEffect(key, removePosition) {
        const hashKey = this.hashCode(key)
        let index = removePosition + 1
        while (this.table[index] != undefined) {
            const hashPosition = this.hashCode(this.table[index].key)
            // if (hashPosition === hashKey) {
            //     this.table[removePosition] = this.table[index]
            //     delete this.table[index]
            //     removePosition = index
            // }
            // 这个地方之所以还要比较 hashPosition 和 removePosition【而不是只是上面的比较】，是为了把最后一个removePosition后面的元素移到末尾剩余的空位
            if (hashPosition <= hashKey || hashPosition <= removePosition) {
                this.table[removePosition] = this.table[index]
                delete this.table[index]
                removePosition = index
            }
            index++
        }
    }
}

const hash = new HashTableLinearProbing()
hash.put('Ygritte', 'ygritte@email.com');
hash.put('Jonathan', 'jonathan@email.com');
hash.put('Jamie', 'jamie@email.com');
hash.put('Jack', 'jack@email.com');
hash.put('Jasmine', 'jasmine@email.com');
hash.put('Jake', 'jake@email.com');
hash.put('Nathan', 'nathan@email.com');
hash.put('Athelstan', 'athelstan@email.com');
hash.put('Sue', 'sue@email.com');
hash.put('Aethelwulf', 'aethelwulf@email.com');
hash.put('Sargeras', 'sargeras@email.com');
console.log(hash)
// table: {
//     '4': ValuePair { key: 'Ygritte', value: 'ygritte@email.com' },
//     '5': ValuePair { key: 'Jonathan', value: 'jonathan@email.com' },
//     '6': ValuePair { key: 'Jamie', value: 'jamie@email.com' },
//     '7': ValuePair { key: 'Jack', value: 'jack@email.com' },
//     '8': ValuePair { key: 'Jasmine', value: 'jasmine@email.com' },
//     '9': ValuePair { key: 'Jake', value: 'jake@email.com' },
//     '10': ValuePair { key: 'Nathan', value: 'nathan@email.com' },
//     '11': ValuePair { key: 'Athelstan', value: 'athelstan@email.com' },
//     '12': ValuePair { key: 'Sue', value: 'sue@email.com' },
//     '13': ValuePair { key: 'Aethelwulf', value: 'aethelwulf@email.com' },
//     '14': ValuePair { key: 'Sargeras', value: 'sargeras@email.com' }
// }
hash.remove('Jonathan')
console.log(hash)
// table: {
//     '4': ValuePair { key: 'Ygritte', value: 'ygritte@email.com' },
//     '5': ValuePair { key: 'Jamie', value: 'jamie@email.com' },
//     '6': ValuePair { key: 'Sue', value: 'sue@email.com' },
//     '7': ValuePair { key: 'Jack', value: 'jack@email.com' },
//     '8': ValuePair { key: 'Jasmine', value: 'jasmine@email.com' },
//     '9': ValuePair { key: 'Jake', value: 'jake@email.com' },
//     '10': ValuePair { key: 'Nathan', value: 'nathan@email.com' },
//     '11': ValuePair { key: 'Athelstan', value: 'athelstan@email.com' },
//     '12': ValuePair { key: 'Aethelwulf', value: 'aethelwulf@email.com' },
//     '13': ValuePair { key: 'Sargeras', value: 'sargeras@email.com' }
// }