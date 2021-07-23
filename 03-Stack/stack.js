class Stack {
    constructor() {
        this.items = []
    }
    push(...ele) {
        this.items.push(...ele)
        return this.items.length
    }
    pop() {
        const top = this.items.pop()
        return top
    }
    top() {
        return this.items[this.items.length - 1]
    }
    size() {
        return this.items.length
    }
    isEmpty() {
        return this.items.length === 0
    }
    clear() {
        this.items = []
    }
}

module.exports = { Stack }