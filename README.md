# JavaScript-Data-Structures-and-Algorithms

## 第一章 JavaScript 数据类型
### 一、基础数据类型
1. 数据类型及其含义
    - Undefined：声明未赋值
    - Null：空对象指针
    - Boolean：true, false
    - Number：有效数值, Infinity, -Infinity, NaN
    - String
    - Symbol：唯一标识
    - bigint：大整数
    - Object: 普通对象，数组，函数，Date，正则, Window, Math……
2. 数据类型检测
    - typeof: 'string', 'number', 'boolean', 'symbol','bigint','function', 'object'[ 无法区分对象，数组和 null，因为它们的 typeof 都是返回 'object']
    - instanceof：和 typeof 一起利用可以区分对象，数组和 null
    - Object.prototype.toString.call(x).slice(8, -1)：完美，能检测任何类型
    - 其它：isNaN, Array.isArray()
3. 类型转换
    - 3.1 转换类型
        - 显式转换
            - 转 String：String(), toString()
            - 转 Number：Number(), parseInt(), parseFloat()
            - 转 Boolean：Boolean()
        - 隐式转换
            - 转 String：x + ''
            - 转 Number
                - 一元 + 和 - [变相反数] 
                - 减号 - 操作符
                - 相等操作符：==
                - 比较操作符：>, <, >=, <=
            - 转 Boolean：! 和 !!
    - 3.2 转换规则
        - 转 String
            - 基础数据类型：用 '' 包裹
            - 引用数据类型
                - 对象
                    - 按顺序调用对象的 `Symbol[toPrimitive]()` 和 `toString()`，不会调用 `valueOf()` [跟书本说的不一样]
                    - 如果是 toString()，则会优先调用 `toString()`
                    - 如果不存在上述两个方法，返回 `'[object Object]'`
                - 数组
                    - [1, 2] => '1, 2'
                    - [] => ''
                - 函数, Data, RegExp：用 '' 包裹
        - 转 Number
            - boolean: true => 1, false => 0, 且 true == 1, false == 0
            - null: 0, 但是 null != 0
            - undefined: NaN
            - string
                - 如果只包含有效数字：转成对应的数字
                - 空字符串：0
                - 其它：NaN
            - Object
                - 按顺序调用对象的 `Symbol[toPrimitive]()`, `valueOf()` 和 `toString()`
                - 只有当前一种方法不存在时，才会调用后一种方法，即使前一种返回的是 NaN [跟书本说的不一样]
                - 以上三个方法都不存在，返回 NaN
            - Array
                - 空数组：[] => 0
                - 只存在一个元素：[2] => 2
                - 其它：NaN
        - 转 Boolean
            - 转 false：空字符串，0 和 NaN, false, undefined, null
            - 转 true：非空字符串，有效数值，true，一切非 null 对象
### 二、引用数据类型
1. 基本引用类型
    - Date 
    - RegExp
    - 原始类型的包装对象：new String()/Boolean()/Number
    - 单体内置对象：全局对象 Global(Window)， Math
2. 集合引用类型
    - Object：一组属性的无序集合
    - Function：函数是对象，函数名是指向函数对象的指针
    - Array：表示一组有序的值
    - Map[映射]：与 Object 类似
        - 键名可以是任意数据类型
        - 有序
    - WeakMap：与 Map 类似
        - 只接受对象[null除外]作为键名
        - 键名所指向的对象，不计入垃圾回收机制
        - 弱引用的只是键名，而不是键值。键值依然是正常引用
        - 没有遍历操作
    - Set[集合]：与 Array 类似
        - 值唯一，不重复（可用于数组和字符串去重）
    - WeakSet：与 Set 类似
        - WeakSet 的成员只能是 Object 类型
        - WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用
        - 没有遍历操作

## 第二章 基于 JavaScript 数据类型拓展数据结构
### 一、栈
1. 特点：后进先出，元素的进出只发生在栈顶
2. 创建
    - 基于数组创建栈：基于数组创建的栈，大多数方法的时间复杂度是 O(n)。（在大多数语言中）数组的大小是固定的，从数组的起点或中间插入或移除项的成本很高，因为需要移动元素。（尽管 JavaScript 有来自 Array 类的方法可以帮忙做这些事，但背后的情况同样如此。）
    - 基于对象创建栈：基于对象创建的栈，大多数方法的时间复杂度是 O(1)
### 二、队列
1. 队列：先进先出，从队尾添加元素，从队首移除元素
2. 双端队列：先进先出，后进先出，把栈和队列相结合的一种数据结构
3. 循环队列：从队首移除元素，并添加到队尾
### 三、链表
1. 链表
    - 定义：链表存储有序的元素集合，但不同于数组，链表中的元素并不是连续的。每个元素由一个存储自身元素的节点和指向下一个元素的引用组成（现实中的链表例子：寻宝游戏。你有一条线索，这条线索就是指向寻找下一条线索的地点的指针。你顺着这条链接去下一个地点，得到另一条指向再下一处的线索。得到链表中间的线索的唯一办法，就是从起点（第一条线索）顺着链表寻找。）
    - 和数组相比：
        - 优点：链表添加和移除元素不需要移动其它元素
        - 缺点：在数组中，我们可以直接访问任何位置的任何元素，而要想访问链表中的一个元素，则需要从起点（表头）开始迭代链表直到找到所需的元素
2. 双向链表：而在双向链表中，链接是双向的：一个链向下一个元素，另一个链向前一个元素。
    - 和链表相比
        - 可以快速获取尾部元素
        - 若想访问双向链表中的一个元素，如果 position > length/2，从尾部迭代可以加快查找速度；
3. 循环链表：（可单向，可双向）最后一个元素指向第一个元素，而不是 undefined
4. 有序链表：保持元素有序的链表结构
> 数组，栈，队列和链表都是顺序结构
### 四、集合
1. 定义：值不重复的，无序的数据结构
### 五、字典
### 六、散列表
### 七、树
### 八、图

