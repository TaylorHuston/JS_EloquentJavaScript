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



var theSet = ["Carel Haverbeke", "Maria van Brussel",  "Donald Duck"];
function isInSet(set, person) {
  return set.indexOf(person.name) > -1;
}

//Both of these produce the same result, returning any information from ancestry.js for the names in theSet
console.log(ancestry.filter(function(person) {
  return isInSet(theSet, person);
}));

//Binding example
console.log(ancestry.filter(isInSet.bind(null, theSet))); 

/****DNA CALCULATOR****/
//Build a JSON object of everyone by name
var byName = {};
ancestry.forEach(function (person) {
  byName[person.name] = person;
});
console.log(byName["Philibert Haverbeke"]);

//Function to reduce the family tree and run a function on each person
function reduceAncestors(person, someFunc, defaultValue) {
  function valueFor(person) {
    if (person == null)
      return defaultValue;
    else
      return someFunc(person, valueFor(byName[person.mother]), valueFor(byName[person.father])); //Recursively work up the family tree
  }
  return valueFor(person);
}

//Function to calculate the amount of DNA from a specific ancestor
function sharedDNA(person, fromMother, fromFather) {
  if (person.name == "Pauwels van Haverbeke") {
    return 1; //Person shares 100% of their DNA with themselves
  } else {
    return (fromMother + fromFather) / 2; //Each person contains 1/2 of the ancestral DNA from each parent
  }
}

var grandfather = byName["Philibert Haverbeke"];
console.log(reduceAncestors(grandfather, sharedDNA, 0) / 4);