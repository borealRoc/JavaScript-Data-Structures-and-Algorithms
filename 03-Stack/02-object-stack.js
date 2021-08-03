class Stack {
    // 1. 初始化：创建一个基于对象的栈
    constructor() {
        this.items = {}
        this.count = 0
    }
    // 2. 方法
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

const stack = new Stack()
console.log('stack', stack) // stack Stack { item: {}, count: 0 }

stack.push('a')
const pushRes = stack.push('b')
console.log('pushRes', pushRes, stack) // pushRes 2 Stack { items: { '0': 'a', '1': 'b' }, count: 2 }
const toStringRes = stack.toString()
console.log('toStringRes', toStringRes, stack) // toStringRes a,b Stack { items: { '0': 'a', '1': 'b' }, count: 2 }

const popRes = stack.pop()
console.log('popRes', popRes, stack) // popRes b Stack { items: { '0': 'a' }, count: 1 }

const topRes = stack.top()
console.log('topRes', topRes, stack) // topRes a Stack { items: { '0': 'a' }, count: 1 }

const sizeRes = stack.size()
console.log('sizeRes', sizeRes, stack) // sizeRes 1 Stack { items: { '0': 'a' }, count: 1 }

const clearRes = stack.clear()
console.log('clearRes', clearRes, stack) // clearRes undefined Stack { items: {}, count: 0 }

const isEmptyRes = stack.isEmpty()
console.log('isEmptyRes', isEmptyRes, stack) // isEmptyRes true Stack { items: {}, count: 0 }

// 总结：基于对象创建的栈，大多数方法的时间复杂度是 O(1)


