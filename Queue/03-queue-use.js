// 队列队列运用：击鼓传花
// 游戏规则：在这个游戏中，孩子们围成一个圆圈，把花尽快地传递给旁边的人。某一时刻传花停止，这个时候花在谁手里，谁就退出圆圈、结束游戏。重复这个过程，直到只剩一个孩子（胜者）。
const { Queue } = require('./01-queue')

function hotPotato(members, boomNum) {
    const queue = new Queue()
    const outMembers = []

    // 1. 把参加游戏的人依次放入队列
    for (const i of members) {
        queue.enqueue(i)
    }

    // 2. 当队列剩余人数大于1时，不断重复”传花“游戏
    while (queue.size() > 1) {
        // 2.1 传花过程中，当没达到 boomNum 时, 用”队首出队后=>移到队尾“模拟传花过程
        for (let i = 0; i < boomNum; i++) {
            queue.enqueue(queue.dequeue())
        }
        // 2.2 传花过程中，达到 boomNum 时，把此时的人移出队列放入淘汰数组
        outMembers.push(queue.dequeue())
    }

    // 3. 返回淘汰的人和胜者
    return {
        outMembers,
        winner: queue.peek()
    }
}

const merbers = ['小明', '小红', '大胖', '小志']
const res = hotPotato(merbers, 5)
res.outMembers.forEach((item, index) => {
    console.log(`在击鼓传花游戏中, 第${index + 1} 个 被淘汰的是 ${item}`)
})
console.log(`在击鼓传花游戏中, 胜者是 ${res.winner}`)
// 在击鼓传花游戏中, 第1 个 被淘汰的是 小红
// 在击鼓传花游戏中, 第2 个 被淘汰的是 小明
// 在击鼓传花游戏中, 第3 个 被淘汰的是 小志
// 在击鼓传花游戏中, 胜者是 大胖


// // 双端队列运用：回文检查器
// // 将字符串反向排列并检查它和原字符串是否相同，如果两者相同，那么它就是一个回文
const { Deque } = require('./02-deque')
function palindromeCheck(str) {
    // 1. str 校验
    if (str == undefined || str.length === 0) {
        return false
    }
    // 2. 把 str 统一成小写，并去除字符中的空格
    const lowerStr = str.toString().toLocaleLowerCase().split(' ').join('')
    // console.log('lowerStr', lowerStr)
    // 3. 把 str 的字符逐一放入双端队列
    const deque = new Deque()
    for (const i of lowerStr) {
        deque.addBack(i)
    }
    // console.log('deque', deque)
    // 4. 从字符队列中逐一弹出队首和队尾字符，比较它们是否相等
    while (deque.size() > 1) {
        const front = deque.removeFront()
        const back = deque.removeBack()
        if (front !== back) {
            return false
        }
    }
    return true
}
console.log(palindromeCheck(NaN))  // true
console.log(palindromeCheck('hello')) // false
console.log(palindromeCheck('heleh')) // true
console.log(palindromeCheck('Was it a caror a cat I saw')) // true