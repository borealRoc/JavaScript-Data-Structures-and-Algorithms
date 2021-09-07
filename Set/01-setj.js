class MySet {
    constructor() {
        this.items = {}
        this.count = 0
    }
    add(element) {
        if (!this.has(element)) {
            this.items[element] = element
            this.count++
            return true
        }
        return false
    }
    delete(element) {
        if (this.has(element)) {
            delete this.items[element]
            this.count--
            return true
        }
        return false
    }
    has(element) {
        return Object.prototype.hasOwnProperty.call(this.items, element)
    }
    values() {
        const values = []
        for (let val in this.items) {
            if (this.has(val)) {
                values.push(val)
            }
        }
        return values
    }
    size() {
        return this.count
    }
    isEmpty() {
        return this.size() === 0
    }
    clear() {
        this.items = {}
        this.count = 0
    }

    // 比较两个集合的大小
    compareUnion(setA, setB) {
        let smallerSet, biggerSet
        const sizeA = setA.size()
        const sizeB = setB.size()
        if (sizeA > sizeB) {
            smallerSet = setB
            biggerSet = setA
        } else {
            smallerSet = setA
            biggerSet = setB
        }
        return {
            smallerSet, biggerSet
        }
    }

    // 集合运算
    // 并集：对于给定的两个集合，返回一个包含两个集合中所有元素的新集合
    union(otherSet) {
        const unionSet = new MySet()
        this.values().forEach(val => unionSet.add(val))
        otherSet.values().forEach(val => unionSet.add(val))
        return unionSet
    }
    // 交集：对于给定的两个集合，返回一个包含两个集合中共有元素的新集合
    intersection(otherSet) {
        const intersectSet = new MySet()
        const { smallerSet, biggerSet } = this.compareUnion(this, otherSet)
        smallerSet.values().forEach(val => {
            if (biggerSet.has(val)) {
                intersectSet.add(val)
            }
        })
        return intersectSet
    }
    // 差集: 对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在于第二个集合的元素的新集合
    difference(otherSet) {
        const diffSet = new MySet()
        const { smallerSet, biggerSet } = this.compareUnion(this, otherSet)
        smallerSet.values().forEach(val => {
            if (!biggerSet.has(val)) {
                diffSet.add(val)
            }
        })
        return diffSet
    }
    // 子集：假如集合 A 是集合 B 的子集，那么集合 A 中的每一个（元素），也需要存在于集合 B 中
    isSubsetOf(otherSet) {
        if (this.size() > otherSet.size()) return false
        const res = this.values().every(val => otherSet.has(val))
        return res
    }
}

module.exports = { MySet }