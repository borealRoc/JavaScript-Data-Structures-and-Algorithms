class Stack {
    constructor() {
        this.items = {}
        this.count = 0
    }
    push(ele) {
        this.items[this.count] = ele
        this.count++
        return this.count
    }
    pop() {
        if (this.isEmpty()) return undefined
        this.count--
        const top = this.items[this.count]
        delete this.items[this.count]
        return top
    }
    top() {
        if (this.isEmpty()) return undefined
        return this.items[this.count - 1]
    }
    size() {
        return this.count
    }
    isEmpty() {
        return this.count === 0
    }
    clear() {
        this.items = {}
        this.count = 0
    }
    toString() {
        if (this.isEmpty()) return ''
        let str = ''
        for (let i in this.items) {
            str += `${this.items[i]},`
        }
        return str.slice(0, -1)
    }
}

module.exports = { Stack }