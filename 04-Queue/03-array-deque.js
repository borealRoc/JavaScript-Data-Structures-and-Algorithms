// 双端队列：允许同时从队列前端和后端添加和移动元素
// 先进先出, 后进后出：在队列的尾端添加项，在前端移除项：push() + shift()；在队列的前端添加项，在后端移除项：unshift() + pop()

class Deque {
    constructor() {
        // 基于数组创建
        this.items = []
        this.count = 0
    }

    // 队尾添加
    enqueueBack(ele) {
        this.items.push(ele)
        this.count++
        return this.count
    }
    // 队首删除
    dequeueFront() {
        if (this.isEmpty()) return undefined
        const start = this.items.shift()
        this.count--
        return start
    }
    // 队首添加
    enqueueFront(ele) {
        this.items.unshift(ele)
        this.count++
        return this.count
    }
    // 队尾删除
    dequeueBack() {
        if (this.isEmpty()) return undefined
        const end = this.items.pop()
        this.count--
        return end
    }

    // 队首元素
    peekFront() {
        if (this.isEmpty()) return undefined
        const start = this.items[0]
        return start
    }
    // 队尾元素
    peekBack() {
        if (this.isEmpty()) return undefined
        const end = this.items[this.count - 1]
        return end
    }

    size() {
        return this.count
    }
    isEmpty() {
        return this.size() === 0
    }
    clear() {
        this.items = []
        this.count = 0
    }
    toString() {
        return this.items.toString()
    }
}

const deque = new Deque()

deque.enqueueBack(1)
deque.enqueueBack(2)
const enqueueBackRes = deque.enqueueBack(3)
console.log('队尾添加', enqueueBackRes, deque) // 队尾添加 3 Deque { items: [ 1, 2, 3 ], count: 3 }
const dequeueFrontRes = deque.dequeueFront()
console.log('队首删除', dequeueFrontRes, deque) // 队首删除 1 Deque { items: [ 2, 3 ], count: 2 }

deque.enqueueFront(1)
deque.enqueueFront(0)
const enqueueFrontRes = deque.enqueueFront(-1)
console.log('队首添加', enqueueFrontRes, deque) // 队首添加 5 Deque { items: [ -1, 0, 1, 2, 3 ], count: 5 }
const dequeueBackRes = deque.dequeueBack()
console.log('队尾删除', dequeueBackRes, deque) // 队尾删除 3 Deque { items: [ -1, 0, 1, 2 ], count: 4 }

const peekFrontRes = deque.peekFront()
console.log('队首元素', peekFrontRes, deque) // 队首元素 -1 Deque { items: [ -1, 0, 1, 2 ], count: 4 }
const peekBackRes = deque.peekBack()
console.log('队尾元素', peekBackRes, deque) // 队尾元素 2 Deque { items: [ -1, 0, 1, 2 ], count: 4 }


const toStringRes = deque.toString()
console.log('字符串表示', toStringRes, deque) // 字符串表示 "-1,0,1,2" Deque { items: [ -1, 0, 1, 2 ], count: 4 }
const clearRes = deque.clear()
console.log('清空', clearRes, deque) // 清空 undefined Deque { items: [], count: 0 }
const isEmptyRes = deque.isEmpty()
console.log('是否为空', isEmptyRes, deque) // 是否为空 true Deque { items: [], count: 0 }

