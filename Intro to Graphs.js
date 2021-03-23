/*What is a Graph?
A Graph is a set of nodes that are connected to each other in the form of a network.

2 basic components of a Graph are: Vertex and Edge

Vertex : A vertex is an essential part of a graph. A collection of vertices forms a graph. In that sense, vertices are similar to linked list nodes.
Edge : An edge is a link between two vertices. It can be uni-directional or bi-directional, depending on your graph. An edge can also have a cost associated with it.

Degree of a Vertex: The total number of edges connected to a vertex. There are two types of degrees:

In-Degree: The total number of incoming edges connected to a vertex.

Out-Degree: The total number of outgoing edges connected to a vertex.

Parallel Edges: Two undirected edges are parallel​ if they have the same end vertices. Two directed edges are parallel if they have the same origin and destination.

Self Loop: This occurs when an edge starts and ends on the same vertex.

Adjacency: Two vertices are said to be adjacent if there is an edge connecting them directly.

2 common types of graphs are Undirected, Directed
In Undirected graph, edges are not directed ,can go either way. In Directed, there is only one way you can go across an edge

Ways to Represent a Graph: 
Adjacency Matrix, Adjacency List


Adjacency Matrix : The Adjacency matrix is a two-dimensional matrix where cell can contain a 0 or a 1. The row and column headings represent the vertices.
					If a cell contains 1, there exists an edge between the corresponding vertices e.g., Matrix[0][1] = 1 shows that an edge exists between vertex 0 and 1.

Adjacency List : An array of linked list is used to store all the edges in the graph. The size of the array is equal to the number of vertices.
					Each index in this array represents a specific vertex in the graph. The entry at index i of the array contains a linked list containing the vertices that are adjacent to vertex i.*/




// Implementing a Graph class
// Graph class contains  of 2 data memeber: the total number of vertices in the graph, an array of linked lists to store adjacent graphs

class LinkedList {
  constructor() {
    this.head = null;
  }

  //Insertion At Head  
  insertAtHead(newData) {
    let tempNode = new Node(newData);
    tempNode.nextElement = this.head;
    this.head = tempNode;
    return this; //returning the updated list
  }

  isEmpty() {
    return (this.head == null);
  }

  //function to print the linked list
  printList() {
    if (this.isEmpty()) {
      console.log("Empty List");
      return false;
    } else {
      let temp = this.head;
      while (temp != null) {
        process.stdout.write(String(temp.data));
        process.stdout.write(" -> ");
        temp = temp.nextElement;
      }
      console.log("null");
      return true;
    }
  }

  getHead() {
    return this.head;
  }
  setHead(newHead) {
    this.head = newHead;
    return this;
  }
  getListStr() {
    if (this.isEmpty()) {
      console.log("Empty List");
      return "null";
    } else {
      let st = "";
      let temp = this.head
      while (temp != null) {
        st += String(temp.data);
        st += " -> ";
        temp = temp.nextElement;
      }
      st += "null";
      return st;
    }
  }
  insertAtTail(newData) {
    //Creating a new Node with data as newData
    let node = new Node(newData);

    //check for case when list is empty
    if (this.isEmpty()) {
      //Needs to Insert the new node at Head
      this.head = node;
      return this;
    }

    //Start from head
    let currentNode = this.head;

    //Iterate to the last element
    while (currentNode.nextElement != null) {
      currentNode = currentNode.nextElement;
    }

    //Make new node the nextElement of last node of list
    currentNode.nextElement = node;
    return this;
  }
  search(value) {
    //Start from the first element
    let currentNode = this.head;

    //Traverse the list until you find the value or reach the end
    while (currentNode != null) {
      if (currentNode.data == value) {
        return true; //value found
      }
      currentNode = currentNode.nextElement
    }
    return false; //value not found
  }
  deleteAtHead() {
    //if list is empty, do nothing
    if (this.isEmpty()) {
      return this;
    }
    //Get the head and first element of the list
    let firstElement = this.head;

    //If list is not empty, link head to the nextElement of firstElement
    this.head = firstElement.nextElement;

    return this;
  }
  deleteVal(value) {
    let deleted = null; //True or False
    //Write code here

    //if list is empty return false
    if (this.isEmpty()) {
      return false;
    }

    //else get pointer to head
    let currentNode = this.head;
    // if first node's is the node to be deleted, delete it and return true
    if (currentNode.data == value) {
      this.head = currentNode.nextElement;
      return true;
    }

    // else traverse the list
    while (currentNode.nextElement != null) {
      // if a node whose next node has the value as data, is found, delete it from the list and return true
      if (currentNode.nextElement.data == value) {
        currentNode.nextElement = currentNode.nextElement.nextElement;
        return true;
      }
      currentNode = currentNode.nextElement;
    }
    //else node was not found, return false
    deleted = false;
    return deleted;
  }
  deleteAtTail() {
    // check for the case when linked list is empty
    if (this.isEmpty()) {
      return this;
    }
    //if linked list is not empty, get the pointer to first node
    let firstNode = this.head;
    //check for the corner case when linked list has only one element
    if (firstNode.nextElement == null) {
      this.deleteAtHead();
      return this;
    }
    //otherwise traverse to reach second last node
    while (firstNode.nextElement.nextElement != null) {
      firstNode = firstNode.nextElement;
    }
    //since you have reached second last node, just update its nextElement pointer to point at null, skipping the last node
    firstNode.nextElement = null;
    return this;
  }
}

class Graph {
	constructor(vertices){
		this.vertices = vertices;
		this.list = [];
		for(let i = 0; i < vertices.length; i++){
			let temp = new LinkedList();
			this.list.push(temp);
		}
	}

	addEdge(source, destination){
		if(source < this.vertices && destination < this.vertices)
			this.list[source].insertAtHead(destination);
	}

	printGraph() {
		console.log(">>Adjacency List of Directed Graph<<");
		let i; 
		for(i = 0; i < this.list.length; i++){
			process.stdout.write("|" + String(i) + "| => ");
			let temp = this.list[i].getHead();
			while(temp !== null){
				process.stdout.write("[" + String(temp.data) + "] -> ");
				temp = temp.nextElement;
			}
			console.log("null");
		}
	}
}

// Complexities of Graph Operation
Operation       Adjacency List      Adjacency Matrix

Add Vertex      O(1)              O(V^2)
Remove Vertex   O(V+E)            O(V^2)
Add Edge        O(1)              O(1)
Remove Edge     O(E)              O(1)

// So from the above we can see that each method of graph representation has its own benefits
// If your model frequently manipulates vertices, the adjacency list is a better choice
// If you are primarily dealing with edges, the adjacency matrix is the more efficient approach

Bipartite Graph

/*

The Bipartite graph is a special member of the graph family. The vertices of this graph are divided 
into two disjoint parts in a way that no 2 vertices in the same part are adjacent to each other.

The bipartite graph is a type of k-partite graph where k is 2.
In a 5-partite graph, we would have 5 disjointed sets, and members of a set would not be adjacent to each other.

e.g : red -->green -->red -->green

Interesting observation: All acyclic graphs can be bi-partite, but in the case of cyclic graphs, they must have an even no. of vertices.

Some popular types of bipartite graphs are: 
Star Graph, Acyclic Graph, Path Graph
*/

// Graph Traversal Algorithms

/*

There are 2 basic techniques of Graph traversal: 
BFS : Breadth First Search
DFS : Depth First Search

Since any traversal needs a starting point, but a graph doesn't have a linear structure like arrays or stacks. 
So how do we give a graph traversal a better sense of direction.

This is where the concept of levels in graphs comes in.
Take any vertex as the starting point; this is the lowest level in your search.
The next level consists of all the vertices adjacent to your vertex.
A level higher would be the vertices adjacent to these nodes.

*/

// B F S

/*
The BFS algorithm earns its name because it grows breadth-wise. All the nodes at a cetain level are traversed before moving on to the next level.
The level-wise expansion ensures that for any starting vertex, you can reach all others one level at a time
Take care, the BFS traversal order may change depending if its a directed or undirected graph
*/

// D F S

/*
The DFS algorithm is the opposite of BFS in the sense that it grows depth-wise.

Starting from any node, we keep moving to an adjacent node until we reach the farthest level. Then we move back to the starting point and pick another adjacent node.
Once again we probe to the farthest level and move back. This process continues until all nodes are visited.
*/

// Challenge 1
// Implementing BFS in JS

"use strict";
const LinkedList = require('./LinkedList.js');
const Node = require('./Node.js');
const Queue = require('./Queue.js');
const Graph = require('./Graph.js');

//Create Queue => let queue = new Queue(5), where 5 is size of queue
//Functions of Queue => queue.enqueue(int), queue.dequeue(), queue.isEmpty() 
//Breadth First Traversal of Graph g from source vertex 
function bfsTraversal (g){
  if(g.vertices < 1)
    return null;
  let object = {result: ""};
  let visited = new Array(g.vertices).fill(false);
  for(let i = 0; i < g.vertices; i++){
    if(!visited[i])
    bfsTraversalHelper(g, i, object, visited);
  }
  return object.result;
}

function bfsTraversalHelper(g, source, obj, visited){
  let queue = new Queue();
  queue.enqueue(source);
  visited[source] = true;
  while(!queue.isEmpty()){
    let num = queue.dequeue();
    obj.result = obj.result + String(num);
    let temp = g.list[num].getHead();
    while(temp){
      if(!visited[temp.data]){
        queue.enqueue(temp.data);
        visited[temp.data] = true;
      }
      temp = temp.nextElement;
    }
  }
}


// Implementing DFS using Stacks
// My Method
function dfsTraversal(g) {
  if(g.vertices < 1)
    return null;
  let obj = {result: ""};
  let visited = new Array(g.vertices).fill(false);
  let stack = new Stack();

  for(let i = 0; i < g.vertices; i++){
    if(!visited[i]){
      obj.result += String(i);
      visited[i] = true;
      travel(g, i, obj, visited);
    }
  }
  return obj.result;
  function travel(g, source, obj, visited){
    let node = g.list[source].getHead();
    while(node !== null){
      if(visited[node.data]){
        node = node.nextElement;
      }
      else{
        visited[node.data] = true;
        stack.push(source);
        obj.result += String(node.data);
        travel(g, node.data, obj, visited);
      }
    }
    if(!stack.isEmpty())
      travel(g, stack.pop(), obj, visited);
    return;
  }

}

// Educative's method
function dfsTraversal_helper (g, source, visited, obj) {
  //Create Stack(Implemented in previous lesson) for Depth First Traversal and Push source in it
  let stack = new Stack(g.vertices);
  stack.push(source);
  visited[source] = true;
  //Traverse while stack is not empty
  while (stack.isEmpty() == false) {
    //Pop a vertex/node from stack and add it to the result
    let current_node = stack.pop();
    obj.result += String(current_node);
    //Get adjacent vertices to the current_node from the array,
    //and if they are not already visited then push them in the stack
    let temp = g.list[current_node].getHead();
    while (temp != null) {
      if (visited[temp.data] == false) {
        stack.push(temp.data);
         visited[temp.data] = true;
      }
      temp = temp.nextElement;
    } 
  }
}
function dfsTraversal(g)
{
  if (g.vertices < 1){
    return null;
  }
  
  var obj = {result: ''}

  //An array to hold the history of visited nodes
  //Make a node visited whenever you push it into stack
  var visited = [];
  for (var x = 0; x < g.vertices; x++) {
    visited.push(false);
  }
    
  for (var i = 0; i < g.vertices; i++) {
    if (!visited[i])
      dfsTraversal_helper(g, i, visited, obj);
  }

  return obj.result;
}




// Detect Cycle in Graph

//My solution
function detectCycle(g){
  let object = {result: false};
  let visited = new Array(g.vertices).fill(false);
  let i = 0;
  while(i < g.vertices && object.result === false){
    if(!visited[i]){
      visited[i] = true;
      helper(g, i, visited, object);
    }
    i++;
  }
  return object.result;
}

function helper (g, source, visited, object){
  let stack = new Stack();
  stack.push(source);

  while(!stack.isEmpty()){
    let temp = stack.pop();
    let node = g.list[temp].getHead();
    while(node !== null){
      if(visited[node.data]){
        object.result = true;
        return
      }
      else{
        stack.push(node.data);
        visited[node.data] = true;
      }
      node = node.nextElement;
    }
  }
}

//Mother vertex in a Graph

//My solution
function findMotherVertex (g){
  let found = {value: -1};
  for(let i = 0; i < g.vertices; i++){
    let count = 0;
    let visited = new Array(g.vertices).fill(false);
    visited[i] = true;
    let stack = new Stack();
    stack.push(i);
    while(!stack.isEmpty()){
      let temp = stack.pop();
      count++;
      let node = g.list[temp].getHead();
      while(node !== null){
        if(!visited[node.data]){
          visited[node.data] = true;
          stack.push(node.data);
        }
        node = node.nextElement;
      }
    }
    if(count === g.vertices){
      found.value = i;
      break;
    }
  }
  return found.value;
}

//Note : This is actually the brute-force solution. We could have done it using BFS as well
// This takes O(V(V+E))

// Efficient Solution O(V+E)

function findMotherVertex(g){
  let visited = new Array(g.vertices).fill(false);
  let lastV ;

  for(let i = 0; i < g.vertices; i++){
    if(!visited[i]){
      dfs(g, i, visited);
      lastV = i;
    }
  }
  for(let i = 0; i < g.vertices; i++){
    visited[i] = false;
  }
  dfs(g, lastV, visited);
  for(let i = 0; i < g.vertices; i++){
    if(visited[i] === false)
      return -1;
  }
  return lastV;
}


function dfs (g, i, visited){
  let stack = new Stack();
  stack.push(i);
  visited[i] = true;

  while(!stack.isEmpty()){
    let temp = stack.pop();
    let node = g.list[temp].getHead();
    while(node !== null){
      if(!visited[node.data]){
        visited[node.data] = true;
        stack.push(node.data);
      }
      node = node.nextElement;
    }
  }
}

// Count the number of edges in an undirected graph

function count(g){
  let count;
  for(let i = 0; i < g.vertices; i++){
    let node = g.list[i].getHead();
    while(node !== null){
      count++;
      node = node.nextElement;
    }
  }
  return count/2;
}

// Check if a path exists between the given source and destination
function checkPath (g, source, destination){
  if(source === destination)
    return true;
  let visited = new Array(g.vertices).fill(false);
  visited[source] = true;
  let stack = new Stack();
  let found = false;
  stack.push(source);
  while(!stack.isEmpty()){
    let temp = stack.pop();
    let node = g.list[temp].getHead();
    while(node !== null){
      if(!visited[node.data]){
        if(node.data == destination){
          found = true;
          break;
        }
        stack.push(node.data);
        visited[node.data] = true;
      }
      node = node.nextElement;
    }
  }
  return found;

}


// Check if an undirected Graph is Tree or not

function isTree(g) {
  let visited = new Array(g.vertices).fill(false);
  let stack = [];
  visited[0] = true;
  let node = g.list[0].getHead();
  while(node !== null){
    stack.push(node.data);
    visited[node.data] = true;
    node = node.nextElement;
  }
  while(stack.length){
    let temp = stack.pop();
    let node = g.list[temp].getHead();
    while(node.nextElement !== null){
      if(visited[node.data]){
        return false;
      }
      else{
        visited[node.data] = true;
        stack.push(node.data);
      }
      node = node.nextElement;
    }
  }
  for(let i = 0; i < g.vertices; i++){
    if(visited[i] === false)
      return false;
  }
  return true;
}

