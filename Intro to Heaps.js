/*Heaps are advanced data structures that are useful in applications
where you want to sort and implement priority queues. They are regular
binary trees with two special properties.*/

//-> Heaps must be Complete Binary trees

//-> The nodes must be ordered according to the Heap Order Property

	//The Heap Order property is different for the 2 heap structures that we are going to study
		->Min Heap 	(Based on Min Heap property)
		->Max Heap  (Based on Max Heap property)

MAX HEAP PROPERTY
	/*All the parent node keys must be greater than or equal to their child node keys in max-heaps.
	So the root node will always contain the largest element in the heap.
	If node A has a child node B, then key(A) >= key(B)*/

MIN HEAP PROPERTY
	/*All the parent node keys are less than or equal to their child node keys. So, the root node,
	will always contain the smallest element present in the Heap.
	If node A has a child node B, key(A) <= key(B)*/


Where are heaps used?

/*The primary purpose of heaps is to return the smallest or largest element.
This is because the time complexity of getting the minimum/maximum value from a min/max heap is O(1).
Heaps are also used to design Priority Queues.
Some of the famous algorithms implemented using heaps are Prim's Algorithm,
Djikstra's Algorithm and the famous Heap Sort algorithm.
*/

Heaps can be implemented using arrays. The parent nodes lie in the first half of the array and the leaf nodes in the remainig half.
parent node index <= floor(n-1/2). It is similar to level by level traversal of the binary tree.

Heaps are sometimes called Binary Heaps because they are binary trees. Also, the Heap data structure is not the same as heap memory.
Elements of heaps are not sorted at all.


MAX HEAP

the __percolateUp() function is meant to restore the heap property going up from a node to the root.
the __maxHeapify() function restores the heap property starting from a given node down to the leaves.




class maxHeap {
	constructor(){
		this.heap = [];
		this.elements = 0;
	}

	getMax(){
		if(this.elements > 0)
			return this.heap[0]
		return null
	}

	insert(value){
		if(this.elements < this.heap.length){
			this.heap[this.elements] = value;
			this.elements++;
		}
		else{
			this.heap.push(value);
			this.elements++;
		}
		this.bubbleUp(this.elements-1);
		//console.log("inserted successfully");
	}

	removeMax(){
		if(this.elements === 1){
			max = this.heap[0];
			this.elements--;
			return max
		}
		else if(this.elements === 0)
			return null
		let max = this.heap[0];
		this.heap[0] = this.heap[this.elements-1];
		this.elements--;
		this.maxHeapify(0);
		return max;
	}

	maxHeapify(index){
		let left = index*2 + 1;
		let right = index*2 + 2;
		let largest = index;
		if((left < this.elements) && (this.heap[largest] < this.heap[left]))
			largest = left;
		if((right < this.elements) && (this.heap[largest] < this.heap[right]))
			largest = right;
		if(largest !== index){
			[this.heap[largest], this.heap[index]] = [this.heap[index], this.heap[largest]];
			this.maxHeapify(largest)
		}
	}

	bubbleUp(index){
		if(index <= 0)
			return
		let parent = Math.floor((index-1)/2);
		if(this.heap[parent] < this.heap[index]){
			[this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
			this.bubbleUp(parent);
		}
		else
			return
	}
	buildHeap(arr){
		this.heap = arr;
		this.elements = this.heap.length;
		for(let i = this.heap.length - 1; i >= 0; i--){
			this.maxHeapify(i);
		}
	}
	// The worst time complexity of buildHeap is O(n)
}

let heap = new maxHeap()
let arr = [3,5,13,53,23,64,2,26,22,67];
heap.buildHeap(arr)
console.log(heap.getMax())
heap.removeMax()
console.log(heap.getMax())

/*let heap = new maxHeap()
heap.insert(12)
heap.insert(10)
heap.insert(-10)
heap.insert(100)
console.log(heap.getMax())
heap.removeMax();
console.log(heap.getMax())
*/

// if we want to delete the maxHeap item, we can simply replace it with the endmost leaf node.. this.heap[0] = this.heap[elements-1]. and then maxHeapify() it.
// if we want to insert an item, we can add to the heap. But first we gotta check if out heap already has space. if elements < heap.length, then we can simply do this.heap[elements], and then bubble it up
// given a node's index, it's parent's index is Math.floor(index-1/2)
// given a parent node index, it's left child will be 2*index + 1, it's right child will be 2*index + 2




// Implementing Min Heap Class

class minHeap {
	constructor(){
		this.heap = [];
		this.elements = 0;
	}

	getMin(){
		if(this.elements === 0)
			return null
		return this.heap[0];
	}

	insert(value){
		if(this.elements < this.heap.length)
			this.heap[this.elements] = value;
		else
			this.heap.push(value);
		this.elements++;
		this.bubbleUp(this.elements-1);
	}

	bubbleUp(index){
		if(index <= 0)
			return
		let parent = Math.floor((index-1)/2);
		if(this.heap[index] < this.heap[parent]){
			[this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
			this.bubbleUp(parent);
		}
	}

	removeMin(){
		if(this.elements == 0)
			return null;
		if(this.elements === 1){
			this.elements--;
			return this.heap[0];
		}
		let min = this.heap[0];
		this.heap[0] = this.heap[this.elements-1];
		this.elements--;
		this.minHeapify(0);
		return min;
	}

	minHeapify(index){
		let left = index*2 + 1;
		let right = index*2 + 2;
		let smallest = index;
		if((left < this.elements) && (this.heap[left] < this.heap[smallest]))
			smallest = left;
		if((right < this.elements) && (this.heap[right] < this.heap[smallest]))
			smallest = right;
		if(index !== smallest){
			[this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
			this.minHeapify(smallest);
		}
	}

	buildHeap(arr){
		this.heap = arr;
		this.elements = this.heap.length;
		for(let i = this.elements-1; i >= 0; i--){
			this.minHeapify(i);
		}
	}
}
/*var heap = new minHeap()
heap.insert(12)
heap.insert(10)
heap.insert(-10)
heap.insert(100)

console.log(heap.getMin())

var newheap = new minHeap()
var arr =  [6,9,3,4,13,22,1,30,17]
newheap.buildHeap(arr)
console.log(newheap.getMin())

newheap.removeMin()

console.log(newheap.getMin())*/

/*Challenge 1:
Convert Max-Heap to Min-Heap
Given a max heap array, write a function to convert it into a min heap array and return the array
*/
function convertMax(maxHeap) {
	let heap = [...maxHeap];
	let elements = maxHeap.length;
	function minHeapify(index){
		let left = 2 * index + 1;
		let right = 2 * index + 2;
		let smallest = index;
		if((left < elements) && (heap[left] < heap[smallest]))
			smallest = left;
		if((right < elements) && (heap[right] < heap[smallest]))
			smallest = right;
		if(index !== smallest){
			[heap[smallest], heap[index]] = [heap[index], heap[smallest]];
			minHeapify(smallest);
		}
	}

	// we have to only call minHeapify() for all possibe parent nodes, so we are starting from half of the array and not the end most
	for(let i = Math.floor((elements-1)/2); i >= 0; i--){
		minHeapify(i);
	}
	return heap;
}
 

Challenge 2:
Find K smallest Elements in an Array


function findKSmallest(arr,k){ 
	 let heap = new minHeap();
	 heap.buildHeap(arr);
	 let result = [];
	 for(let i = 1; i <= k; i++){
	 	result.push(heap.getMin());
	 	heap.removeMin();
	 }
	 return result;
}

Challenge 3:
Find K largest Elements in an Array

function findKLargest (lst, k){
	let heap = new maxHeap();
	heap.buildHeap(lst);
	let result = [];
	if(k > lst.length)
		k = lst.length
	for(let i = 1; i <= k; i++){
		result.push(heap.removeMax());
	}
	return result;
}