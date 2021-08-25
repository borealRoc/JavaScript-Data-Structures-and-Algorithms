// WeakMap
// 1. 创建：const weakMap = new WeakMap()
// 2. 初始化：参数的每个成员的键名必须是 Object 类型
// 3. 属性：不可遍历，没有 size 属性
// 4. 方法
// 4.1 基本方法：set(), delete(), get(), has()
// 4.2 遍历方法：不可遍历，没有 entries(), keys(), values(), forEach() 等方法 


// 1. 键必须是 Object 类型
const weakM1 = new WeakMap([
    [{id: 1}, 'id_1_val']
])
console.log(weakM1)
// WeakMap [[Entries]]
// 0: {{id: 1} => "objVal"}

// 2. 如果键不是 Object 类型会报错
const weakM2= new WeakMap([
    ['id_1', 'id_1_val']
])
// Uncaught TypeError: Invalid value used as weak map key

// 3. 键可以是原始数据类型的包装类型
const str = new String('id_2')
weakM1.set(str, 'id_2_val')
// WeakMap [[Entries]]
// 0: {{id: 1} => "objVal"}
// 1: {String {"id_2"} => "id_2_val"}
