'use strict';

class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
  insert(key, value) {
    if (this.key === null) {
      this.key = key;
      this.value = value;
      //go left
    } else if (key < this.key) {
      if (this.left === null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    } else {
      if (this.right === null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }
  find(key) {
    if (this.key === null) {
      return 'tree is empty';
    } else if (this.key === key) {
      return this.value;
    } else if (key < this.key && this.left) {
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      return this.right.find(key);
    } else {
      throw new Error('key error');
    }
  }

  remove(key) {
    if (this.key === null) {
      return 'tree is empty';
    } else if (this.key === key) {
      // if there are no children
      if (this.left === null && this.right === null) {
        this._replaceWith(null);
        // if there are no right children
      } else if (this.left !== null && this.right === null) {
        this._replaceWith(this.left);
        // if there are no left children
      } else if (this.right !== null && this.left === null) {
        this._replaceWith(this.right);
        //(if (this.left && this.right))
      } else {
        const successor = this.left._findMax();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error('key error');
    }
  }
  _replaceWith(node) {
    //is used to find the node you want to replace with as you remove a node that has children. 
    //If the node you are replacing has a parent then you need to fix up the 
    //references from the parent to the replacement node, and the replacement node back to the parent. 
    //Otherwise, if the node is a root node then you simply copy over the properties of the replacement node.
    if (this.parent) {
      if (this === this.parent.left) {
        this.parent.left = node;
      } else if (this === this.parent.right) {
        this.parent.right = node;
      }
      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }
  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
  _findMax() {
    if (!this.right) {
      return this;
    }
    return this.right._findMax();
  }
}
class NonBinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
  insert(key, value) {
    if (this.key === null) {
      this.key = key;
      this.value = value;
      //go left
    } else if (key < this.key) {
      if (this.right === null) {
        this.right = new NonBinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    } else {
      if (this.left === null) {
        this.left = new NonBinarySearchTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    }
  }
}
// bst = 3; 
function height(bst) {

  if (!bst) {
    return 0;
  }
  if (bst.left !== null) {
    console.log('bst.left', bst.left.value);
  }
  if (bst.right !== null) {
    console.log('bst.right', bst.right.value);
  }

  let left = height(bst.left);
  let right = height(bst.right);
  console.log('left', left);
  console.log('right', right);

  return Math.max(left, right) + 1;
}

function isBst(bst) {
  if (!bst) {
    return false;
  }

  if (!bst.left && !bst.right) {
    return true;
  }

  if (bst.left) {
    if (bst.key > bst.left.key) {
      return isBst(bst.left);
    } else {
      return false;
    }
  }
  if (bst.right) {
    if (bst.key < bst.right.key) {
      return isBst(bst.right);
    } else {
      return false;
    }
  }

}
function main() {
  const BST = new BinarySearchTree();
  const BST2 = new NonBinarySearchTree();
  BST.insert(3, 3);
  BST.insert(1, 1);
  BST.insert(4, 4);
  BST.insert(6, 6);
  BST.insert(9, 9);
  BST.insert(2, 2);
  BST.insert(5, 5);
  BST.insert(7, 7);
  BST.insert(8, 8);
  // BST.insert(11, 11);
  // BST.insert(13, 13);
  //BST.remove(3);
  // console.log(BST);
  // console.log(height(BST));
  BST2.insert(3, 3);
  BST2.insert(1, 1);
  BST2.insert(4, 4);
  BST2.insert(6, 6);
  BST2.insert(9, 9);
  BST2.insert(2, 2);
  BST2.insert(5, 5);
  BST2.insert(7, 7);
  BST2.insert(8, 8);
  // console.log(isBst(BST2));
}

main();