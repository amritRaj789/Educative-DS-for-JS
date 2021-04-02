The overall time complexity accomplished by most of the data structures in insertion, deletion and search was up to O(log(n))
But for a significantly large amount of data, this complexity starts to adversely affect the efficiency of the algorithm.

Hash Tables to the rescue !

If your algorithm prioritizes search operations, then a hash table is the best data structure.

The performance of a hash table depends on 3 fundamental factors:
	Hash function
	Size of the hash table
	Collision handling method

The Hash function

Restricting the Key size.

A key is used to map a value in the array, and the efficiency of a hash table depends on how a key is computed.
At first glance, you may observe that we can directly use the indices as keys because each index is unique.

One Problem
The only problem is that the key would eventually exceed the size of the array and at every insertion, the array would need to be resized.
Syntactically we can easily increase array size in Javascript, but as we learned before, the process still takes O(n) time at the back end.

One Solution
In order to limit the range of keys to the boundaries of the array, we need a function that converts a large key into a smaller key. 
This is the job of the hash function
A hash function simply takes an item's key and returns the corresponding index in the array for that item.
Depending on your program, the calculation of this index can be a simple arithmetic or a very complicated encryption method.
However, it is important to choose an efficient hashing function as it directly affects the performance of the hash table mechanism.

Common hash functions

Arithmetic Modular
	index = key MOD tableSize
	(hence the key will always stay between 0 and tableSize -1)

function hashModular (key, size){
	return key%size;
}

let list = [];
for(let i = 0; i < 10; i++){
	list[i] = null;
}
let key = 35;
let index = hashModular(key, list.length); // Fit the key into the array size
console.log("the index for key " + String(key) + "is" + String(index))

Truncation

Select a part of the key as the index rather than the whole key.
Once again we use a mod function for this operation, although it doesnt need to be based on the array size

key = 123456 -> index = 3456

function hashTrunc(key){
	return key%1000; // will always give us a key of upto 3 digits.
}

Folding
Divide the key into small chunks and apply a different arithmetic strategy at each chunk.
For example, you add all the smaller chunks together.

key = 456789, chunk = 2, index = 45 + 67 + 89

function hasFold(key, chunkSize){
	let strKey = String(key);
	let hashVal = 0;
	for(let i = 0; i < strKey.length; i += chunkSize){
		if(i + chunkSize < strKey.length){
			hashVal += Number(strKey.slice(i, i+chunkSize))
		}
		else{
			hashVal += Number(strKey.slice(i, strKey.length))
		}
	}
	return hashVal;
}

let key = 3456789;
let chunkSize = 2;

Collisions in Hash Tables

When you map large keys into a small range of numbers from 0-N, where N is the size of the array
there is a huge possibility that two different keys may return the same index.
This phenomenon is called collision.

Strategies to Handle Collision
Linear Probing:
	If our hash function returns an index that is already filled, it would move to the next index.
	This increment can be based on a fixed offset value to an already computed index.
	If that index is also filled, it would traverse farther until a free spot is found.

	One drawback of using this strategy is that if we dont pick an offset wisely, we can end up back
	where we started and we would miss out on so many possible positions in the array.

Chaining:
	Each slot of our hash table holds a pointer to another data structure such as a linked list or a tree.
	Every entry at that index will be inserted into the linked list for that index.
	This strategy greatly increases performance but it is costly in terms of space.

Resizing the Array:

	We can set a threshold and once it is crossed, we can create a new table that is double the size of the original.
	All we have to do then is to copy the elements from the previous table.
	Resizing the array significantly reduces collisions, but the function itself is costly.
	Therefore we need to be careful about the threshold we set. A typical conversation is to set the threshold 0.6 which means that
	when 60% table is filled, the resize operation needs to take place.

	Another factor to keep in mind is the content of the hash table. The stored records might be concentrated in one region,
	leaving the rest of the array empty. However, this behaviour will not be picked up by the resize function and you will
	end up resizing inappropriately


Some other strategies to handle collisions include quadratuc probing, bucket method, random probing, and key rehashing.
We must use a strategy that best suits our hashing algorithm and the size of the data that we plan to store.


Hash Table Implementation in Javascript

Hash Table using Bucket Chaining

We will use the chaining strategy along with the resize operation to avoid collisions in the table.
All elements with the same hash key will be stored in an array at that index. In data structures, these arrays
are called Buckets. The size of the hash table is set as n*m where n is the number of keys it can hold, 
and m is the number of slots each bucket contains. Each slot holds a key/value pair

HashEntry Class. It consists of three data members: the key, the value and the reference to a new entry.

class HashEntry{
	constructor(key, data){
		this.key = key;
		this.value = data;
		this.next = null;
	}
}

let entry = new HashEntry(3, "Educative");

class HashTable {
	constructor(){
		this.slots = 10;	// size of the hash table
		this.size = 0;		// current entries in the table
		this.bucket = [];	// array of hashentry objects (by default all none)
		for(let i = 0; i < this.slots; i++){
			this.bucket[i] = null;
		}
	}
	// Helper functions
	getSize(){
		return this.size;
	}
	isEmpty(){
		return this.getSize() == 0;
	}
	resize(){
		let new_slots = this.slots*2;
		let new_buckets = new Array(new_slots).fill(null);
		//rehash all items into new slots
		for(let i = 0; i < this.bucket.length; i++){
			let head = this.bucket[i];
			while(head !== null){
				let new_index = this.getIndex(head.key);
				if(new_bucket[new_index] == null){
					new_bucket[new_index] = new HashEntry(head.key, head.value);
				}
				else{
					let node = new_bucket[new_index];
					while(node != null){
						if(node.key == head.key){
							node.value = head.value;
							node = null;
						}
						else if(node.next == null){
							node.next = new HashEntry(head.key, head.value);
							node = null;
						}
						else
							node = node.next;
					}
				}
				head = head.next;
			}
		}
		this.bucket = new_bucket;
	}
	getIndex(key){
		let index = key % this.slots;
		return index;
	}

	insert(key, value){
		// Find the node with the given key
		let threshold = 0.6;
		let b_Index = this.getIndex(key);
		if(this.bucket[b_Index] === null){
			this.bucket[b_Index] = new HashEntry(key, value);
			console.log(String(key) + ", " + String(value) + " - inserted")
		}
		else{
			let head = this.bucket[b_Index];
			while(head !== null){
				if(head.key === key){
					head.value = value;
					break;
				}
				else if(head.next == null){
					head.next = new HashEntry(key, value);
					console.log(String(key) + ", " + String(value) + " - inserted");
					break;
				}
				head = head.next;
			}
		}
		this.size += 1;
		let load_factor = Number(this.size)/Number(this.slots);
		// Checks if 60% of the entries in table are filled, threshold = 0.6
		if(load_factor >= threshold){
			this.resize();
		}
	}

	search(key){
		//find node with the given key
		let b_Index = this.getIndex(key);
		let head = this.bucket[b_Index];
		//search key in the bucket
		while(head !== null){
			if(head.key === key)
				return head.value;
			head = head.next;
		}
		console.log("key not found");
		return null;
	}

	deleteVal (key){
		//find index
		let b_Index = this.getIndex(key);
		let head = this.bucket[b_Index];
		//if key exists at first slot
		if(head.key == key){
			this.bucket[b_Index] = head.next;
			console.log("key deleted");
			this.size -= 1;
			return;
		}
		// find key in slots
		let prev = null;
		while(head !== null){
			//if key exists
			if(head.key === key){
				prev.next = head.next;
				console.log("key deleted");
				this.size -= 1;
				return;
			}
			// else keep moving in chain
			prev = head;
			head = head.next;
		}
		//if key doesn't exist
		console.log("key not found");
		return;
	}
}

// Comparison Between Trees and Hash Tables
On average, hash tables can perform search, insertion, and deletion in constant time
whereas Trees usually work in O(log(N)).
However in the worst case scenario, the performance of hash tables can come down to O(n) 
where n is the total number of hash entries, whereas an AVL Tree would maintain the O(log(n))

Hash Function
An efficient hash table requires a smart hash function that would distribute the keys over all
the space that is available to us. A tree is simpler to implement in this regard as it accesses 
extra space only when needed and no hash function is required to optimize its structure.

Order of Data
If our application needs data to be ordered in a specific sequence, trees would prove more useful 
because a BST or an AVL tree maintain its order.
Hash tables are the smarter choice if your data

/*Challenge 1 :
Find if list2 is a subset of list1
*/
function isSubset(list1, list2){
	let hash = {};
	for(let num of list1){
		hash[num] = true;
	}
	for(let num of list2){
		if(!(num in hash))
			return false;
	}
	return true;
}

//doing it using HashTable class that we created

function isSubset(list1, list2){
	let myHash = new HashTable();
	for(let num of list1){
		myHash.insert(num, true);
	}
	for(let num of list2){
		if(myHash.search(num) === null)
			return false;
	}
	return true;
}

/*Challenge 2
Find if 2 arrays are disjoint (no common elements)
*/
function isDisjoint(list1, list2){
	let myHash = new HashTable();
	for(let num of list1){
		myHash.insert(num, true);
	}
	for(let num of list2){
		if(myHash.search(num) !== null)
			return false;
	}
	return true;
}

/*Challenge 3
Find Symmetric Pairs in array
*/
function findSymmetric(my_list){
  let hash = new HashTable();
  let result = [];
  for(let i = 0; i < my_list.length; i++){
  	hash.insert(my_list[i][0], my_list[i][1]);
  }
  for(let i = 0; i < my_list.length; i++){
  	if(hash.search(my_list[i][1]) == my_list[i][0])
  		result.push([my_list[i][1], my_list[i][0]]);
  }
  return result
}

// An even more efficient way

function findSymmetric(my_list){
	let hash = new HashTable();
	let result = [];
	for(let i = 0 ; i < my_list.length; i++){
		let first = my_list[i][0];
		let second = my_list[i][1];
		let value = hash.search(second);
		if(value !== null && value == first){
			result.push([second, first]);
			result.push([first, second]);
		}
		else
			hash.insert(first, second);
	}
	return result;
}


/*Challenge 4:
Trace the Complete Path of A Journey
You have to implement the tracePath() function which will take in a list of source-destination pairs 
and return the correct sequence of the whole journey from the first city to the last.
*/
function tracePath(map){
	let start = "";
	let right = {};
	for(let city in map){
		right[map[city]] = 1;
	}
	for(let city in map){
		if(!(city in right)){
			start = city;
			break;
		}
	}
	let result = [];
	for(let i = 1; i <= Object.keys(map).length; i++){
		result.push([start, map[start]]);
		start = map[start];
	}
	return result;
}

/*Challenge 5
Find 2 pairs in an Array such that a+b = c+d*/
red red red red red red red red red red red red red
function findPair (my_list){
	let hash = {};
	for(let i = 0; i < my_list.length-1; i++){
		for(let j = i+1; j < my_list.length; j++){
			let sum = my_list[i] + my_list[j];
			if(sum in hash)
				return [[my_list[i], my_list[j]], hash[sum]];
			else
				hash[sum] = [my_list[i], my_list[j]];
			
		}
	}
}

Challenge 6: A Subarray with a Sum of 0
red red red red red red red red red red red red red red red

function findSubZero(my_list){
	let hMap = new HashTable();
	let sum = 0;
	// traverse through the given array
	for(let i = 0; i < my_list.length; i++){
		sum += my_list[i];
		if(my_list[i] == 0 || sum == 0 || hMap.search(sum) !== null){
			return true;
		}
		hMap.insert(sum, i);
	}
	return false;
}
//this is a brilliant solution

/*Challenge 7
Two Sum
Find 2 numbers from the given array whose sum equals the input value.
Return false if no such pair exists. If more than one such pair exist, return any one pair
*/
function findSum(arr, value){
	let hash = {};
	for(let i = 0; i < arr.length; i++){
		if(arr[i] in hash)
			return ([hash[arr[i]], arr[i]]);
		else
			hash[value-arr[i]] = arr[i];
	}
	return false;
}

/*Challenge 8
Return first unique integer in the given array (number that appears only once in the array)
Return null if no unique number exists
*/
function  findFirstUnique (arr){
	let hash = {};
	for(let num of arr){
		if(!(num in hash))
			hash[num] = 0;
		hash[num]++;
	}
	for(let num of arr){
		if(hash[num] === 1)
			return num;
	}
	return null;
}

/*Challenge 9
Given a linkedlist, remove any duplicate nodes it might have.
*/
function removeDuplicates(list){
	let head = list.head;
	let prev = null;
	let hash = {};
	while(head !== null){
		if(!(head.data in hash)){
			hash[head.data] = 1;
			prev = head;
			head = head.nextElement;
		}
		else{
			prev.nextElement = head.nextElement;
			head = head.nextElement;
		}
	}
	return list;
}

/*Challenge 10
Union of Linked Lists
Given 2 linked lists, return their union
*/
function union (list1, list2){
	let hash = {};
	let head1 = list1.head;
	while(head1 !== null){
		hash[head1.data] = 1
		head1 = head1.nextElement;
	}
	let head2 = list2.head;
	while(head2 !== null){
		if(!(head2.data in hash)){
			list1.insertAtHead(head2.data);
		}
		head2 = head2.nextElement;
	}
	return list1;
}
