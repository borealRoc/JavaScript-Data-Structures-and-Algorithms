// WeakMap
// 1. 创建：const weakSet = new WeakSet()
// 2. 初始化：参数的每个成员必须是 Object 类型
// 3. 属性：不可遍历，没有 size 属性
// 4. 方法
// 4.1 基本方法：add(), delete(), get(), has()
// 4.2 遍历方法：不可遍历，没有 entries(), keys(), values(), forEach() 等方法 

// 1. 值必须是 Object 类型
const objVal = {}
const arrVal = []
const funVal = () => {}
const ws1 =  new WeakSet([objVal, arrVal, funVal])
// WeakSet 
// [[Entries]]
// 0: Array(0)
// 1: Object
// 2: () => {}

// 2. 如果键不是 Object 类型会报错
// ws1.add(1)
// Uncaught TypeError: Invalid value used in weak set

// 3. 值. 键可以是原始数据类型的包装类型
const strObj = new String('hello')
ws1.add(strObj)
// WeakSet {Array(0), {…}, ƒ, String}

// 4. 属性：WeakSet 没有size属性，没有办法遍历它的成员
// WeakSet 不能遍历，是因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了

// 5. 方法
/**
 * add: 向 WeakSet 实例添加一个新成员
 * delete：清除 WeakSet 实例的指定成员
 * has：返回一个布尔值，表示该值是否为Set的成员
 */