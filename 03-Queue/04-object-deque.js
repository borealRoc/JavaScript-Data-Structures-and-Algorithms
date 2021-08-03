class Deque {
    constructor() {
        // 基于对象创建
        this.itmes = {}
        this.count = 0
        this.lowestCount = 0
    }

    // 队尾添加
    enqueueBack(ele) {
        this.itmes[this.count] = ele
        this.count++
        return this.size()
    }
    // 队首删除
    dequeueFront() {
        // 1. 如果队列为空，直接弹出
        if (this.isEmpty()) {
            return undefined
        }
        // 2. 如果队列不为空
        // 2.1 删完队首元素后，最低位 lowestCount 标记 + 1
        const start = this.itmes[this.lowestCount]
        delete this.itmes[this.lowestCount]
        this.lowestCount++
        // 2.2 如果删完队首元素后，队列没有元素了，则清空队列
        if (this.size() === 0) {
            this.clear()
        }
        // 3 返回出队的元素
        return start
    }
    // 队首添加
    enqueueFront(ele) {
        // 1. 如果队列为空，则只需将新增元素添加到队列
        if (this.isEmpty()) {
            return this.enqueueBack(ele)
        }
        // 2. 如果队列不为空
        // 2.1 如果最低位 lowestCount > 0, 不用移动队列剩余元素，只需将 lowestCount 标记 -1, 再将新增元素添加到 lowestCount 位置
        if (this.lowestCount > 0) {
            this.lowestCount--
            this.itmes[this.lowestCount] = ele
        } else {
            // 2.1 如果最低位 lowestCount = 0, 则将队列剩余元素依次向后移动一个单位，再将新增元素添加到队首
            for (let i = this.count; i > 0; i--) {
                this.itmes[i] = this.itmes[i - 1]
            }
            this.count++
            this.lowestCount = 0
            this.itmes[0] = ele
        }
        return this.size()
    }
    // 队尾删除
    dequeueBack() {
        // 1. 如果队列为空，直接弹出
        if (this.isEmpty()) {
            return undefined
        }
        // 2. 如果队列不为空
        // 2.1 删完队尾元素后， count 标记 -1
        this.count--
        const end = this.itmes[this.count]
        delete this.itmes[this.count]
        // 2.2 如果删完队尾元素后，队列没有元素了，则清空队列
        if (this.isEmpty()) {
            this.clear()
        }
        // 3. 返回被删除的队尾元素
        return end
    }
    // 队首元素
    peekFront() {
        if (this.isEmpty()) return undefined
        return this.itmes[this.lowestCount]
    }
    // 队尾元素
    peekBack() {
        if (this.isEmpty()) return undefined
        return this.itmes[this.count - 1]
    }
    size() {
        return this.count - this.lowestCount
    }
    isEmpty() {
        return this.size() === 0
    }
    clear() {
        this.itmes = {}
        this.count = 0
        this.lowestCount = 0
    }
    toString() {
        if (this.isEmpty()) return ''
        let douqueueStr = ''
        for (let i in this.itmes) {
            douqueueStr += `${this.itmes[i]},`
        }
        return douqueueStr.slice(0, -1)
    }

}

const deque = new Deque()
const enqueueBackRes = deque.enqueueBack('H')
console.log('队尾添加', enqueueBackRes, deque) // 队尾添加 1 Deque { itmes: { '0': 'H' }, count: 1, lowestCount: 0 }
const dequeueFrontRes1 = deque.dequeueFront()
console.log('第一次队首删除', dequeueFrontRes1, deque)  // 第一次队首删除 H Deque { itmes: {}, count: 1, lowestCount: 1 }
const isEmptyRes1 = deque.isEmpty()
console.log('是否为空', isEmptyRes1, deque) // 是否为空 true Deque { itmes: {}, count: 1, lowestCount: 1 }
const dequeueFrontRes2 = deque.dequeueFront()
console.log('第二次队首删除', dequeueFrontRes2, deque) // 第二次队首删除 undefined Deque { itmes: {}, count: 0, lowestCount: 0 }

const enqueueFrontRes1 = deque.enqueueFront('Z')
console.log('第一次队首添加', enqueueFrontRes1, deque) // 第一次队首添加 1 Deque { itmes: { '0': 'Z' }, count: 1, lowestCount: 0 }
const enqueueFrontRes2 = deque.enqueueFront('Y')
console.log('第二次队首添加', enqueueFrontRes2, deque) // 第二次队首添加 2 Deque { itmes: { '0': 'Y', '1': 'Z' }, count: 2, lowestCount: 0 }
const peekFrontRes = deque.peekFront()
console.log('队首元素', peekFrontRes, deque) // 队首元素 Y Deque { itmes: { '0': 'Y', '1': 'Z' }, count: 2, lowestCount: 0 }
const peekBackRes = deque.peekBack()
console.log('队尾元素', peekBackRes, deque) //  队尾元素 Z Deque { itmes: { '0': 'Y', '1': 'Z' }, count: 2, lowestCount: 0 }
const dequeueBackRes1 = deque.dequeueBack()
console.log('第一次队尾删除', dequeueBackRes1, deque) // 第一次队尾删除 Z Deque { itmes: { '0': 'Y' }, count: 1, lowestCount: 0 }
const dequeueBackRes2 = deque.dequeueBack()
console.log('第二次队尾删除', dequeueBackRes2, deque) //  第二次队尾删除 Y Deque { itmes: {}, count: 0, lowestCount: 0 }
const dequeueBackRes3 = deque.dequeueBack()
console.log('第三次队尾删除', dequeueBackRes3, deque) //  第三次队尾删除 undefined Deque { itmes: {}, count: 0, lowestCount: 0 }

deque.enqueueFront('A')
deque.enqueueFront('B')
deque.enqueueFront('C')
const toStringRes = deque.toString()
console.log('字符串表示', toStringRes, deque) // 字符串表示 C,B,A Deque { itmes: { '0': 'C', '1': 'B', '2': 'A' }, count: 3, lowestCount: 0 }
const clearRes = deque.clear()
console.log('清空', clearRes, deque) // {} Deque { itmes: {}, count: 0, lowestCount: 0 }




