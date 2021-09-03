const { LinkedList } = require('./01-linked-list')
const { DoublyNode } = require('../utils/models')

class DoublyLinkedList extends LinkedList {
    constructor(equalHandler) {
        super(equalHandler)
        // 链表尾部
        this.tail = undefined
    }

    // 1. 索引方法
    getElementAt(position) {
        if (position >= 0 && position < this.count) {
            const size = this.getSize()
            const half = Math.floor(size / 2)
            let current = this.head
            if (position < half) {
                // 1.1 如果位置小于长度的一半，从头部开始迭代
                for (let i = 0; i < position; i++) {
                    current = current.next
                }
            } else {
                // 1.2 否则从尾部开始迭代
                current = this.tail
                for (let i = size - 1; i > position; i--) {
                    current = current.prev
                }
            }
            return current
        }
        return undefined
    }
    getTail() {
        const tail = this.tail
        return tail
    }
    // 2. 插入元素
    push(element) {
        if (element == undefined) {
            return 0
        }

        const node = new DoublyNode(element)
        const current = this.head
        if (current == undefined) {
            this.head = node
        } else {
            const tail = this.getTail()
            tail.next = node
            node.prev = tail
        }

        this.tail = node
        this.count++
        return true
    }
    unshift(element) {
        if (element == undefined) {
            return 0
        }

        const node = new DoublyNode(element)
        const current = this.head
        if (current == undefined) {
            this.tail = node
        } else {
            node.next = current
            current.prev = node
        }

        this.head = node
        this.count++
        return true
    }
    insert(element, position) {
        if (position === 0) {
            return this.unshift(element)
        }
        const size = this.getSize()
        if (position === size) {
            return this.push(element)
        }

        if (element == undefined) {
            return 0
        }

        if (position > 0 && position < size) {
            const node = new DoublyNode(element)
            const current = this.getElementAt(position)
            current.prev.next = node
            node.prev = current.prev
            node.next = current
            current.prev = node
            this.count++
            return true
        }
        return false
    }
    // 3. 移除元素
    pop() {
        const size = this.getSize()
        let tail = this.getTail()
        if (size === 0) {
            return undefined
        } else if (size === 1) {
            this.head = undefined
            this.tail = undefined
        } else {
            this.tail = tail.prev
            this.tail.next = undefined
        }
        this.count--
        return tail.element
    }
    shift() {
        const size = this.getSize()
        let head = this.getHead()
        if (size === 0) {
            return undefined
        } else if (size === 1) {
            this.head = undefined
            this.tail = undefined
        } else {
            this.head = head.next
            this.head.prev = undefined
        }
        this.count--
        return head.element
    }
    removeAt(position) {
        if (position === 0) {
            return this.shift()
        }
        const size = this.getSize()
        if (position === size - 1) {
            return this.pop()
        }
        if (position > 0 && position < size - 1) {
            const current = this.getElementAt(position)
            current.prev.next = current.next
            current.next.prev = current.prev
            this.count--
            return current.element
        }
        return undefined
    }
}

module.exports = {
    DoublyLinkedList
}