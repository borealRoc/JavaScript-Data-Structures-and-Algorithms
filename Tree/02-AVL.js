const { BST } = require('./01-BST')
const { BalanceFactor, TreeNode } = require('../utils/models')

class AVL extends BST {
    constructor(compareFn) {
        super(compareFn)
        this.root = null
    }
    // 1. 计算一个节点的高度
    getNodeHeight(node) {
        if (node == null) {
            return -1
        }
        return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1
    }
    // 2. 计算一个节点的平衡因子：左子树高度 - 右子树高度
    getBalanceFactor(node) {
        const highDiff = this.getNodeHeight(node.left) - this.getNodeHeight(node.right)
        switch (highDiff) {
            case -2:
                return BalanceFactor.UNBALANCED_RIGHT
            case -1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
            case 1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
            case 2:
                return BalanceFactor.UNBALANCED_LEFT
            default:
                return BalanceFactor.BALANCED
        }
    }
    // 3. 旋转操作
    // 3.1 LL 型: 单 R 旋
    /**
     *             30
     *            /  \    
     *           25  40            25       30            25
     *          /  \              /        /  \          /  \
     *         15  28       =>   15       28  40  =>    15   30 
     *        /                 /                      /     / \
     *       10                10                     10    28  40
     * 
     * （1）暂存 Lh1
     * （2）把 Lh1.right 赋值给 node.left
     * （3）把 node 赋值给 Lh1.right
     * （4) 返回 Lh1
     */
    rotationLL(node) {
        const temp = node.left
        node.left = temp.right
        temp.right = node
        return temp
    }
    // 3.2 RR 型: 单 L 旋
    /**
     *      20         
     *     /  \         
     *    10  30     =>     30           20       =>           30
     *       /  \             \         /  \                  /  \
     *      22   32            32      10   22               20   32
     *            \             \                           /  \   \
     *             40            40                        10  22   40
     * （1）暂存 Rh1
     * （2）把 Rh1.left 赋值给 node.right
     * （3）把 node 赋值给 Rh1.left
     * （4）返回 Rh1
     */
    rotationRR(node) {
        const temp = node.right
        node.right = temp.left
        temp.left = node
        return temp
    }
    // 3.3 LR 型: 先 L 旋，再 R 旋
    /**                                                    
     *      50                                                    50                            40
     *     /  \                                         40       /  \                          /  \
     *    30  70                                        /       40   70                       30   50 
     *   /  \     =>先处理RR:L旋   40    40    30       30       /         => 再处理LL:R旋     /  \    \
     *  10  40                   /           /  \     /  \     30                           10   35   70
     *      /                   35          10  35   10  35   /  \
     *     35                                                10   35
     */
    rotatonLR(node) {
        node.left = this.rotationRR(node.left)
        return this.rotationLL(node)
    }

    // 3.4 RL 型: 先 R 旋，再 L 旋
    /**                                                    
     *      70                                           70                              72
     *     /  \                                         /  \                            /  \
     *    50  80                     80       72       50  72                          70  80 
     *       /  \   =>先处理LL:R旋   /  \       \             \      => 再处理RR:L旋    /   /  \   
     *      72  90                 75  90      80            80                      50   75  90
     *       \                                /  \          /  \
     *       75                              75  90        75  90     
     */
    rotationRL(node) {
        node.right = this.rotationLL(node.right)
        return this.rotationRR(node)
    }
    // 4. 插入节点：在插入过程校验平衡因子，如不平衡要进行旋转操作
    insert(key) {
        this.root = this.insertNode(this.root, key)
    }
    insertNode(node, key) {
        // 1. 先插入
        if (node == null) {
            return new TreeNode(key)
        } else if (this.compareFn(key, node.key) === -1) {
            node.left = this.insertNode(node.left, key)
        } else if (this.compareFn(key, node.right) === 1) {
            node.right = this.insertNode(node.right, key)
        } else {
            throw new Error(`${key} existed, cannot be inserted`)
        }
        // 2. 后校验和旋转
        const balanceFactor = this.getBalanceFactor(node)
        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
            if (this.compareFn(key, node.left.key) === -1) {
                node = this.rotationLL(node)
            } else {
                node = this.rotatonLR(node)
            }
        }
        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
            if (this.compareFn(key, node.right.key) === 1) {
                node = this.rotationRR(node)
            } else {
                node = this.rotationRL(node)
            }
        }
        // 3. 返回经过旋转处理后的节点
        return node
    }
    // 5. 删除节点：在删除过程校验平衡因子，如不平衡要进行旋转操作
    removeNode(node, key) {
        // 1. 继承 BST类 的 removeNode 方法
        node = super.removeNode(node, key)

        // 2. 移除后节点为 null，不需要进行平衡操作
        if (node == null) {
            return node
        }

        // 3. 平衡操作
        const balanceFactor = this.getBalanceFactor(node)
        // 3.1 如果移除节点后，左树不平衡了
        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
            const leftBalanceFactor = this.getBalanceFactor(node.left)
            // 3.1.1 如果左侧子树向左不平衡，要进行LL旋转
            if (leftBalanceFactor === BalanceFactor.BALANCED || leftBalanceFactor === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
                node = this.rotationLL(node)
            }
            // 3.2 如果左侧子树向左不平衡，要进行LR旋转
            if (leftBalanceFactor === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
                node = this.rotationLR(node)
            }
        }
        // 3.2 如果移除节点后，右子树不平衡了
        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
            const rightBalanceFactor = this.getBalanceFactor(node.right)
            // 3.2.1 如果右侧子树向右不平衡，要进行RR旋转
            if (rightBalanceFactor === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT || rightBalanceFactor === BalanceFactor.BALANCED) {
                node = this.rotationRR(node)
            }
            // 3.2.2 如果右侧子树向左不平衡，要进行RL旋转
            if (rightBalanceFactor === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
                node = this.rotationRL(node)
            }
        }

        return node
    }

}
