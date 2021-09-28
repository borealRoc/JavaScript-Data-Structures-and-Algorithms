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

class TreeNode {
    constructor(key) {
        this.key = key
        this.left = null
        this.right = null
    }
}

const BalanceFactor = {
    UNBALANCED_RIGHT: 1,
    SLIGHTLY_UNBALANCED_RIGHT: 2,
    BALANCED: 3,
    SLIGHTLY_UNBALANCED_LEFT: 4,
    UNBALANCED_LEFT: 5
}

module.exports = {
    Node,
    DoublyNode,
    ValuePair,
    TreeNode,
    BalanceFactor
}