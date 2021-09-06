const { LinkedList } = require('./01-linked-list')
const { defaultCompare } = require('../utils/methods')

class SortedLinkedList extends LinkedList {
    constructor(equalHandler, compareHandler = defaultCompare) {
        super(equalHandler)
        this.compareHandler = compareHandler
    }

    insert(element) {
        if (this.isEmpty()) {
            return super.insert(element, 0)
        }
        const pos = this.getSortedIndex(element)
        return super.insert(element, pos)
    }

    getSortedIndex(element) {
        const size = this.getSize()
        let current = this.head
        for (let i = 0; i < size; i++) {
            const compare = this.compareHandler(element, current.element)
            if (compare === -1) {
                return i
            }
            current = current.next
        }
        // 如果插入元素大于链表中所有的元素，则插入到链表最后
        return size
    }
}

module.exports = {
    SortedLinkedList
}