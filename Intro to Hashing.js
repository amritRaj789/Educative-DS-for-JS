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