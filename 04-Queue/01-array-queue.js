// 队列： 在队列的尾端添加项，在前端移除项
// 先进先出 ：push() + shift()

class Queue {
    constructor() {
        // 基于数组构建队列
        this.items = []
        this.count = 0
    }
    // 进队
    enqueue(ele) {
        this.items[this.count] = ele
        this.count++
        return this.size()
    }
    // 出队
    dequeue() {
        // 当队列没有元素时，直接弹出
        if (this.isEmpty()) return undefined

        // 如果队列有元素时，则弹出队首的元素
        const start = this.items.shift()
        // 并把队列的长度减1
        this.count--
        return start
    }
    // 队首
    peek() {
        return this.items[0]
    }
    // 大小
    size() {
        return this.count
    }
    // 是否为空
    isEmpty() {
        return this.count === 0
    }
    // 清空队列
    clear() {
        this.items = []
        this.count = 0
    }
    // 字符串表示
    toString() {
        return this.items.toString()
    }
}

const queue = new Queue()
queue.enqueue('a')
queue.enqueue('b')
const enqueueRes = queue.enqueue('c')
console.log('进队', enqueueRes, queue) // 进队 3 Queue { items: [ 'a', 'b', 'c' ], count: 3 }

const dequeueRes1 = queue.dequeue()
console.log('第一次出队', dequeueRes1, queue) // 第一次出队 a Queue { items: [ 'b', 'c' ], count: 2 }
// const dequeueRes2 = queue.dequeue()
// console.log('第二次出队', dequeueRes2, queue) // 第二次出队 b Queue { items: [ 'c' ], count: 1 }
// const dequeueRes3 = queue.dequeue()
// console.log('第三次出队', dequeueRes3, queue)  // 第三次出队 c Queue { items: [], count: 0 }
// const dequeueRes4 = queue.dequeue()
// console.log('第四次出队', dequeueRes4, queue) // 第四次出队  undefined Queue { items: [], count: 0 }

const peekRes = queue.peek()
console.log('队首', peekRes, queue) // 队首 b Queue { items: [ 'b', 'c' ], count: 2 }

const sizeRes = queue.size()
console.log('大小', sizeRes, queue) // 大小 2 Queue { items: [ 'b', 'c' ], count: 2 }
const toStringRes1 = queue.toString()
console.log('字符串表示', toStringRes1, queue) // 字符串表示 'b,c'  Queue { items: [ 'b', 'c' ], count: 2 }
const clearRes = queue.clear()
console.log('清空', clearRes, queue) // 清空 [] Queue { items: [], count: 0 }
const isEmptyRes = queue.isEmpty()
console.log('是否为空', isEmptyRes, queue) // 是否为空 true Queue { items: [], count: 0 }
const toStringRes2 = queue.toString()
console.log('字符串表示', toStringRes2, queue) // 字符串表示 '' Queue { items: [ 'b', 'c' ], count: 2 }


