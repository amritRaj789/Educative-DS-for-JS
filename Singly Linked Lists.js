class Node {
	constructor(data){
		this.data = data;
		this.nextElement = null;
	}
}

class LinkedList {
	constructor(){
		// head will be at the top of the list
		this.head = null;
	}

	isEmpty(){
		return(this.head == null);
	}

	insertAtHead(value){
		let newNode = new Node(value);
		newNode.nextElement = this.head;
		this.head = newNode;
		return this;
	}

	insertAtTail(value){
		if(this.head == null)
			return this.insertAtHead(value);
		let newNode = new Node(value);
		let node = this.head;
		while(node.nextElement){
			node = node.nextElement;
		}
		node.nextElement = newNode;
		return this;
	}

	insert(value, index){
		if(index === 0)
			return insertAtHead(value);
		let i = 0;
		let currentNode = this.head;
		while(i < index-1){
			currentNode = currentNode.nextElement;
			i++;
		}
		let temp = currentNode.nextElement;
		let newNode = new Node(value);
		newNode.nextElement = temp;
		currentNode.nextElement = newNode;
		return this;
	}

	search(value){
		let currentNode = this.head;
		while(currentNode){
			if(currentNode.data === value)
				return true;
			currentNode = currentNode.nextElement;
		}
		return false;
	}

	deleteAtHead(){
		if(this.isEmpty())
			return this;
		let node = this.head.nextElement;
		this.head = node;
		return this;
	}

	deleteByValue(value){
		if(this.head.data == value){
			this.head = this.head.nextElement;
			return true;
		}
		let currentNode = this.head;
		while(currentNode.nextElement){
			if(currentNode.nextElement.data === value){
				currentNode.nextElement = currentNode.nextElement.nextElement;
				return true;
			}
			currentNode = currentNode.nextElement;
		}
		return false;
	}
	reverse(){
		let node = this.head;
		if(node.nextElement === null)
			return this;
		let prevNode = null;
		let currentNode = this.head;
		while(currentNode){
			let temp = currentNode.nextElement;
			currentNode.nextElement = prevNode;
			prevNode = currentNode;
			currentNode = temp;
		}
		this.head = prevNode;
		return this;
	}

	detectLoop(){
		let fast = this.head;
		let slow = this.head;
		while(true){
			fast = fast.nextElement.nextElement;
			slow = slow.nextElement;
			if(fast === slow)
				return true;
			else if(fast === null || fast.nextElement === null)
				return false;
		}
	}
	findMid(){
		let fast = this.head.nextElement;
		let slow = this.head;
		while(fast !== null && fast.nextElement !== null){
			fast = fast.nextElement.nextElement;
			slow = slow.nextElement;
		}
		return slow;
	}
	// It is important to note here that there will be a minro change in the code depending on the definition of middle in case of even nodes.
	// The above code is correct if middle = length/2 + 1 (in case of even number of nodes)
	// The below code is suitable if middle is defined as the length/2 element (in case of even number of nodes)
	findMid(){
		let fast = this.head;
		let slow = this.head;
		while(fast !== null && fast.nextElement !== null){
			fast = fast.nextElement.nextElement;
			slow = slow.nextElement;
		}
		return slow;
	}

	removeDuplicates(){
		let hash = {};
		let node = this.head.nextElement;
		let prevNode = this.head;
		hash[prevNode.data] = 1;
		while(node){
			if(!(node.data in hash)){
				hash[node.data] = 1;
				prevNode = node;
			}
			else{
				prevNode.nextElement = node.nextElement;
			}
			node = node.nextElement;
		}
		return this;
	}

	intersection(list1, list2){
		let head1 = list1.head;
		let head2 = list2.head;
		let hash = {};
		let result = new LinkedList();
		while(head1){
			if(!(head1.data in hash))
				hash[head1.data] = 0;
			hash[head1.data]++;
			head1 = head1.nextElement;
		}
		while(head2){
			if(head2.data in hash)
				result.insertAtTail(head2.data);
			head2 = head2.nextElement;
		}
		result.removeDuplicates();
		return result;
	}

	

	union(list1, list2){
		list1.removeDuplicates();
		let head1 = list1.head;
		let head2 = list2.head;
		let hash = {};
		while(head1){
			hash[head1.data] = 1;
			head1 = head1.nextElement;
		}
		while(head2){
			if(!(head2.data in hash)){
				hash[head2.data] = 1;
				list1.insertAtTail(head2.data);
			}
			head2 = head2.nextElement;
		}
		return list1;
	}

	findNth (list, n){
		let node1 = list.head;
		let node2 = list.head;
		while(n > 0){
			node2 = node2.nextElement;
			n--;
		}
		while(node2){
			node1 = node1.nextElement;
			node2 = node2.nextElement;
		} 
		return node1;
	}
}

// Doubly Linked Lists (DLL)

class Node {
	constructor(value){
		this.data = value;
		this.previousElement = null;
		this.nextElement = null;
	}
}

class LinkedList {
	constructor(){
		this.head = null;
		this.tail = null;
	}

	deleteAtTail (){
		if(this.isEmpty()){
			return this;
		}
		let lastElement = this.tail;
		this.tail = lastElement.previousElement;
		if(this.tail == null){
			this.head = null;
			return this;
		}
		this.tail.nextElement = null;
		return this;
	}
}