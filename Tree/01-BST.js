// 二叉搜索数
const { TreeNode } = require("../utils/models")
const { defaultCompare } = require("../utils/methods")

class BST {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn
        this.root = null
    }

    // 1. 搜索树：不会更改树结构
    // 1.1 在树中查找一个键。如果节点存在，则返回true；如果不存在，则返回false
    search(key) {
        return this.searchNode(this.root, key)
    }
    searchNode(node, key) {
        if (node == null) return false
        let current = node
        if (this.compareFn(key, current.key) === -1) {
            current = current.left
            return this.searchNode(current, key)
        } else if (this.compareFn(key, current.key) === 1) {
            current = current.right
            return this.searchNode(current, key)
        } else {
            return true
        }
    }
    // 1.2 树最小值
    min() {
        return this.minNode(this.root)
    }
    minNode(node) {
        let current = node
        while (current != null && current.left != null) {
            current = current.left
        }
        return current
    }
    minValue() {
        return this.min().key
    }
    // 1.3 树最大值
    max() {
        return this.maxNode(this.root)
    }
    maxNode(node) {
        let current = node
        while (current != null && current.right != null) {
            current = current.right
        }
        return current
    }
    maxValue() {
        return this.max().key
    }

    // 2. 遍历树：不会更改树结构
    // 2.1 中序遍历
    inOrderTraverse(cb) {
        this.inOrderTraverseNode(this.root, cb)
    }
    inOrderTraverseNode(node, cb) {
        if (node != null) {
            this.inOrderTraverseNode(node.left, cb)
            cb(node.key)
            this.inOrderTraverseNode(node.right, cb)
        }
    }
    // 2.2 先序遍历
    preOrderTraverse(cb) {
        this.preOrderTraverseNode(this.root, cb)
    }
    preOrderTraverseNode(node, cb) {
        if (node != null) {
            cb(node.key)
            this.preOrderTraverseNode(node.left, cb)
            this.preOrderTraverseNode(node.right, cb)
        }
    }
    // 2.3 后序遍历 
    postOrderTraverse(cb) {
        this.postOrderTraverseNode(this.root, cb)
    }
    postOrderTraverseNode(node, cb) {
        if (node != null) {
            this.postOrderTraverseNode(node.left, cb)
            this.postOrderTraverseNode(node.right, cb)
            cb(node.key)
        }
    }

    // 3. 操作树：会更改树结构
    // 3.1 插入值
    insert(key) {
        if (this.root == null) {
            this.root = new TreeNode(key)
        } else {
            this.insertNode(this.root, key)
        }
    }
    insertNode(node, key) {
        if (this.compareFn(key, node.key) === -1) {
            if (node.left == null) {
                node.left = new TreeNode(key)
            } else {
                this.insertNode(node.left, key)
            }
        } else if (this.compareFn(key, node.key) === 1) {
            if (node.right == null) {
                node.right = new TreeNode(key)
            } else {
                this.insertNode(node.right, key)
            }
        } else {
            throw new Error(`${key} existed, cannot be inserted`)
        }
    }
    // 3.2 移除值
    remove(key) {
        const hasKey = this.search(key)
        if (hasKey) {
            this.root = this.removeNode(this.root, key)
        } else {
            throw new Error(`${key} cannot be found`)
        }
    }
    removeNode(node, key) {
        if (node == null) return null

        if (this.compareFn(key, node.key) === -1) {
            node.left = this.removeNode(node.left, key)
            return node
        } else if (this.compareFn(key, node.key) === 1) {
            node.right = this.removeNode(node.right, key)
            return node
        } else {
            // 找到了
            if (node.left == null && node.right == null) {
                // 1. 如果删除的是一个叶子节点，直接将该叶子节点赋值为 null，并返回
                node = null
                return node
                // 父被删：儿子顶上
            } else if (node.left == null) {
                // 2. 如果删除的是一个只有右子节点的节点， 把右子节点赋值给它，并返回
                node = node.right
                return node
            } else if (node.right == null) {
                // 3. 如果删除的是一个只有左子节点的节点， 把左子节点赋值给它，并返回
                node = node.left
                return node
            } else {
                // 4. 如果删除的是一个同时有左右子节点的节点，有两种方法
                // 4.1 方法一：找到左子树的最大节点，赋值给它；把“左子树的最大节点”原先所在的节点删除，更新去除“左子树的最大节点”后的左子树；返回节点
                // const aux = this.maxNode(node.left)
                // node.key = aux.key
                // node.left = this.removeNode(node.left, aux.key)
                // return node
                // 4.2 方法二：找到右子树的最小节点，赋值给它；把“右子树的最小节点”原先所在的节点删除，更新去除“右子树的最小节点”后的右子树；返回节点
                const aux = this.minNode(node.right)
                node.key = aux.key
                node.right = this.removeNode(node.right, aux.key)
                return node
            }
        }

    }
}

module.exports = {
    BST
}