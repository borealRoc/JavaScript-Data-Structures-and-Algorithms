// 队列：先进先出

class Queue {
    constructor() {
        // 基于对象构建队列
        this.items = {}
        this.count = 0
        // 创建最低位标记，便于队首元素的出队
        this.lowestCount = 0
    }
    // 进队
    enqueue(ele) {
        this.items[this.count] = ele
        this.count++
        return this.size()
    }
    // 出队
    dequeue() {
        // 1. 当队列没有元素时，直接弹出
        if (this.isEmpty()) return undefined

        //  2. 当队列有元素
        const start = this.items[this.lowestCount]
        // 2.1.1 删除队首元素
        delete this.items[this.lowestCount]
        // 2.1-2 低位标记 + 1
        this.lowestCount++

        // 2.2 元素出队后如果队列已空，则重置队列
        if (this.isEmpty()) {
            this.clear()
        }

        // 3. 返回队首元素
        return start
    }
    // 队首
    peek() {
        if (this.isEmpty()) return undefined
        const start = this.items[this.lowestCount]
        return start
    }
    // 大小
    size() {
        return this.count - this.lowestCount
    }
    // 是否为空
    isEmpty() {
        return this.size() === 0
    }
    // 清空队列
    clear() {
        this.items = {}
        this.count = 0
        this.lowestCount = 0
    }
    // 字符创表示
    toString() {
        if (this.isEmpty()) return ''
        let str = ''
        for (let i in this.items) {
            str += `${this.items[i]},`
        }
        return str.slice(0, -1)
    }
}


const queue = new Queue()

queue.enqueue('a')
const enqueueRes = queue.enqueue('b')
console.log('进队', enqueueRes, queue) // 进队 2 Queue { items: { '0': 'a', '1': 'b' }, count: 2, lowestCount: 0 }
const toStringRes = queue.toString()
console.log('字符串表示', toStringRes, queue) // 字符串表示 'a,b' Queue { items: { '0': 'a', '1': 'b' }, count: 2, lowestCount: 0 }

const dequeueRes1 = queue.dequeue()
console.log('第一次出队', dequeueRes1, queue) // 第一次出队 a Queue { items: { '1': 'b' }, count: 2, lowestCount: 1 }
// const dequeueRes2 = queue.dequeue()
// console.log('第二次出队', dequeueRes2, queue) // 第二次出队 b Queue { items: {}, count: 2, lowestCount: 2 }
// const dequeueRes3 = queue.dequeue()
// console.log('第三次出队', dequeueRes3, queue) // 第三次出队 '' Queue { items: {}, count: 2, lowestCount: 2 }

const peekRes = queue.peek()
console.log('队首', peekRes, queue) // 队首 b Queue { items: { '1': 'b' }, count: 2, lowestCount: 1 }
const sizeRes = queue.size()
console.log('大小', sizeRes, queue) // 大小 1 Queue { items: { '1': 'b' }, count: 2, lowestCount: 1 }
const clearRes = queue.clear()
console.log('清空', clearRes, queue) // 清空 undefined Queue { items: {}, count: 0, lowestCount: 0 }
const isEmptyRes = queue.isEmpty()
console.log('是否为空', isEmptyRes, queue) // 是否为空 true Queue { items: {}, count: 0, lowestCount: 0 }
