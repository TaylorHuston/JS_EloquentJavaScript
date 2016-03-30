//Custom forEach function example
function forEach(array, action) {
  for (var i = 0; i < array.length; i++)
    action(array[i]);
}

forEach(["Wampeter", "Foma", "Granfalloon"], console.log);

var numbers = [1, 2, 3, 4, 5],
  sum = 0;
forEach(numbers, function (number) {
  sum += number;
});
console.log(sum); //15


//Return a function from another function
function greaterThan(n) {
  return function (m) {
    return m > n;
  };
}
var greaterThan10 = greaterThan(10);
console.log(greaterThan10(11)); //True

//Make your own theoretical control flow
function unless(test, then) {
  if (!test) then();
}

function repeat(times, body) {
  for (var i = 0; i < times; i++) body(i);
}

repeat(3, function (n) {
  unless(n % 2, function () {
    console.log(n, "is even");
  });
});
// → 0 is even
// → 2 is even

//JSON manipulation
var string = JSON.stringify({
  name: "X",
  born: 1980
});
console.log(string); // → {"name":"X","born":1980}
console.log(JSON.parse(string).born); // → 1980
