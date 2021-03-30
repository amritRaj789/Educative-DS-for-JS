// It is a tree-like data structure that proves to be very efficient while solving programming problems related to strings

// This data structure is called a trie and is also known as a Prefix Tree.

// The word true is derived from 'retrieval'. 
// The main purpose of using this structure is to provide fast retrieval.

// Tries are mostly used in dictionary word searches, search engine auto-suggestions, and IP routing

//Properties of a Trie

// -> Tries are similar to graphs as they are a combination of nodes where each node represents a unique alphabet.
// -> Each node can point to null or other children nodes
// -> The size of a trie depends upon the number of alphabets. For example, in English, there are 26 letters so the number of unique nodes cannot exceed 26
// -> The depth of a trie depends on the longest word that it stores.
// -> Another important property of a trie is that it provides the same path for words that
// 	share a common prefix. For example, "there" and "their" have a common prefix "the". Hence
// 	they will share the same path until "e" . After that, the path will split into two branches.
// 	This is the backbone of the trie functionality

// Structure of a Trie

/*The Trie node represents one alphabet, which keeps pointers to its children nodes.
For example, if we want to insert "hello" in the trie, we will need to add 5 TrieNodes, one for
each alphabet. A typical node in a trie consists of three data members.
*/
//char : This stores the character that the node is supposed to contain

//children[]	: An array which consists of pointers to children nodes.
				The size of this array depends on the number of alphabets. Be default all are set to null.

//isEndWord	: A flag to indicate the end of a word. It is set to false by default and is only updated when words end during insertion.

// implementation in Javascript

//The TrieNode class
class TrieNode{
	constructor(char){
		this.children = [];
		for(var i = 0; i < 26; i++){ // Total # of English alphabets
			this.children[i] = null
		}
		this.isEndWord = false;	// will be true if the node represents the end of word
		this.char = char; // to store the value of a particular key
	}
	// Function to mark the currentNode as Leaf
	markAsLeaf(){
		this.isEndWord = true;
	}
	// Function to unMark the currentNode as Leaf
	unMarkAsLeaf(){
		this.isEndWord = false;
	}
}

let trieNode = new TrieNode('a');
console.log(trieNode.char);

//The Trie Class
//The Trie will be implemented using the TrieNode class.
/*A root node is placed at the top and contains 26 pointers(one per alphabet).
These pointers hold either null or another trieNode. The root is similar
to the headNode from linked lists.
The index of the children pointers is decided based on the sequence of the alphabets
(starting from 0). For instance, the node containing the alphabet a (if it exists) will be
stored at the 0th index, b at the 1st, and node z will come at the 25th index.

All the words are stored in a top-to-bottom manner. While storing the last character, we should always
set the isEndWord flag as true to indicate the end of a word. This technique
helps us in searching for a word to see if it even exists. */

class Trie {
	constructor(){
		this.root = new TrieNode(''); //Root node
	}
	// Function to get the index of character 't'
	getIndex(t){
		return t.charCodeAt(0)-"a".charCodeAt(0); // since charCodeAt returns the unicode value, we need to subtract it with a's unicode to get the index
	}
	//	Function to insert a key in the Trie
	insert(key){
		if(key === null)
			return
		key = key.toLowerCase();
		let index = 0;
		let currentNode = this.root;
		for(level = 0; level < key.length; level++){
			index = this.getIndex(key[level]);
			if(currentNode.children[index] === null){
				currentNode.children[index] = new TrieNode(key[level]);
				// console.log(key[level] + " inserted");
			}
			currentNode = currentNode.children[index];
		}
		//Mark the end character as leaf node
		currentNode.markAsLeaf();
		console.log("'" + key + "' inserted");
	}
	//	Function to search for a given key in the Trie
	search(key){
		if(key === null)
			return false;
		key = key.toLowerCase();
		let currentNode = this.root;
		let index;
		for(let level = 0; level < key.length; level++){
			index = this.getIndex(key[level]);
			if(currentNode.children[index] === null)
				return false;
			currentNode = currentNode.children[index];
		}
		if(currentNode.isEndWord)
			return true;
		return false;
	}
	//	Function to delete a given key from Trie
	
	hasNoChildren(currentNode){
		for(let i = 0; i < 26; i++){
			if(currentNode.children[i] !== null)
				return false
		}
		return true;
	}
	deleteHelper(currentNode, key, level, length){
		let deletedSelf = false;
		if(currentNode === null){
			console.log("key doesn't exist");
			return deletedSelf;
		}
		if(level === length){ // we have reached the end character of key
			if(this.hasNoChildren(currentNode)){
				deletedSelf = true;
				currentNode = null;
			}
			else{
				currentNode.unMarkAsLeaf();
				return deletedSelf;
			}
		}
		else{
			let childNode = currentNode.children[this.getIndex(key[level])];
			if(this.deleteHelper(childNode, key, level+1, length)){
				currentNode.children[this.getIndex(key[level])] = null;
				if(currentNode.isEndWord)
					deletedSelf = false;
				else if(this.hasNoChildren(currentNode) === false)
					deletedSelf = false;
				else{
					currentNode = null;
					deletedSelf = true;
				}
			}
			else
				deletedSelf = false;
		}
		return deletedSelf;
	}
	delete(key){
		if(this.root == null || key == null){
			console.log("Empty key or Empty Trie error");
			return ;
		}
		this.deleteHelper(this.root, key, 0, key.length)
	}
}

let t = new Trie();
console.log(t.getIndex('f'));

/*Problem 1
Total Number of Words in a Trie
Given a Trie, find the total number of words in it.
*/

function totalWords(rootN){
	let count = 0;
	function help(node){
		if(node.isEndWord)
			count++;
		for(let i = 0; i <= 25; i++){
			if(node.children[i] !== null){
				help(node.children[i])
			}
		}
		return
	}
	help(rootN);
	return count;
}

Problem 2
Find All words stored in Trie

function findWords (root){
	let result = [];
	function help(node, string){
		let newString = string + node.char;
		if(node.isEndWord)
			result.push(newString)
		for(let i = 0; i < 26; i++){
			if(node.children[i] !== null)
				help(node.children[i], newString);
		}
	}
	help(root, "");
	return result;
}