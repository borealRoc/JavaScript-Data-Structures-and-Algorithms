class Queue {
    constructor() {
        this.items = []
        this.count = 0
    }
    enqueue(ele) {
        this.items[this.count] = ele
        this.count++
        return this.count
    }
    dequeue() {
        if (this.count === 0) return ''
        const start = this.items.shift()
        this.count--
        return start
    }
    peek() {
        return this.items[0]
    }
    size() {
        return this.count
    }
    isEmpty() {
        return this.count === 0
    }
    clear() {
        while (this.count > 0) {
            this.dequeue()
        }
        return this.items
    }
    toString() {
        return this.items.toString()
    }
}

class Deque {
    constructor() {
        this.items = []
        this.count = 0
    }

    enqueueBack(ele) {
        this.items.push(ele)
        this.count++
        return this.count
    }
    dequeueFront() {
        if (this.isEmpty()) return ''
        const start = this.items.shift()
        this.count--
        return start
    }
    enqueueFront(ele) {
        this.items.unshift(ele)
        this.count++
        return this.count
    }
    dequeueBack() {
        if (this.isEmpty()) return ''
        const end = this.items.pop()
        this.count--
        return end
    }
    peekBack() {
        if (this.isEmpty()) return ''
        const end = this.items[this.count - 1]
        return end
    }
    peekFront() {
        if (this.isEmpty()) return ''
        const start = this.items[0]
        return start
    }
    size() {
        return this.count
    }
    isEmpty() {
        return this.count === 0
    }
    clear() {
        this.items = []
        this.count = 0
    }
    toString() {
        return this.items.toString()
    }
}

module.exports = { Queue, Deque }