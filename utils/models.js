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

module.exports = {
    Node,
    DoublyNode
}