class Deque {
    constructor() {
        this.items = {}
        this.count = 0
        this.lowestCount = 0
    }
    addFront(item) {
        if (this.isEmpty()) {
            // 1. 如果双端队列是空的，则复用 addBack() 的逻辑
            this.addBack(item)
        } else {
            if (this.lowestCount > 0) {
                // 2. 如果最低位大于0，则把新增元素赋值给最低位
                this.lowestCount--
                this.items[this.lowestCount] = item
            } else {
                // 3. 如果最低位等于0，先把双端队列的元素依次往后移动一个单位，再把新增元素赋值给最低位
                for (let i = this.count; i > 0; i--) {
                    this.items[i] = this.items[i - 1]
                }
                this.count++
                this.lowestCount = 0
                this.items[0] = item
            }
        }
    }
    addBack(item) {
        this.items[this.count] = item
        this.count++
    }
    removeFront() {
        if (this.isEmpty()) return undefined
        const front = this.items[this.lowestCount]
        delete this.items[this.lowestCount]
        this.lowestCount++
        return front
    }
    removeBack() {
        if (this.isEmpty()) return undefined
        this.count--
        const back = this.items[this.count]
        delete this.items[this.count]
        return back
    }
    peekFront() {
        if (this.isEmpty()) return undefined
        return this.items[this.lowestCount]
    }
    peekBack() {
        if (this.isEmpty()) return undefined
        return this.items[this.count - 1]
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

module.exports = { Deque }