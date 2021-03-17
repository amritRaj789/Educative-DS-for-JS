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