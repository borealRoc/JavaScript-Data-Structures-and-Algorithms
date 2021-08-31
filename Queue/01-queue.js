class Queue {
    constructor() {
        this.items = {}
        this.count = 0
        this.lowestCount = 0
    }
    enqueue(item) {
        this.items[this.count] = item
        this.count++
    }
    dequeue() {
        if (this.isEmpty()) return undefined
        const start = this.items[this.lowestCount]
        delete this.items[this.lowestCount]
        this.lowestCount++
        return start
    }
    peek() {
        if (this.isEmpty()) return undefined
        return this.items[this.lowestCount]
    }
    size() {
        return this.count - this.lowestCount
    }
    isEmpty() {
        return this.size() === 0
    }
    clear() {
        this.items = {}
        this.count = 0
        this.lowestCount = 0
    }
    toString() {
        if (this.isEmpty()) return ''
        let str = this.items[this.lowestCount]
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            str = `${str},${this.items[i].toString()}`
        }
        return str
    }
}

module.exports = { Queue }