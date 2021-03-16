// time complexity will be O(M+N)
function mergeArrays(arr1, arr2){
	let merge = [];
	let i = 0;
	let j = 0;
	while(i < arr1.length && j < arr2.length){
		if(arr1[i] <= arr2[j]){
			merge.push(arr[i]);
			i++;
		}
		else{
			merge.push(arr2[j]);
			j++;
		}
	}
	if(j === arr2.length){
		merge.concat(...arr1.slice(i));
	}
	else
		merge.concat(...arr2.slice(j));
	return merge;
}

//the below code looks really short and elegant but has worse time complexity O(nlogn)

function mergeSortedArrays(arr1, arr2){
	return [...arr1, ...arr2].sort((a,b) => a -b);
}


//Find 2 numbers in an array that match upto a given number
function findSum (arr, value){
	arr.sort((a, b) => a-b);
	let left = 0;
	let right = arr.length-1;
	while(left < right){
		if(arr[left] + arr[right] > value)
			right--;
		else if(arr[left] + arr[right] < value)
			left++;
		else
			return [arr[left], arr[right]];
	}
	return false
}


//Array of products of all elements
function findProduct (arr){
	let totalProduct = 1;
	for(num of arr)
		totalProduct *= num;
	for(let i = 0 ; i < arr.length; i++){
		arr[i] = totalProduct/arr[i];
	}
	return arr;
}

// Find minimum value in array
function findMinimum (arr){
	let min = +Infinity;
	for(num of arr)
		min = Math.min(min, num);
	return min;
}

// First unique number in an array

function findFirstUnique(arr){
	let frequencyMap = {};
	for(num of arr){
		if(!(num in frequencyMap))
			frequencyMap[num] = 0;
		frequencyMap[num]++;
	}
	let array = Object.entries(frequencyMap);
	for(let i = 0; i < array.length; i++){
		if(array[i][1] == 1)
			return array[i][0];
	}
	return null
}

// Second largest Number in array

function findSecondMaximum (arr) {
	let max = -Infinity;
	let secondMax = -Infinity;
	for(let i = 0; i < arr.length; i++){
		if(arr[i] > max){
			secondMax = max;
			max = arr[i];
		}
		else if(arr[i] > secondMax && arr[i] != max){
			secondMax = arr[i];
		}
	}
	return secondMax;
}
// This uses only one traversal O(n)

// Rotate an array from right to left

function rightRotate(arr, n){
	let result = new Array(arr.length).fill(0);
	for(let i = 0; i < arr.length; i++){
		if(i <= arr.length -1 -n){
			result[i+n] = arr[i];
		}
		else{
			result[i+n-arr.length] = arr[i];
		}
	}
	return result;
}
console.log(rightRotate([1,2,3,4,5], 3));

// A more elegant solution

function rightRotate(arr, n){
	let result = [];
	for(let i = arr.length-n; i < arr.length; i++)
		result.push(arr[i]);
	for(i = 0; i < arr.length-n; i++)
		result.push(arr[i]);
	return result;
}
console.log(rightRotate([1,2,3,4,5], 3));


// An even more elegant one-line solution
function rightRotate(arr, n){
	return (arr.splice(arr.length - n).concat(arr.splice(0, arr.length)))
}


//Rearrange positive and negative values in an array

function reArrange (arr){
	let result = [];
	for(num of arr){
		if(num < 0)
			result.unshift(num);
		else result.push(num);
	}
	return result;
}
console.log(reArrange([2,-4,5,6,-34,0,45]));

// trying to optimize this further
//use 2 pointers
function reArrange(arr){
	let result = new Array(arr.length);
	let left = 0;
	let right = arr.length-1;
	for(num of arr){
		if(num < 0){
			result[left] = num;
			left++;
		}
		else{
			result[right] = num;
			right--;
		}
	}
	return result;
}
console.log(reArrange([2,-4,5,6,-34,0,45]));

//Trying to rearrange in-place

function reArrange(arr){
	let leftPos = 0;
	let temp;
	for(let i = 0; i < arr.length; i++){
		if(arr[i] < 0){
			if(i != leftPos){
				temp = arr[i];
				arr[i] = arr[leftPos];
				arr[leftPos] = temp;
			}
			leftPos++;
		}
	}
	return arr;
}

//Rearrange sorted Array in Max/Min form
//Input array is in ascending order

function maxMin(arr){
	let result = new Array(arr.length);
	let left = 0;
	let right = arr.length-1;
	let i = 0;
	while(left <= right){
		if(i === arr.length)
			break;
		result[i] = arr[right];
		if(i+1 === arr.length)
			break;
		result[i+1] = arr[left];
		left++;
		right--;
		i += 2;
	}
	return result;
}
console.log(maxMin([1,2,3,4,5]));

// A more elegant solution

function maxMin(arr){
	let result =[];
	for(let i = 0; i < (Math.floor(arr.length/2)); i++){
		result.push(arr[arr.length-(i+1)])
		result.push(arr[i]);
	}
	if(arr.length % 2)
		result.push(arr[Math.floor(arr.length/2)])
	return result;
}

// using O(1) extra space only

function maxMin(arr){
	let maxIdx = arr.length-1;
	let minIdx = 0;
	let maxElem = arr[maxIdx] + 1; //store any element that is greater than the maximum element in the array
	for(let i = 0; i < arr.length; i++){
		//at even indices we will store maximum elements
		if(i % 2 == 0){
			arr[i] += Math.floor((arr[maxIdx] % maxElem) * maxElem)
			maxIdx -= 1;
		}
		else { //at odd indices we will store minimum elements
			arr[i] += Math.floor((arr[minIdx] % maxElem) * maxElem)
			minIdx += 1;
		}
	}
	// dividing with maxElem to get the original values
	for(let i = 0; i < arr.length; i++){
		arr[i] = Math.floor(arr[i] / maxElem)
	}
	return arr;
}
//The above is a really really smart solution, but won't work for negative values


// Maximum Sum Subarray

function maxSumSubArray (A){
	let sumTillNow = 0;
	let maxSum = -Infinity;
	for(let i = 0; i < A.length; i++){
		sumTillNow += A[i];
		maxSum = Math.max(sumTillNow, maxSum);
		if(sumTillNow < 0)
			sumTillNow = 0;
	}
	return maxSum;
}

arr = [[1,2,3,4], [4,5,6,7], [8,9,10] ]


