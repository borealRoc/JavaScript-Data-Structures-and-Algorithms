// Object 
// 一、属性
// 1. 属性类型：数据属性，访问器属性

// 2. 属性特性：用来描述属性的特性
// 2.1 数据属性有4个特性描述它们的行为：
/**
 * [[Configurable]]：可配置的：（1）表示属性是否可以通过 delete 删除并重新定义；（2）是否可以修改属性的特性；（3）是否可以将属性改为访问器属性
 * [[Enumerable]]：可枚举的：（1）表示属性是否可以通过 for-in 进行迭代返回
 * [[Writable]]：可写的：（1）表示属性的值是否可以修改
 * [[Value]]：属性的值
 */
// 2.2 访问器属性有4个特性描述它们的行为：
/**
 * [[Configurable]]：可配置的：（1）表示属性是否可以通过 delete 删除并重新定义；（2）是否可以修改属性的特性；（3）是否可以将属性改为数据属性
 * [[Enumerable]]：可枚举的：（1）表示属性是否可以通过 for-in 进行迭代返回
 * [[Get]]：读取函数
 * [[Set]]：设置函数
 */
// 2.3 属性特性要点
// （1）创建对象，[[Configurable]], [[Enumerable]], [[Writable]] 默认为 true，[[Value]]为初始化的值
// （2）在调用 Object.defineProperty() 时，configurable, enumerable, writable 默认为 false
// （3）一个属性被定义成不可配置的之后，就不能改成可配置的了
// （4）访问器属性不能直接定义，必须通过 Object.defineProperty()

// 二、方法
// 1. 属性方法
// （1）设置单个属性的特性：Object.defineProperty(obj, key, {configurable: false, enumerable: false, writable: false, value: null})
// （1）设置多个属性的特性：Object.defineProperties(obj, {key1: { }, key2: { }})
// （3）读取单个属性的特性：Object.getOwnProperty(obj, key)
// （4）读取多个属性的特性：Object.getOwnProperties(obj)
// （5）判断对象自身是否具有某属性：Object.hasOwnProperty(key)
// （6）获取一个对象的非 Symbol 私有属性, 返回一个数组：Object.keys(obj)，和 Object.getOwnProptertyName(obj) 一样
// （7）获取一个对象的 Symbol 私有属性, 返回一个数组 Object.getOwnPropertySymbols(obj)
// 2. 对象方法
// （1）Object.getPrototypeOf(obj)：返回obj的原型（内部[[Prototype]]属性的值）
// （2）Object.create(protoObj)：以 protoObj 为原型创建一个对象
// （3）Object.assign(obj1, obj2)：把 obj2 混入到 obj1 上,返回 obj1；如果 obj2 和 obj1 属性一样（浅比较），则 obj2 覆盖 obj1
// （4）Object.freeze(obj)：冻结 obj：冻结后（1）不能修改、添加、删除属性；（2）不能修改属性特性；（3）不能修改原型
// （5）Object.is(val1, val2)：判断两个值是否为同一个值

console.log(Object.is(NaN, NaN)) // true
