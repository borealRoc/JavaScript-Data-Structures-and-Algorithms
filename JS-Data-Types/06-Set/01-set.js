// Set
// 1. 创建：const set = new Set()
// 2. 初始化：参数是任何具有 Iterator 接口的数据结构
// 3. 属性：size
// 4. 方法
// 4.1 基本方法：add(), delete(), get(), has(), clear()
// 4.2 遍历方法：entries(), keys(), values(), forEach()

// 1. 创建
const set1 = new Set()
console.log(set1) // Set(0) {}

// 2. 初始化参数：具有 iterable 接口的数据结构
const set2 = new Set(['val1', 'val2'])
console.log(set2) // Set(2) { 'val1', 'val2' }

// 3. 属性
/**
 * size: 大小
 */
console.log(set2.size) // 2

// 4. 方法
/**
 * add: 添加某个值，返回 Set 结构本身
 * delete：删除某个值，返回一个布尔值，表示删除是否成功
 * has：返回一个布尔值，表示该值是否为Set的成员
 * clear：清除所有成员，没有返回值
 */
set2.add('val3')
console.log(set2) //Set(3) { 'val1', 'val2', 'val3' }
console.log(set2.has('val3')) // true
set2.delete('val2')
console.log(set2.has('val2')) // false
set2.clear()
console.log(set2) // Set(0) {}

// 5. 迭代
// 5.1 迭代方法
/**
 * entries()：按照插入顺序返回键值对的遍历器
 * keys()：以插入顺序返回键名的遍历器
 * values()：以插入顺序返回键值的遍历器
 * 也可以使用 forEach()
 */
const functionVal = () => { }
const objVal = {}
const arrVal = []
const set = new Set([functionVal, objVal, arrVal])
console.log(set.entries())
// [Set Entries] {
//     [ [Function: functionVal], [Function: functionVal] ],
//     [ {}, {} ],
//     [ [], [] ]
// }
console.log(set.values()) // [Set Iterator] { [Function: functionVal], {}, [] }
console.log(set.keys()) // [Set Iterator] { [Function: functionVal], {}, [] }

// 5.2 Set 的默认遍历器生成函数就是它的values方法
for (let item of set) {
    console.log('for of', item)
}
// for of [Function: functionVal]
// for of {}
// for of []

// 5.3 无法在迭代操作中，直接改变 Set 结构；只能利用原 Set 结构映射出一个新的结构，然后赋值给原来的 Set 结构。
let set4 = new Set([1, 2, 3])
console.log('set4-1', set4) // set4-1 Set(3) { 1, 2, 3 }
for (let key of set4) {
    key *= 2
    console.log('key', key) // 2. 4. 6
}
console.log('set4-2', set4) // set4-2 Set(3) { 1, 2, 3 }
set4 = new Set([...set4].map(item => item * 2))
console.log('set4-3', set4) // set4-3 Set(3) { 2, 4, 6 }



// 6. Set 里的成员是唯一的：可用于数组和字符串去重
const set3 = new Set(['val1', 'val2', 'val1', 'val2', 'val4'])
console.log(set3) //Set(3) { 'val1', 'val2', 'val4' }
const str4 = 'abasdfasdafas'
console.log([...new Set(str4)].join('')) // absdf