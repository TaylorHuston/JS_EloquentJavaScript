var data = require('./ancestry.js');
var ancestry = JSON.parse(data);


//Custome filter function
function filter(array, test) {
  var passed = [];
  for (var i = 0; i < array.length; i++) {
    if (test(array[i]))
      passed.push(array[i]);
  }
  return passed;
}

console.log(filter(ancestry, function (person) {
  return person.born > 1900 && person.born < 1925;
}));

//Built in filter function (does the same thing)
console.log(ancestry.filter(function (person) {
  return person.father == "Carel Haverbeke";
}));

//Custom Map function
function map(array, transform) {
  var mapped = [];
  for (var i = 0; i < array.length; i++)
    mapped.push(transform(array[i]));
  return mapped;
}

//Filter to anyone over 90 years old
var overNinety = ancestry.filter(function (person) {
  return person.died - person.born > 90;
});

//Run map on the filtered array of poeple over 90 years old
console.log(map(overNinety, function (person) {
  return person.name;
}));

//Built in map function
console.log(overNinety.map(function (person) {
  return person.died - person.born;
}));


//Custom reduce function
function reduce(array, combine, start) {
  var current = start;
  for (var i = 0; i < array.length; i++)
    current = combine(current, array[i]);
  return current;
}

//Returns a sum of all of the items
console.log(reduce([1, 2, 3, 4], function (a, b) {
  return a + b;
}, 0));

//Built in reduce function, returns the most ancient person
console.log(ancestry.reduce(function (min, cur) {
  if (cur.born < min.born) return cur;
  else return min;
}));

//Find the average age of a filtered subgroup
function average(array) {
  function plus(a, b) {
    return a + b;
  }
  //Using reduce with a pre-defined passed in function
  return array.reduce(plus) / array.length;
}

function age(p) {
  return p.died - p.born;
}

function male(p) {
  return p.sex == "m";
}

function female(p) {
  return p.sex == "f";
}
console.log(average(ancestry.filter(male).map(age))); //61.67

//Build a JSON object of just the names
var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
})