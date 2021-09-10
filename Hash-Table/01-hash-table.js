const { defaultHashCode, djb2HashCode } = require('../utils/methods')
const { ValuePair } = require('../utils/models')

class HashTable {
    constructor(hashCode = defaultHashCode) {
        this.hashCode = hashCode
        this.table = {}
    }
    // put(key,value)：向散列表增加一个新的项（也能更新散列表）
    put(key, value) {
        if (key != undefined && value != undefined) {
            const hashKey = this.hashCode(key)
            this.table[hashKey] = new ValuePair(key, value)
            return true
        }
        return false
    }
    // remove(key)：根据键值从散列表中移除值
    remove(key) {
        const hashKey = this.hashCode(key)
        const valuePair = this.table[hashKey]
        if (valuePair != undefined) {
            delete this.table[hashKey]
            return true
        }
        return false
    }
    // get(key)：返回根据键值检索到的特定的值
    get(key) {
        const hashKey = this.hashCode(key)
        const valuePair = this.table[hashKey]
        return valuePair === undefined ? undefined : valuePair.value
    }

    size() {
        return Object.keys(this.table).length
    }
    isEmpty() {
        return this.size() === 0
    }
    clear() {
        this.table = {}
    }
    toString() {
        if (this.isEmpty()) return ''
        const keys = Object.keys(this.table)
        let str = `${keys[0]}=>${this.table[keys[0]].toString()}`
        for (let i = 1; i < keys.length; i++) {
            str = `${str}\n${keys[i]}=>${this.table[keys[i]].toString()}`
        }
        return str
    }
}

module.exports = {
    HashTable
}

const hash = new HashTable()
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
//     '5': ValuePair { key: 'Aethelwulf', value: 'aethelwulf@email.com' },
//     '7': ValuePair { key: 'Athelstan', value: 'athelstan@email.com' },
//     '8': ValuePair { key: 'Jasmine', value: 'jasmine@email.com' },
//     '9': ValuePair { key: 'Jake', value: 'jake@email.com' },
//     '10': ValuePair { key: 'Sargeras', value: 'sargeras@email.com' }
//   }

const hash1 = new HashTable(djb2HashCode)
hash1.put('Ygritte', 'ygritte@email.com');
hash1.put('Jonathan', 'jonathan@email.com');
hash1.put('Jamie', 'jamie@email.com');
hash1.put('Jack', 'jack@email.com');
hash1.put('Jasmine', 'jasmine@email.com');
hash1.put('Jake', 'jake@email.com');
hash1.put('Nathan', 'nathan@email.com');
hash1.put('Athelstan', 'athelstan@email.com');
hash1.put('Sue', 'sue@email.com');
hash1.put('Aethelwulf', 'aethelwulf@email.com');
hash1.put('Sargeras', 'sargeras@email.com');
console.log(hash1)

// table: {
//     '149': ValuePair { key: 'Aethelwulf', value: 'aethelwulf@email.com' },
//     '223': ValuePair { key: 'Nathan', value: 'nathan@email.com' },
//     '275': ValuePair { key: 'Jasmine', value: 'jasmine@email.com' },
//     '288': ValuePair { key: 'Jonathan', value: 'jonathan@email.com' },
//     '502': ValuePair { key: 'Sue', value: 'sue@email.com' },
//     '619': ValuePair { key: 'Jack', value: 'jack@email.com' },
//     '711': ValuePair { key: 'Sargeras', value: 'sargeras@email.com' },
//     '807': ValuePair { key: 'Ygritte', value: 'ygritte@email.com' },
//     '877': ValuePair { key: 'Jake', value: 'jake@email.com' },
//     '925': ValuePair { key: 'Athelstan', value: 'athelstan@email.com' },
//     '962': ValuePair { key: 'Jamie', value: 'jamie@email.com' }
// }