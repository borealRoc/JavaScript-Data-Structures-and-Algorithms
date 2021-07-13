# JavaScript 基础知识
## 一、JavaScript 数据类型转换
1. 显示转换
    - String()
        - 基本数据类型: string, number, boolean, null, undefined => 直接加 '' 转成字符串 
        - 引用数据类型
            - Object
                - String(Object): 按顺序依次调用 toPrimitive(), toString()[不会调用 valueOf()]，返回对应方法的返回值
                - Object.toString(): 优先调用 toString()
                - 不存在 toPrimitive() 和 toString()， 返回`'[object Object]'`
            - Array
                - [1, 2]: '1, 2'
                - []: ''
            - Function, Date, RegExp: 直接加 '' 转成字符串
    - Number()
        - 基本数据类型
            - string
                - 如果只包含有效数字[整数和浮点数]，则转换成相应的数字：处2[能处理2进制], 忽8[忽略前导0], 转16[把16进制转成10进制]
                - 空字符串：0
                - 以上都不满足：NaN
            - boolean
                - true: 1
                - false: 0 => 但是 false != 0
            - null: 0 => 但是 null != 0
            - undefined: NaN
        - 引用数据类型
            - Object
                - 按顺序依次调用 toPrimitive(), valueOf() 和 toString(), 返回对应方法的返回值
                - 只有当前一种方法不存在时，才会调用下一种方法，即使前一种方法返回 NaN[跟书本讲的不一样]
                - 以上三种方法都不存在，返回 NaN
    - Boolean()
        - 假值：空字符串, 0 和 NaN, false, null, undefined
        - 真值: 非空字符串, 非 0 有效数字, true, 一切对象
2. 隐式转换
    - 转 string
        - 加号 + 操作符，且其中一个数是字符串
    - 转 number
        - 一元 + 操作符
        - 减号 - 操作符
        - 相等操作符: ==
        - 比较操作符: >, >=, <, <=
    - 转 boolean
        - ! 和 !!
        - if () 语法括号里的表达式
## 二、在 Node 中运行 ESModule
1. 把文件后缀改为 .mjs
2. 在执行命令 node 后面加 `--experimental-module` 参数，比如：`node --experimental-module index.mjs`  

## 三、TypeScript
1. TypeScript在编译时进行了类型和错误检测，但并不会阻止编译器生成JavaScript代码
2. @ts-check：在 js 文件顶部添加 JSDoc 注释 `//@ts-check`，就可以对 js 文件开启 ts 检查
