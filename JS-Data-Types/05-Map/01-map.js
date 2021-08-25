// Map
// 1. 创建：const map = new Map()
// 2. 初始化：参数是任何具有 Iterator 接口，且每个“成员”都是一个双元素的数组的数据结构
// 3. 属性：size
// 4. 方法
// 4.1 基本方法：set(), delete(), get(), has(), clear()
// 4.2 遍历方法：entries(), keys(), values(), forEach()

// 1. 创建
const map = new Map()
console.log(map) // Map(0) {}

// 2. 初始化，参数：任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构
const map1 = new Map([
    ['key1', 'val1'],
    ['key2', 2],
])
console.log(map1) // Map(2) { 'key1' => 'val1', 'key2' => 2 }
const map11 = new Map(map1)
console.log('map11', map11) // map11 Map(2) { 'key1' => 'val1', 'key2' => 2 }

// 3. 属性
/**
 * size: 大小
 */
console.log(map1.size) // 2

// 4. 方法
/**
 * set: 添加键值对
 * get：获取某个键对应的值
 * has：判断是否有某属性
 * delete：删除某属性
 * clear：清空
 */
map1.set('key3', false)
console.log(map1) // Map(3) { 'key1' => 'val1', 'key2' => 2, 'key3' => false }
console.log(map1.get('key1')) // val1
console.log(map1.has('key')) // false
console.log(map1.has('key1')) // true
map1.delete('key1')
console.log(map1) // Map(2) { 'key2' => 2, 'key3' => false }
map1.clear()
console.log(map1) // Map(0) {}

// 5. Map 可以使用任何 JS 数据类型作为键
const objectKey = {}
const arrKey = []
const functionKey = function () {}
const symbolKey = Symbol()

const map2 = new Map([
    [objectKey, 'objectVal'],
    [arrKey, 'arrVal'],
    [functionKey, 'functionVal'],
    [symbolKey, 'symbolVal'],
])
console.log(map2)
// Map(4) {
//     {} => 'objectVal',
//     [] => 'arrVal',
//     [Function: functionKey] => 'functionVal',
//     Symbol() => 'symbolVal'
// }

// 6. Map 会维护键值对的插入顺序
// 7. 迭代
/**
 * entries()：返回以插入顺序生成[key, value]形式的迭代器
 * keys()：返回以插入顺序生成键的迭代器
 * values()：返回以插入顺序生成值的迭代器
 * 也可以使用 forEach()
 */
console.log(map2.entries())
// [Map Entries] {
//     [ {}, 'objectVal' ],
//     [ [], 'arrVal' ],
//     [ [Function: functionKey], 'functionVal' ],
//     [ Symbol(), 'symbolVal' ]
// }
console.log(map2.keys()) // [Map Iterator] { {}, [], [Function: functionKey], Symbol() }
console.log(map2.values()) // [Map Iterator] { 'objectVal', 'arrVal', 'functionVal', 'symbolVal' }

// 7.2 Map 结构的默认遍历器接口（Symbo.iterator属性）,就是 entries()
for (const item of map2) {
    console.log('for of 返回：', item)
}
// for of 返回： [ {}, 'objectVal' ]
// for of 返回： [ [], 'arrVal' ]
// for of 返回： [ [Function: functionKey], 'functionVal' ]
// for of 返回： [ Symbol(), 'symbolVal' ]