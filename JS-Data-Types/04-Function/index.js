// Function
// 1. 函数内部：函数内部存在三个特殊的对象
/**
 * arguments: arguments.callee，一个指向 arguments 对象所在函数的指针
 * this：标准函数中，this 指向把函数当作方法调用的上下文对象；箭头函数中，this 指向定义箭头函数的上下文
 * new.target：如果函数是正常调用，则 new.target 指向 undefined, 如果被使用 new 调用，new.target 指向被调用的构造函数
 */

// 2. 函数属性
/**
 * caller: 调用当前函数的函数
 * length: 形参的数量
 * prototype
*/
// 3. 函数方法
/**
 * call(thisObj, ...args)：函数内this的值和逐个参数
 * apply(thisObj, [args]): 函数内this的值和一个参数数组
 * fn.bind(thisObj)：创建 fn 函数的一个新实例，并把 this 指向 thisObj
 */
// 4. 参数按值传递
/**
 * 基础类型：传递值
 * 引用类型：传递引用类型的地址
 */

// 阶乘
function factorial(n) {
    if (n <= 1) return 1
    return n * arguments.callee(n - 1)
}
console.log(factorial(4))

// caller
function outer() {
    inner()
}
function inner() {
    console.log(arguments.callee.caller)
}
outer() // [Function: outer]

// new.target
function King() {
    console.log('new.target', new.target)
}
const foo1 = new King() // new.target [Function: King]
King() // new.target undefined

// 参数按值传递
function test(name, person) {
    name = '李四'
    person.name = '李四'
    person = {
        name: '王五'
    }
    console.log('innerName', name)
    return person
}
let name = '张三'
const person = { name: '张三' }
const p1 = test(name, person) // innerName 李四
console.log('outerName', name) // outerName 张三
console.log('person', person) //person { name: '李四' }
console.log('p1', p1) // p1 { name: '王五' }