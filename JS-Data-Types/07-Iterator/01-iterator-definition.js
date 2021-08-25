// 1. 迭代器
// 1.1 定义
/**
 * 迭代：按照顺序反复，多次执行一段程序，通常会有明确的终止条件
 * 迭代器 Interator: 它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作
 */

// 1.2 JS 实现 Interator 接口的内置类型
/**
 * String
 * Array
 * Set
 * Map
 * 函数的 arguments 对象
 * NodeList 对象
 */
const str = 'x'
const strIt = str[Symbol.iterator]()
console.log(strIt.next()) // { value: 'x', done: false }
console.log(strIt.next()) // { value: undefined, done: true }

const arr = [1, 2]
const arrIt = arr[Symbol.iterator]()
console.log(arrIt.next()) // { value: 1, done: false }
console.log(arrIt.next()) // { value: 2, done: false }
console.log(arrIt.next()) // { value: undefined, done: true }

// 1.3 Interator 的作用
/**
 * for-of 循环
 * 解构赋值
 * 扩展运算符
 * Array.from() 转换
 */
for (const i of str) {
    console.log(`str: ${i}`)
}
// str: x
for (const i of arr) {
    console.log(`arr: ${i}`)
}
// arr: 1
// arr: 2


//  1.4 Iterator 的遍历过程
/**
 * 创建一个指针对象，指向当前数据结构的起始位置
 * 不断调用指针对象的next方法，直到它指向数据结构的结束位置
 * 每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束
 */
const makeIterator = iterators => {
    let nextIndex = 0
    const len = iterators.length
    return {
        next: () => {
            return nextIndex < len ? { value: iterators[nextIndex++], done: false } : { value: undefined, done: true }
        }
    }
}
const it = makeIterator(['a', 'b'])
console.log(it.next()) // { value: 'a', done: false }
console.log(it.next()) // { value: 'b', done: false }
console.log(it.next()) // { value: undefined, done: true }

// 1.5 对象没有默认部署 Iterator 接口
/**
 * 对象（Object）之所以没有默认部署 Iterator 接口，因为对象是无序的
 * 一个对象如果要具备可被for...of循环调用的 Iterator 接口，就必须在Symbol.iterator的属性上部署遍历器生成方法
 */
const obj1 = {
    name: 'x',
    age: 17,
}
// for (const key of obj1) {
//     console.log(obj1[key])
// }
// TypeError: obj1 is not iterable

const obj2 = {
    name: 'x',
    age: 17,
    * [Symbol.iterator]() {
        yield 'x'
        yield 17
    }
}
for (const key of obj2) {
    console.log(key)
}
// x
// 17

// 1.6 数组、Set、Map 都部署了以下三个方法
/**
 * entries(): 返回一个遍历器对象，用来遍历[键名, 键值]组成的数组
 * keys(): 返回一个遍历器对象，用来遍历所有的键名
 * values(): 返回一个遍历器对象，用来遍历所有的键值
 */

// 1.7 几种遍历语法的比较
/**
 * for循环：迭代之前需要事先知道如何使用数据结构；遍历顺序并不是数据结构固有的
 * forEach()：无法中途跳出forEach循环，break命令或return命令都不能奏效
 * for...in：主要是为遍历对象而设计的，不适用于遍历数组
 * for-of：有着同for...in一样的简洁语法，但是没有for...in那些缺点；不同于forEach方法，它可以与break、continue和return配合使用；提供了遍历所有数据结构的统一操作接口
 */