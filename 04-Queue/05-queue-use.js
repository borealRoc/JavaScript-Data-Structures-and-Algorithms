// 队列运用：击鼓传花
// 游戏规则：在这个游戏中，孩子们围成一个圆圈，把花尽快地传递给旁边的人。某一时刻传花停止，这个时候花在谁手里，谁就退出圆圈、结束游戏。重复这个过程，直到只剩一个孩子（胜者）。

const { Queue, Deque } = require('./queue')

const hotPotato = (merbers, boomNum) => {
    if (merbers.length === 0) return '没人参加游戏'

    const queue = new Queue
    const outers = []
    // 1. 把参加游戏的人放入队列
    merbers.forEach(item => {
        queue.enqueue(item)
    })
    // 2. 当游戏队列大于 1 人， 继续游戏
    while (queue.size() > 1) {
        for (let i = 0; i < boomNum; i++) {
            // 2.1 传花过程中，当没达到 boomNum 时, 用”队首出队后=>移到队尾“模拟传花过程
            queue.enqueue(queue.dequeue())
        }
        // 2.2 传花过程中，达到 boomNum 时，把此时的人放入淘汰队列
        outers.push(queue.dequeue())
    }
    // 3. 当游戏队列剩余 1人，则该人为胜者
    return {
        outers,
        winder: queue.dequeue()
    }
}

const merbers = ['小明', '小红', '大胖', '小志']
const res = hotPotato(merbers, 5)
res.outers.forEach((item, index) => {
    console.log(`在击鼓传花游戏中, 第${index + 1} 个 被淘汰的是 ${item}`)
})
console.log(`在击鼓传花游戏中, 胜者是 ${res.winder}`)
// 在击鼓传花游戏中, 第1 个 被淘汰的是 小红
// 在击鼓传花游戏中, 第2 个 被淘汰的是 小明
// 在击鼓传花游戏中, 第3 个 被淘汰的是 小志
// 在击鼓传花游戏中, 胜者是 大胖


// 双端队列运用：回文检查器
// 将字符串反向排列并检查它和原字符串是否相同，如果两者相同，那么它就是一个回文
const palindromeCheck = str => {
    // 如果传入的参数为假值，直接返回 false
    if (!str) return false

    // 处理字符串：将所有字母转化为小写，同时移除所有的空格
    const formatStr = str.toLocaleLowerCase().split(' ').join('')

    // 把处理后的字符，放入一个双端队列中
    const deque = new Deque()
    for (let i = 0; i < formatStr.length; i++) {
        deque.enqueueBack(formatStr.charAt(i))
    }
    while (deque.size() > 1) {
        // 依次弹出队首和队尾的元素
        const front = deque.dequeueFront()
        const back = deque.dequeueBack()
        // 如果队首和队尾的元素出现不相等，则不满足回文
        if (front !== back) {
            return false
        }
    }
    // 如果字符串长度只为1，或队列的首尾字符都相同，则满足回文
    return true
}
console.log('NaN', palindromeCheck(NaN))  // NaN false
console.log('hello', palindromeCheck('hello')) // hello false
console.log('heleh', palindromeCheck('heleh')) // heleh true
console.log('Was it a car or a cat I saw', palindromeCheck('Was it a caror a cat I saw')) // Was it a car or a cat I saw true

