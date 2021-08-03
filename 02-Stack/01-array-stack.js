// 栈：元素的进出只发生在栈顶
// 后进先出：push() + pop()

class Stack {
    // 1. 初始化：创建一个基于数组的栈
    constructor() {
        this.items = []
    }
    // 2. 栈方法
    // 2.1 添加新元素到栈顶, 同时返回修改后的栈的长度
    push(ele) {
        this.items.push(ele)
        return this.size()
    }
    // 2.2 移除栈顶的元素，同时返回被移除的元素
    pop() {
        const top = this.items.pop()
        return top
    }
    // 2.3 返回栈顶的元素，不对栈做任何修改
    top() {
        return this.items[this.items.length - 1]
    }
    // 2.4 返回栈里的元素个数
    size() {
        return this.items.length
    }
    // 2.5 如果栈里没有任何元素就返回true，否则返回false
    isEmpty() {
        return this.items.length === 0
    }
    // 2.6 清空栈里的元素
    clear() {
        this.items = []
    }
    // 2.7 字符串转换
    toString() {
        return this.items.toString()
    }
}

const stack = new Stack()
console.log('stack', stack) // stack Stack { items: [] }

stack.push(1)
const pushRes = stack.push(2)
console.log('pushRes', pushRes, stack) // pushRes 2 Stack { items: [ 1, 2 ] }

const toStringRes = stack.toString()
console.log('toStringRes', toStringRes, stack) // toStringRes 1,2 Stack { items: [ 1, 2 ] }

const popRes = stack.pop()
console.log('popRes', popRes, stack) // popRes 2 Stack { items: [ 1 ] }

const topRes = stack.top()
console.log('topRes', topRes, stack) // topRes 1 Stack { items: [ 1 ] }

const sizeRes = stack.size()
console.log('sizeRes', sizeRes, stack) // sizeRes 1 Stack { items: [ 1 ] }

const clearRes = stack.clear()
console.log('clearRes', clearRes, stack) // clearRes undefined Stack { items: [] }

const isEmptyRes = stack.isEmpty()
console.log('isEmptyRes', isEmptyRes, stack) // isEmptyRes true Stack { items: [] }

// 总结：基于数组创建的栈，大多数方法的时间复杂度是 O(n)