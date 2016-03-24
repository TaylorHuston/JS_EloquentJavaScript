function min(x, y) {
  if (x <= y) {
    return x
  } else {
    return y;
  }
}

function isEven(x) {
  if (x == 0 || x == 1) {
    return x;
  } else if (x > 1) {
    return isEven(x - 2);
  } else {
    return isEven(x + 2);
  }
}

function countB(myString) {
  var count = 0;
  for (var  i = 0; i < myString.length; i++) {
    if (myString.charAt(i) == "B") {
      count++
    }
  }
  return count;
}

console.log(min(10, 7));
console.log(isEven(50));
console.log(isEven(75))
console.log(isEven(-75))
console.log(countB("BBC"));
console.log(countB("aAbBcC"));