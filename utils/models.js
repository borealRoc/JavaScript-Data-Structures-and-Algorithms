class Node {
    constructor(element) {
        this.element = element
        this.next = undefined
    }
}

class DoublyNode extends Node {
    constructor(element, next) {
        super(element, next)
        this.prev = undefined
    }
}

class ValuePair {
    constructor(key, value) {
        this.key = key
        this.value = value
    }
    toString() {
        return `#${this.key}: ${this.value}`
    }
}

module.exports = {
    Node,
    DoublyNode,
    ValuePair
}