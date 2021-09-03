const { DoublyLinkedList } = require('./02-doubly-linked-list')
const { DoublyNode } = require('../utils/models')

class CurcularDoublyLinkedList extends DoublyLinkedList {
    constructor(equalHandler) {
        super(equalHandler)
    }

    // 双向循环链表首尾双向连接
    headLinkedTail() {
        const head = this.getHead()
        const tail = this.getTail()
        tail.next = head
        head.prev = tail
    }

    push(element) {
        if (element == undefined) {
            return 0
        }
        const node = new DoublyNode(element)
        if (this.isEmpty()) {
            this.head = node
        } else {
            const tail = this.getTail()
            tail.next = node
            node.prev = tail
        }
        this.tail = node
        this.headLinkedTail()
        this.count++
    }
    unshift(element) {
        if (element == undefined) {
            return 0
        }
        const node = new DoublyNode(element)
        if (this.isEmpty()) {
            this.tail = node
        } else {
            const head = this.getHead()
            node.next = head
            head.prev = node
        }
        this.head = node
        this.headLinkedTail()
        this.count++
    }
    pop() {
        const size = this.getSize()
        let current
        if (size === 0) {
            return undefined
        } else if (size === 1) {
            current = this.getHead()
            this.head = undefined
            this.tail = undefined
        } else {
            current = this.getTail()
            const prev = current.prev
            this.tail = prev
        }
        this.headLinkedTail()
        this.count--
        return current.element
    }
    shift() {
        const size = this.getSize()
        let current = this.getHead()
        if (size === 0) {
            return undefined
        } else if (size === 1) {
            this.head = undefined
            this.tail = undefined
        } else {
            const later = current.next
            this.head = later
        }
        this.headLinkedTail()
        this.count--
        return current.element
    }
}

module.exports = {
    CurcularDoublyLinkedList
}