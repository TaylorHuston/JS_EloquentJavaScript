function range(x,y) {
  var myArray = [];
  for (var i = x; i <= y; i++) {
    myArray.push(i);
  }
  return myArray;
}

function sum(myArray) {
  var sum = 0;
  for (var i = 0; i < myArray.length; i++) {
    sum += myArray[i];
  }
  return sum;
}

function reverseArray(myArray) {
  var newArray = [];
  for (var i = myArray.length-1; i >= 0; i--) {
    newArray.push(myArray[i]);
  }
  return newArray;
}

function ReverseArrayInPlace(myArray) {
  var newArray = [];
  for (var i = myArray.length-1; i >= 0; i--) {
    newArray.push(myArray[i]);
  }
    for (var i = 0; i < newArray.length; i++) {
    myArray[i] = newArray[i];
  }
  return myArray;
}

console.log(sum(range(1,10)));
console.log(reverseArray(["A","B","C"]));
console.log(reverseArrayInPlace(["A","B","C"]));