const { defaultCompare, swap } = require("../utils/methods")

class MinHeap {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn
        this.heap = []
    }
    // 1. 索引方法
    getLeftIndex(index) {
        return 2 * index + 1
    }
    getRightIndex(index) {
        return 2 * index + 2
    }
    getParentIndex(index) {
        if (index === 0) {
            return undefined
        }
        return Math.floor((index - 1) / 2)
    }

    // 2. 操作方法
    // 2.1 插入值
    insert(value) {
        if (value != null) {
            // 1. 先把值放到末尾
            this.heap.push(value)
            const index = this.size() - 1
            // 2. 再对值进行上移
            this.siftUp(index)
            return true
        }
        return false
    }
    // 2.2 上移操作
    siftUp(index) {
        let parentIndex = this.getParentIndex(index)
        // 如果“插入值”比父节点的值小
        while (index > 0 && this.compareFn(this.heap[parentIndex], this.heap[index]) === 1) {
            // 交换“插入值”和父节点的值
            swap(this.heap, parentIndex, index)
            // “插入值”的索引变为父节点的索引
            index = parentIndex
            // 获取新的“插入值”的父节点的索引
            parentIndex = this.getParentIndex(index)
        }
    }
    // 2.3 移除最小值
    extract() {
        const size = this.size()
        if (size === 0) {
            return undefined
        }
        if (size === 1) {
            return this.heap[0]
        }
        // 1. 先移除第一项
        const first = this.heap.shift()
        // 2. 移除后，将二叉堆的最后一项移至根部
        this.heap.unshift(this.heap.pop())
        // 3. 然后进行下移操作
        this.siftDown(0)

        return first
    }
    // 2.4 下移操作
    siftDown(index) {
        let ele = index
        const left = this.getLeftIndex(ele)
        const right = this.getRightIndex(ele)
        const size = this.size()

        // 如果父值大于左子值，交换父值和左子值的值
        if (left < size && this.compareFn(this.heap[ele], this.heap[left]) === 1) {
            ele = left
        }
        // 如果父值大于左子值，交换父值和右子值的值
        if (right < size && this.compareFn(this.heap[ele], this.heap[right]) === 1) {
            ele = right
        }
        // 如果ele被left或right替换了，要进行交换值操作，并递归
        if (ele != index) {
            swap(this.heap, ele, index)
            this.siftDown(ele)
        }

    }

    // 4. 其它
    size() {
        return this.heap.length
    }
    isEmpty() {
        return this.size() === 0
    }
    clear() {
        this.heap = []
    }
    findMinimum() {
        if (this.isEmpty()) {
            return undefined
        }
        return this.heap[0]
    }

}

const mh = new MinHeap()
mh.insert(10)
mh.insert(9)
mh.insert(8)
mh.insert(7)
mh.insert(1)
mh.insert(2)
mh.insert(3)
mh.extract()
console.log(mh)