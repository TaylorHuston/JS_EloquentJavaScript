function range(x,y) {
  var myArray = [];
  for (var i = x; i <= y; i++) {
    myArray.push(i);
  }
  return myArray;
};

function sum(myArray) {
  var sum = 0;
  for (var i = 0; i < myArray.length; i++) {
    sum += myArray[i];
  }
  return sum;
};

function reverseArray(myArray) {
  var newArray = [];
  for (var i = myArray.length-1; i >= 0; i--) {
    newArray.push(myArray[i]);
  }
  return newArray;
};

function reverseArrayInPlace(myArray) {
  var newArray = [];
  for (var i = myArray.length-1; i >= 0; i--) {
    newArray.push(myArray[i]);
  }
    for (var i = 0; i < newArray.length; i++) {
    myArray[i] = newArray[i];
  }
  return myArray;
};

function node(val) {
  this.val = val;
  this.next =  null;
  this.add = function (newVal) {
    if (this.next != null) {
      this.next.add(newVal);
    } else {
      this.next = new node(newVal);
    }
    return;
  }
};

function arrayToList(myArray) {
  var myNode = new node(myArray[0]);
  for (var i = 1; i < myArray.length; i++) {
    myNode.add(myArray[i]);
  }
  return myNode;
};

function deepEqual(obj1, obj2) {  
  for (var prop in obj1) {
    if (typeof obj1[prop] === 'object') {
      if(typeof obj2[prop] !== 'object') {
        return false;
      }
      if (deepEqual(obj1[prop], obj2[prop]) === false) {
        return false;
      }
    } else if (obj1[prop] !== obj2[prop]) {
      return false;
    }
  }  
  return true;
}

console.log(sum(range(1,10)));
console.log(reverseArray(["A","B","C"]));
console.log(reverseArrayInPlace(["A","B","C"]));
console.log(arrayToList([1,2,3,4,5,6]));

var obj1 = {name: "Me", handsome: {isHandsome: true }, age: 20};
var obj2 = {name: "Me", age: 25};
var obj3 = {name: "Me", notAge: 25};
var obj4 = {name: "Me", handsome: {isHandsome: false }, age: 20};
var obj5 = {name: "Me", handsome: {isHandsome: true }, age: 20};
console.log(deepEqual(obj1, obj1));
console.log(deepEqual(obj1, obj2));
console.log(deepEqual(obj2, obj3));
console.log(deepEqual(obj1, obj5));
