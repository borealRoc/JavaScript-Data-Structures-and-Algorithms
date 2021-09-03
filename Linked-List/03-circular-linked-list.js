const { LinkedList } = require('./01-linked-list')
const { Node } = require('../utils/models')

class CircularLinkedList extends LinkedList {
    constructor(equalHandler) {
        super(equalHandler)
    }
    // 1. 插入
    push(element) {
        if (element == undefined) {
            return 0
        }

        const node = new Node(element)
        if (this.head == undefined) {
            this.head = node
        } else {
            const tail = this.getTail()
            tail.next = node
        }
        node.next = this.head
        this.count++
        return true
    }
    unshift(element) {
        if (element == undefined) {
            return 0
        }
        
        const node = new Node(element)
        if (this.isEmpty()) {
            node.next = node
        } else {
            node.next = this.head
            const tail = this.getTail()
            tail.next = node
        }
        this.head = node
        this.count++
        return true
    }
    // 2. 移除
    pop() {
        const size = this.getSize()
        let tail
        if (size > 1) {
            const current = this.getElementAt(size - 2)
            tail = current.next
            current.next = this.head
        } else if (size === 1) {
            tail = this.head
            this.head = undefined
        } else {
            return undefined
        }

        this.count--
        return tail.element
    }
    shift() {
        const size = this.getSize()
        const head = this.getHead()
        if (size > 1) {
            const tail = this.getTail()
            const current = head.next
            tail.next = current
            this.head = current
        } else if (size === 1) {
            this.head = undefined
        } else {
            return undefined
        }
        this.count--
        return head.element
    }
}

module.exports = {
    CircularLinkedList
}