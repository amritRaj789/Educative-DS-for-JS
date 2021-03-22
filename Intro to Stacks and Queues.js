/*What is a Stack?
LIFO (Last in First Out) ordering. Imagine a stack of plates

Famous Algorithms that use Stack functionality are: DFS and Expression Evaluation Algorithm

To backtrack the previous task/state, for example in recursive code

To store a partially completed task, for example. when you are exploring two different paths on a Graph 
from a point while figuring out the smallest path to the target

Way how Stacks work

push(element) 		Inserts an element at the top
pop()				Removes an element from the top and returns it
isEmpty() 			Returns a boolean 1 if the stack is empty 
getTop()			Returns the element added most recently*/


// Stacks can be implemented using Arrays or Linked Lists. Each implementation has its own advantages and Disadvantages.

//Here we will implement it using an Arrays

class Stack {
	constructor() {
		this.items = [];
		this.top = null;
	}

	getTop(){
		return this.top;
	}

	isEmpty(){
		return this.items.length==0;
	}

	size(){
		return this.items.length;
	}

	push(element){
		this.items.push(element);
		this.top = element;
	}

	pop(){
		if(this.isEmpty())
			return null;
		if(this.items.length == 1)
			this.top = null;
		else
			this.top = this.items[this.items.length-2];
		return this.items.pop();
	}
}

let myStack = new Stack ();
console.log("you have successfully created a Stack");



// QUEUES
/*FIFO (First In First Out)
Widely used in :- 
	searching and sorting algorithms (such as BFS)
	Most operating systems also perform operations based on a Priority Queue that allows OSes to switch between appropriate processes
	They are also used to store packets on routers in a certain order when a network is congested.
	Implementing a cache

*/

// We generally use Queues when :
	// We want to prioritize something over another
	// A resource is shared between multiple devices


// Types of queues:
/*	Linear Queues
	Circular Queues
		Generally used in Simulation of Objects, Event Handling(do something when a particular event occurs)
	Priority Queues
		In this, all elements have a priority associated with them and are sorted such that the most prioritized object appears at the front, and the least at the end
		widely used in most OS to determine which programs should be given more priority
*/
//We will do Linear Queues here

class Queue {
	constructor() {
		this.items = [];
	}

	isEmpty(){
		return this.items.length==0;
	}

	getFront(){
		if(this.isEmpty())
			return null
		return this.items[0];
	}

	size(){
		return this.items.length;
	}

	enqueue(element){
		this.items.push(element);
	}

	dequeue(){
		if(this.isEmpty())
			return null
		return this.items.shift();
	}
}

let myQueue = new Queue();
console.log("You have successfully created a Queue");

//Challenge 1 : Generate Binary Numbers from 1 to n using Queue
#red#red#red#red
function findBin (number){
	let result = [];
	let myQueue = new Queue();
	let s1, s2;
	myQueue.enqueue("1");
	for(let i = 0; i < number; i++){
		result.push(myQueue.dequeue());
		s1 = result[i] + "0";
		s2 = result[i] + "1";

		myQueue.enqueue(s1);
		myQueue.enqueue(s2);
	}

	return result;
}
// Now this is a really cool method


// Challenge 2: Implement 2 stacks using One Array

class twoStacks {
	constructor(s) {
		this.items = [];
		this.size1 = 0;
		this.size2 = 0;
	}

	push1(value){
		if(this.items.length == s)
			return -1
		this.items.unshift(value);
		this.size1++;
	}

	push2(value){
		if(this.items.length == s)
			return -1
		this.items.push(value);
		this.size2++;
	}

	pop1(){
		if(this.size1 == 0)
			return null;
		this.size1--;
		return this.items.shift();
	}

	pop2(){
		if(this.size2 == 0)
			return null;
		this.size2--;
		return this.items.pop();
	}
}

// The problem with this is, we are resizing the array and array.shift() or array.unshift() operations can take 0(n)
// To optimize this, initialize the array and keep track of indices

class twoStacks {
	constructor(s){
		this.arr = new Array(s);
		this.top1 = -1;
		this.top2 = s;
		this.size = s;
	}

	push1(value){
		if(this.top1 < this.top2 -1){
			this.top1++;
			this.arr[this.top1] = value;
		}
		else{
			return -1;
		}
	}

	push2(value){
		if(this.top1 < this.top2 -1){
			this.top2--;
			this.arr[this.top2] = value;
		}
		else{
			return -1;
		}
	}

	pop1(){
		if(this.top1===-1)
			return -1;
		this.top1--;
		return this.arr[this.top1+1];
	}

	pop2(){
		if(this.top2===this.size)
			return -1;
		this.top2++;
		return this.arr[this.top2-1];
	}
}
//Now in the above case, all operations are constant time

//Challenge 3: Reversing first k elements of Queue

function reverseK(queue, k){
	for(let i = 0; i <= k-1-i; i++){
		[queue.items[i], queue.items[k-1-i]] = [queue.items[k-1-i], queue.items[i]];
	}
	return queue;
}
//But I have kinda cheated in the above code, I should only use the methods of queue class and not manipulate this.items[] directly


function reverseK(queue, k){
	if(queue.isEmpty())
		return queue;
	let myStack = new Stack();
	while(k > 0){
		myStack.push(queue.dequeue());
		k--;
	}
	while(!myStack.isEmpty()){
		queue.enqueue(myStack.pop())
	}
	for(let i = 0; i < queue.size()-k; i++){
		queue.enqueue(queue.dequeue());
	}
	return queue;
}

// Challenge 4 : Implement a Queue using Stacks

class newQueue {
	constructor(){
		this.item = new Stack();
		this.temp = new Stack();
	}
	enqueue(value){//enqueue is optimized to be O(1)
		this.item.push(value);
		return true;
	}
	dequeue(){//here deqeueu is more expensive (O(n))
		if(this.item.isEmpty())
			return null;
		while(!this.item.isEmpty()){
			this.temp.push(this.item.pop());
		}
		let val = this.temp.pop();
		while(!this.temp.isEmpty()){
			this.item.push(this.temp.pop());
		}
		return val;
	}
}

class newQueue { // Optimizing dequeue to be O(1) this time
	constructor(){
		this.mainStack = new Stack();
		this.tempStack = new Stack();
	}

	enqueue(value){
		while(!(this.mainStack.isEmpty())){
			this.tempStack.push(this.mainStack.pop());
		}
		this.tempStack.push(value);
		while(!this.tempStack.isEmpty()){
			this.mainStack.push(this.tempStack.pop());
		}
		return true;
	}

	dequeue(){
		if(this.mainStack.isEmpty())
			return null;
		return this.mainStack.pop();
	}
}

//Optimizing both enqueue and dequeue this time
// Take care here, this is interesting
class newQueue {
	constructor(){
		this.mainStack = new Stack();//for O(1) enqueue
		this.tempStack = new Stack();
	}

	enqueue(value){
		this.mainStack.push(value);
		return true;
	}

	dequeue(){
		if(this.mainStack.isEmpty() && this.tempStack.isEmpty())
			return null;
		else if(this.tempStack.isEmpty()){
			while(!this.mainStack.isEmpty()){
				this.tempStack.push(this.mainStack.pop());
			}
			return this.tempStack.pop();
		}
		return this.tempStack.pop();
	}
}
/*
Here the transfer of elements between 2 stacks takes place only if tempStack is empty.
Therefore the amortized complexity of the dequeu operation becomes O(n). We use amortized complexity analysis with data structures
that have a state which persists between operations. So, a costly operation will change the state such that it will take a long time
for the worst-case to happen again, which amortizes the cost*/


//Challenge 5 : Sort Values in a Stack

function sortStack(stack){
	let arr = [];
	while(!stack.isEmpty()){
		arr.push(stack.pop());
	}
	arr.sort((a,b) => a-b);
	for(let i = arr.length-1; i >= 0; i--){
		stack.push(arr[i]);
	}
	return stack;
}
// Time complexity : O(2n + nlogn);


//This is really cool and special
function sortStack(stack){
	let tempStack = new Stack();
	let value;
	while(stack.isEmpty() === false){
		value = stack.pop();
		if(value >= tempStack.getTop()){
			tempStack.push(value);
		}
		else{
			while(tempStack.isEmpty() === false){
				stack.push(tempStack.pop());
			}
			tempStack.push(value);
		}
	}

	while(tempStack.isEmpty() == false){
		stack.push(tempStack.pop());
	}
	return stack;
}

function sortStack(stack){
	if(!stack.isEmpty()){
		let value = stack.pop();
		sortStack(stack)
		insert(stack, value)
	}
	return stack
}

function insert(stack, value){
	if(stack.isEmpty() || value < stack.getTop())
		stack.push(value);
	else{
		let temp = stack.pop();
		insert(stack,value)
		stack.push(temp);
	}

}
// I haven't made any effort to understand this recursive code yet


//Challenge 6 : Evaluate Postfix expression using a stack

function evaluatePostfix(exp){
	let stack = new Stack();
	let math = {
		'+' : (x,y) => x+y,
		'-' : (x,y) => x-y,
		'*' : (x,y) => x*y,
		'/' : (x,y) => x/y,
	}
	for(let i = 0; i < exp.length; i++){
		if(isCharNumber(exp[i])){
			stack.push(parseInt(exp[i]));
		}
		else{
			let t1 = stack.pop();
			let t2 = stack.pop();
			stack.push(math[exp[i]](t2, t1));
		}
	}
	function isCharNumber (c){
		return c >= '0' && c <= '9';
	}
	return stack.pop();
}

//Challenge 7 : Next Greater Element using a Stack
#red#red#red#red
function nextGreaterElement(arr){
	let stack = new Stack();
	let result  = [];
	let top, next;

	for(let i = arr.length-1; i >= 0; i--){
		next = arr[i];
		if(!stack.isEmpty()){
			top = stack.getTop();
			while(top <= next){
				if(stack.isEmpty()){
					break;
				}
				stack.pop();
				top = stack.getTop();
			}
		}

		if(!stack.isEmpty())
			result[i] = stack.getTop();
		else
			result[i] = -1;
		stack.push(next);
	}
}

//Challenge 8: Check Balanced Parantheses using Stack

function isBalanced(exp){
	let stack = new Stack();
	let hash = {
		'(' : ')',
		'{' : '}',
		'[' : ']'
	}
	for(let i = 0; i <= exp.length; i++){
		if(exp[i] in hash)
			stack.push(exp[i]);
		else{
			if(hash[stack.pop()] !== exp[i])
				return false
		}
	}
	if(stack.isEmpty())
		return true;
	return false;
}

//Challenge 9: min() to return the minimum value of the stack

class minStack {
	constructor() {
		this.mainStack = new Stack();
		this.minstack = new Stack();
		this.temp = new Stack();
		this.minimum = null;
	}
	pop(){
		if(this.mainStack.isEmpty())
			return null;
		let temp = this.mainStack.pop();
		while(this.minstack.getTop() !== temp){
			this.temp.push(this.minstack.pop());
		}
		this.minstack.pop();
		while(!this.temp.isEmpty()){
			this.minstack.push(this.temp.pop());
		}
		this.minimum = this.minstack.getTop();

		return temp;
	}
	push(value){
		while(this.minstack.getTop() < value && this.minstack.isEmpty() == false){
			this.temp.push(this.minstack.pop())
		}
		this.minstack.push(value);
		while(!this.temp.isEmpty()){
			this.minstack.push(this.temp.pop());
		}
		this.minimum = this.minstack.getTop();
		return this.mainStack.push(value);
	}
	min(){
		return this.minimum;
	}
}

// Educative way of doing it

class minStack {
	constructor(){
		this.mainStack = new Stack()
		this.minStack = new Stack()
	}

	pop(){
		this.minStack.pop();
		return this.mainStack.pop();
	}

	push(value){
		this.mainStack.push(value);
		if(value > this.minStack.getTop() && this.minStack.isEmpty() == false)
			this.minStack.push(this.minStack.getTop())
		else
			this.minStack.push(value)
	}

	min(){
		return this.minStack.getTop();
	}
}
