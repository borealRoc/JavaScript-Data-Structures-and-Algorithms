# JavaScript 基础知识
## 一、数据类型转换
1. 显式转换
    - 1.1 Boolean()
        - 真值
            - 字符串：非空字符串
            - 数字：非 0 数值
            - 布尔值：true
            - 对象：除 null 外
        - 假值
            - 字符串：空字符串
            - 数字：0 和 NaN
            - 布尔值：false
            - 对象：null
            - undefined

    > 假值不等价于 == false

    - 1.2 Number()
        - 布尔值：true：1，false：0
        - 数字：十进制数字
        - null：0, 但是 null != 0
        - undefined：NaN
        - 字符串
            - 如果只包含有效的数字，转换成对应的数字：保2, 忽8，处16
            - 如果只包含有效的浮点数，转换成对应的浮点数
            - 空字符串：0
            - 其它：NaN
        - 对象
            - 按顺序依次调用对象的 toPrimitive()，valueOf() 和 toString() 方法，返回对应方法的返回值
            - 只有当前一种方法不存在时，才会调用后一种方法【即使前一种方法返回 NaN, 只要它存在，就不会调用下一种方法】
            - 如果三种方法都不存在，返回 NaN
    - 1.3 String()
        - 字符传，数字，布尔值, null, undefined：直接转换成字符串
            - null 和 undefined 有 String()方法，没有 toString() 方法
        - 对象
            - 一般对象
                - 如果是用 String() 把对象转成字符串：按顺序依次调用对象的 toPrimitive() 和 toString() 【不会调用 valueOf()】，返回对应方法的返回值
                - 如果是用 toString() 把对象转成字符串，则会优先调用 toString() 
                - 如果没有 toPrimitive() 和 toString()：则返回 '[object Object]'
            - 数组
                - [1,2]：'1,2'
                - []：''
            - 函数，日期，正则：直接转换成字符串

2. 隐式转换
    - 2.1 转 Number
        - 一元 + 操作符
        - 减号 - 操作符
        - 想等操作符: == 
        - 比较操作符: >, <, >=, <=
    - 2.2 转 String
        - 加法 + 操作，且另一个数是字符串
    - 2.3 转 Boolean
        - ! 和 !!
        - if () 语句括号里的表达式

## 二、在 Node 中运行 ESModule
1. 把文件后缀改为 .mjs
2. 在执行命令 node 后面加 `--experimental-module` 参数，比如：`node --experimental-module index.mjs`  

## 三、TypeScript
1. TypeScript在编译时进行了类型和错误检测，但并不会阻止编译器生成JavaScript代码
2. @ts-check：在 js 文件顶部添加 JSDoc 注释 `//@ts-check`，就可以对 js 文件开启 ts 检查
