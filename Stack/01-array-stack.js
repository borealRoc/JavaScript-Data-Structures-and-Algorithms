class Stack {
    constructor() {
        this.items = []
    }
    push(item) {
        this.items.push(item)
        return this.size()
    }
    pop() {
        return this.items.pop()
    }
    top() {
        return this.items[this.size() - 1]
    }
    size() {
        return this.items.length
    }
    isEmpty() {
        return this.size() === 0
    }
    clear() {
        this.items = []
    }
    toString() {
        return this.items.toString()
    }
}