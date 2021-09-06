const { Node } = require('../utils/models')
const { defaultEqual } = require('../utils/methods')

class LinkedList {
    constructor(equalHandler = defaultEqual) {
        // 链表长度
        this.count = 0
        // 链表表头
        this.head = undefined
        this.equalHandler = equalHandler
    }

    // 1. 索引方法
    // 1.1 返回链表中特定位置的元素。如果链表中不存在这样的元素，则返回undefined
    getElementAt(position) {
        if (position >= 0 && position < this.count) {
            let current = this.head
            // 从表头开始迭代，直到找到所需元素
            for (let i = 0; i < position; i++) {
                current = current.next
            }
            return current
        }
        return undefined
    }
    // 1.2 返回元素在链表中的索引。如果链表中没有该元素则返回-1
    indexOf(element) {
        if (element == undefined) return false
        let current = this.head
        // 从表头开始迭代，直到找到元素所在位置
        for (let i = 0; i < this.count; i++) {
            if (this.equalHandler(current.element, element)) {
                return i
            }
            current = current.next
        }
        return -1
    }
    // 1.3 返回链表头部元素
    getHead() {
        const head = this.head
        return head
    }
    // 1.4 返回链表尾部元素
    getTail() {
        const size = this.getSize()
        let tail
        if (size > 1) {
            const position = size - 1
            tail = this.getElementAt(position)
        } else {
            tail = this.head
        }
        return tail
    }

    // 2. 插入元素
    // 2.1 在链表尾部插入元素
    push(element) {
        // 2.1.1 校验插入的元素
        if (element == undefined) {
            return 0
        }
        const node = new Node(element)
        const current = this.head
        if (current == undefined) {
            // 2.1.2 如果是空链表，只需将 head 指向插入的元素
            this.head = node
        } else {
            const tail = this.getTail()
            // 2.1.3 之前的最后一个元素的 next 指向插入的元素
            tail.next = node
        }
        this.count++
        return true
    }
    // 2.2 在链表头部插入元素
    unshift(element) {
        if (element == undefined) {
            return 0
        }
        const node = new Node(element)
        const current = this.head
        if (current != undefined) {
            // 如果不是空链表，将新插入的元素指向之前的第一个元素
            node.next = current
        }
        this.head = node
        this.count++
        return true
    }
    // 2.3 在链表特定位置插入元素
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
            const node = new Node(element)
            const prev = this.getElementAt(position - 1)
            const later = prev.next
            prev.next = node
            node.next = later
            this.count++
            return true
        }
        return false
    }

    // 3. 移除元素
    // 3.1 移除链表尾部元素
    pop() {
        const size = this.getSize()
        let tail
        if (size > 1) {
            // 倒数第一个元素
            const current = this.getElementAt(size - 2)
            tail = current.next
            current.next = undefined
        } else if (size === 1) {
            tail = this.head
            this.head = undefined
        } else {
            return undefined
        }
        this.count--
        return tail.element
    }
    // 3.2 移除链表头部元素
    shift() {
        const size = this.getSize()
        const current = this.head
        if (size > 1) {
            const next = current.next
            this.head = next
        } else if (size === 1) {
            this.head = undefined
        } else {
            return false
        }
        this.count--
        return current.element
    }
    // 3.3 移除某个元素
    remove(element) {
        const position = this.indexOf(element)
        return this.removeAt(position)
    }
    // 3.4 移除特定位置的元素
    removeAt(position) {
        if (position === 0) {
            return this.shift()
        }
        const size = this.getSize()
        if (position === size - 1) {
            return this.pop()
        }
        if (position > 0 && position < size - 1) {
            const prev = this.getElementAt(position - 1)
            const current = prev.next
            const later = current.next
            prev.next = later
            this.count--
            return current.element
        }
        return undefined
    }

    // 4. 其它方法
    getSize() {
        return this.count
    }
    isEmpty() {
        return this.getSize() === 0
    }
    clear() {
        this.count = 0
        this.head = undefined
    }
    toString() {
        if (this.isEmpty()) return ''
        let str = `${this.head.element}`
        let current = this.head
        for (let i = 1; i < this.count && current != undefined; i++) {
            current = current.next
            str = `${str},${current.element}`
        }
        return str
    }
}

module.exports = {
    LinkedList
}