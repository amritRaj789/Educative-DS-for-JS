/*Trees consist of vertices(nodes) and edges that connect them.
Unlike linear Data structures, Trees are hierarchical
They are similar to graphs except there cannot be a cycle, the nodes must be all connected
*/
// Root Node, Child Node, Parent Node, Sibling Node, Leaf Node, Ancestor Node

// Other terminologies :

/*Sub-Tree: For a particular non-leaf node, a collection of nodes, essentially the tree, starting
			from its child node. The tree formed by a node and its descendants
Degree of a node : Total number of children of a node
*/
// Length of a path : The number of edges in a path

// Depth of a node n : The length of the path from a node n to the root ndoe. The depth of the root node is 0.

// Level of a node n : (Depth of a Node) + 1

// Height of a node n : The length of the path from n to its deepest descendant. The height of the tree itself is the height of the root node. The height of leaf nodes is always 0.

// Height of a Tree : height of its root node

//Some Tree Types

/*
Binary Trees
Binary Search Trees
AVL Trees
Red-Black Trees
2-3 Trees
*/

// The N-ary Tree

/*In Grapth Theory, an N-ary tree is rooted tree in which each node has no more than N children. It is also sometimes known as a k-way tree, a k-ary tree, or an M-ary tree.
A binary tree is a special case where k=2. They can have a max of 2 child nodes
and a min of 0 child nodes. Binary trees are extensively in a plethora of important algorithms*/


// Binary Tree

// cannot have more than 2 children so it is a 2-ary tree
// children nodes are called left and right children of the node.

//Complete Binary Tree: 
//all nodes except for the last level which can be filled from left to right
// 2^h <= total number of nodes <= 2^(h+1) - 1
// nodes are inserted level by level
// fill in the left-subtree before moving to the right one

// Full Binary Trees:
// A full or proper Binary Tree has the following characteristics:
// every node has 0 or 2 children. No node can have 1 child
// The total number of nodes in a Full Binary Tree of height 'h' can be expressed as: 
// 2h + 1 <= total number of nodes <= 2^(h+1) - 1

// Perfect Binary Trees
// A binary tree is said to be perfect if it is both full and complete. Also, not that:
// total number of nodes = 2^(h+1) - 1
// the total number of leaf nodes : 2^h


/*There are many other advanced trees derived from the basic structire of Binary Trees. Some of the most common ones are:
Complete Binary Tree
Skewed Binary Tree
Binary Search Tree
AVL tree*/


// What makes a Tree Balanced?

// A binary tree is height-balanced if, for each node in the tree, 
//the difference between the height of the right subtree and the left subtree is at most one

//For each node, |Height(left subtree) - Height(right subtree)| <= 1

/*1.Start from the leaf nodes and move towards the root
2.Along with traversing the tree, compute the heights of left-subtree and right-subtree of each node. The height of a leaf node is always 0
3.At each node, check if the difference between the height of the ​left and right sub-tree is more than 1. If so, then it means that the tree is not balanced.
4.If you have completely traversed the tree and haven’t caught the above condition, then the tree is balanced.*/


//SKEWED BINARY TREE
Skewed Binary Trees are BTs where all the nodes except one have one and only one child.
All of the children are nodes are either left or right child nodes, so the entire tree is positioned
to the left or the right side. 
This type of BTs should be avoided at all costs because the time complexities of most operations will be high.

// Depending on if all the nodes are to the right or the left, we can have right skewed trees or left skewed trees


//BINARY SEARCH TREES (BST)

Binary Search Trees (BSTs) are a special kind of binary tree where each node of the tree has key-value pairs
These key-value pairs can be anything like (username, bank) or (employee, employee-id)

//THE BST Rule

// For all the nodes in a BST, the values of all the nodes in the left subtree of a node are less than the value of that node.
// ALl the values in the right subtree of a node are greater than the value of that node.




// IMPLEMENTING A BINARY SEARCH TREE

//you need a Node class first

Class Node {
	constructor(value){
		this.val = value;
		this.leftChild = null;
		this.rightChild = null;
	}
}

// let myNode = new Node(6);
// myNode.leftChild = new Node(5);
// myNode.rightChild = new Node(7);

//Create a wrapper class now

class BinarySearchTree{
	constructor(rootValue) {
		this.root = new Node(rootValue);
	}
}

let BST = new BinarySearchTree(8);
console.log("The root val for BST : ", BST.root.val)

//	BST Insertion Algorithm

insert(value){
	if(this.root === null){
		this.root = new Node(value)
		return
	}
	let node = this.root;
	let parentNode = this.root;
	while(node !== null){
		parentNode = node;
		if(value < node.val){
			node = node.leftChild;
		}
		else{
			node = node.rightChild;
		}
	}
	let newNode = new Node(value);
	if(value < parentNode.val)
		parentNode.leftChild = newNode;
	else
		parentNode.rightChild = newNode;
	return
}

// Pre-Order Traversal
// THe current node will always be visited before its children nodes. Therefore it is called preOrder

// Visit the currentNode i.e print the value stored in the current node
// Call the preOrderPrint() function on the left subtree of the currentNode
// Call the preOrderPrint() function on the right subtree of the currentNode

function preOrder(currentNode){
	if(currentNode !== null){
		console.log(currentNode.val);
		preOrder(currentNode.leftChild);
		preOrder(currentNode.rightChild);
	}
}

// Time complexity is O(n)

// In-Order Traversal
// left - right - root

function inOrder (currentNode){
	if(currentNode !== null){
		inOrder(currentNode.leftChild);
		console.log(currentNode.val);
		inOrder(currentNode.rightChild);
	}
}

//Post-order Traversal
// The current nde will be visited after its children node. Therefore it is called Post-Order
// left-right-root


function postOrder (currentNode){
	if(currentNode !== null){
		postOrder(currentNode.leftChild);
		postOrder(currentNode.rightChild);
		console.log(currentNode.val);
	}
}

// Searching in a BST

// iterative approach

function search (value){
	let node = this.root;
	while(node !== null){
		if(value < node.val)
			node = node.leftChild
		else if(value > node.val)
			node = node.rightChild;
		else
			return "found"
	}
	return "not found"
}

// recursive approach

search (node, value){
	if(node !== null){
		if(val < node.val)
			search(node.leftChild, value)
		else if(val > node.val)
			search(node.rightChild, value)	
		else
			return "found"
	}
	else
		return "not found"
}

// Deletion in Binary Search Tree

// There are 4 possible cases that may arise while deleting a value in a BST
1. Deleting in an empty tree
2. Deleting a node with no children i.e, a leaf node
3. Deleting a node with only one child
	3.a deleting a node with only a right child
	3.b deleting a node with only a left child
4. Deleting a node with two children


function delete(currentNode, value){
	// case 1: tree is empty
	if(currentNode === null)
		return false;
	// start traversing the tree
	let parentNode = null;
	while(currentNode !== null && value !== currentNode.val){
		parentNode = currentNode;
		if(value < currentNode.val){
			currentNode = currentNode.leftChild;
		}
		else
			currentNode = currentNode.rightChild;
	}
	// case 2 : value not found
	if(currentNode === null)
		return false;

	// value is found
	else{
		// case 3 : deleting a leaf node
		if(currentNode.leftChild === null && currentNode.rightChild === null){
			if(currentNode.val == this.root.val)
				this.root = null;
			else if(value > parentNode.val){
				parentNode.rightChild = null
				return true;
			}
			else{
				parentNode.leftChild = null
				return true;
			}
		}
		// case 4: deleting a node with a left child only
		else if(currentNode.leftChild !== null && currentNode.rightChild == null){
			if(currentNode.val < parentNode.val){
				parentNode.leftChild = currentNode.leftChild
				return true
			}
			else {
				parentNode.rightChild = currentNode.leftChild;
				return true
			}
		}
		// case 5: deleting a node with a right child only
		else if(currentNode.rightChild !== null && currentNode.leftChild == null){
			if(currentNode.val < parentNode.val){
				parentNode.leftChild = currentNode.rightChild;
				return true;
			}
			else{
				parentNode.rightChild = currentNode.rightChild;
				return true;
			}
		}

		// case 6: deleting a node that has bot a left Child and a right Child
		else{
			let minRightNode = currentNode.rightChild;
			while(minRightNode.leftChild !== null){
				minRightNode = minRightNode.leftChild;
			}
			let temp = minRightNode.val;
			this.delete(this.root, minRightNode.val);
			currentNode.val = temp;
			return true;
		}
	}
}


// AVL Tree (Adelson-Velsky-Landi)


//They are BSTs in which for every internal node v of the tree T the height of v's children can differ by at most 1
// to put it simply for each node the height of the left and right subtrees in an AVL tree can differ by at most 1, or the tree is balanced

In case of BSTs, the time complexities for Insertion, Deletion and Seach take O(h) where h is the height
the worst case scenario is O(n) for skewed BSTs where n is the no. of nodes in the tree. This is the same as an array.
However for best case scenario when the tree is completely balanced, the time complexity is O(log(n)). heigh = log(n)

AVL trees are essentially BSTs in the best case

AVL insertion

AVL insertion is done the same way as in BST.
However after insertion the tree may become unbalanced in which case we need to rebalance it.
We need to perform a rotation to rebalance.

We will do a case by case analysis of AVL insertion

terms we will be using while rebalancing: 

Node U - an unbalanced node
Node C - child node of node U
Node G - grandchild node of node U

We will perform the rotations on the subtree with node U being the root node.
There are two types of rotations, left and right.

Insertion cases:

Left-Left: Node C is the left-child of Node U, and Node G is left-child of Node C

Left-Right: Node C is the left-child of Node U, and Node G is right-child of Node C

Right-Right: Node C is the right-child of Node U, and Node G is right-child

Right-Left: Node C is the right-child of Node U, and Node G is the left-child of Node C

DELETION IN AVL TREES

Algorithm for Deletion
1. Delete the given node
2. Traverse Upwards
3. Rebalance the Tree


Red-Black Trees

Red-Black trees are another type of self-balancing BST, but with some additions:
the nodes in Red-Black Trees are colored either red or black.
colored nodes help with rebalancing the tree after insertions or deletions

Properties of Red-Black Trees:
	Every node is either red or black
	The root node is always colored black
	Two Red nodes cannot be adjacent i.e no red parent can have a red child and vice-versa
	Each path from a root to null contains the same number of Black colored nodes
	The color of null nodes is considered black

	Balancing the Red-Black tree doesn't result in a tree being perfectly balanced but it is good enough
	to make the time complexity of basic operations like searching, deleting and insertion to be around O(log(N))

	AVL vs Red-Black

	Although AVL Trees are technically more 'balanced' than Red-Black Trees,
	AVL Trees take more rotations during insertion and deletion operations than Red-Black Trees.
	So, if you have search-intensive applications where insertion and deletion are not that frequent you should use AVL Trees
	Otherwise use Red-Black Trees.

	// Have skipped AVL insetion and deletion

	2-3 Tree

	A 2-3 Tree is another form of search tree but is very different from Binary Search Tree.
	Unlike BST, 2-3 Tree is a balanced and ordered search tree that provides an efficient storage mechanism to guarantee fast operations.

	One key feature of a 2-3 Tree is that it remains balanced, no matter how many insertions or deletions you perform.
	The leaf nodes are always present on the same level and are quite small in number.


I HAVE SKIPPED EVERYTHING UPTO BST

//Problems on BST
// Challenge 1
// Find the minimum Value in a BST
function findMin(rootNode){
	let smallest;
	while(rootNode !== null){
		smallest = rootNode.val;
		rootNode = rootNode.leftChild;
	}
	return smallest;
}

// Challenge 2
// Find k-th maximum value in a BST
function findKthMax(rootNode,k){
	let stack = [];
	function dfs(node){
		if(node === null)
			return
		dfs(node.leftChild);
		stack.push(node.val);
		dfs(node.rightChild)
	}
	dfs(rootNode);
	return stack[stack.length-k];
}

red red red red red red red red red
// Educative's reverseInorder traversal

function findKthMax(rootNode, k){
	counter = 0;
	return reverseInorder(rootNode, k).val;
}
function reverseInOrder(rootNode, k) {
	if (rootNode) {
		var rightChild = reverseInOrder(rootNode.rightChild, k)

		if (rightChild) {
			if (counter == k) {
				return rightChild;
			}

		} else {
			counter++;
			if (k == counter) {
				return rootNode;
			}
			return reverseInOrder(rootNode.leftChild, k)
		}

	}
}

/*Challenge 3
Find Ancestors of a Given Node in a BST
*/
function findAncestors(rootNode, k){
	if(rootNode.val === k)
		return null
	let result = [];
	let head = rootNode;
	while(head !== null){
		if(k > head.val){
			result.unshift(head.val);
			head = head.rightChild;
		}
		else if(k < head.val){
			result.unshift(head.val);
			head = head.leftChild;
		}
		else
			return result;
	}
	return null;
}

//recursive solution

function findAncestors(rootNode, k){
	let result = [];
	recfindAncestors(rootNode, k, result);
	return result;
}

function findAncestors(rootNode,k,result){
	if(rootNode == null)
		return false;
	else if(rootNode.val == k)
		return true;
	else if((recfindAncestors(rootNode.leftChild, k, result)) || recfindAncestors(rootNode.rightChild, k , result)){
		result.push(rootNode.val)
		return true;
	}
	return false;
}

/*Challenge 4
Find the height of a BST
*/

function findHeight(rootNode){
	let maxHeight = 0;
	function dfs(node, height){
		if(node == null){
			maxHeight = Math.max(height, maxHeight);
			return
		}
		dfs(node.leftChild, height+1)
		dfs(node.rightChild, height+1);
	}
	dfs(rootNode, -1)
	return maxHeight;
}

/*Challenge 5
Find nodes at K distance
*/
//Iterative
function findKNodes(rootNode, k) {
   let queue = [rootNode];
    while(queue.length !== 0){
    	count = queue.length;
    	if(k === 0){
    		arr = [];
    		while(count > 0){
    			temp = queue.shift();
    			arr.push(temp.val);
    			count --;
    		}
    		return arr;
    	}
    	else{
	    	while(count > 0){
	    		temp = queue.shift();
	    		if(temp.leftChild)
	    			queue.push(temp.leftChild);
	    		if(temp.rightChild)
	    			queue.push(temp.rightChild);
	    		count--;
	    	}
	    	k--;
    	}
    }
}

//recursive
function findKNodes(rootNode, k){
	let result = [];

	function recursive(node, l){
		if(l === k){
			result.push(node.val);
			return;
		}
		if(node.leftChild){
			recursive(node.leftChild, l+1)
		}
		if(node.rightChild)
			recursive(node.rightChild, l+1)
	}
	recursive(rootNode, 0);
	return result;
}