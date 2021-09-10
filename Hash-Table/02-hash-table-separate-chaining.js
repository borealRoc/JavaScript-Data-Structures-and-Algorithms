const { defaultHashCode } = require('../utils/methods')
const { ValuePair } = require('../utils/models')
const { LinkedList } = require('../Linked-List/01-linked-list')

class HashTableSeparateChaining {
    constructor(hashCode = defaultHashCode) {
        this.hashCode = hashCode
        this.table = {}
    }

    put(key, value) {
        if (key != undefined && value != undefined) {
            const hashKey = this.hashCode(key)
            if (this.table[hashKey] == undefined) {
                this.table[hashKey] = new LinkedList()
            }
            this.table[hashKey].push(new ValuePair(key, value))
            return true
        }
        return false
    }

    get(key) {
        if (key != undefined) {
            const hashKey = this.hashCode(key)
            const valueLinkList = this.table[hashKey]
            if (valueLinkList != undefined && !valueLinkList.isEmpty()) {
                let current = valueLinkList.getHead()
                while (current != undefined) {
                    if (current.element.key === key) {
                        return current.element.value
                    }
                    current = current.next
                }
            }
            return undefined
        }
        return undefined
    }

    remove(key) {
        if (key != undefined) {
            const hashKey = this.hashCode(key)
            const valueLinkList = this.table[hashKey]
            if (valueLinkList != undefined && !valueLinkList.isEmpty()) {
                let current = valueLinkList.getHead()
                while (current != undefined) {
                    if (current.element.key === key) {
                        valueLinkList.remove(current.element)
                        if (valueLinkList.isEmpty()) {
                            delete this.table[hashKey]
                        }
                        return true
                    }
                    current = current.next
                }
            }
            return false
        }
        return false
    }
}

module.exports = {
    HashTableSeparateChaining
}

const hash = new HashTableSeparateChaining()
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
//     '4': LinkedList {
//         count: 1,
//             head: [Node],
//                 equalHandler: [Function: defaultEqual]
//     },
//     '5': LinkedList {
//         count: 4,
//             head: [Node],
//                 equalHandler: [Function: defaultEqual]
//     },
//     '7': LinkedList {
//         count: 2,
//             head: [Node],
//                 equalHandler: [Function: defaultEqual]
//     },
//     '8': LinkedList {
//         count: 1,
//             head: [Node],
//                 equalHandler: [Function: defaultEqual]
//     },
//     '9': LinkedList {
//         count: 1,
//             head: [Node],
//                 equalHandler: [Function: defaultEqual]
//     },
//     '10': LinkedList {
//         count: 2,
//             head: [Node],
//                 equalHandler: [Function: defaultEqual]
//     }
// }