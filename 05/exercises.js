var data = require('./ancestry.js');
var ancestry = JSON.parse(data);

/**Flatten an array of arrays into a single array**/
function flattening(arrays) {
  var newArray = arrays.reduce(function(x, y) {
    return x.concat(y);
  }, []);
  return newArray;
};

/**Calculate the average age difference between mothers and children**/
var byName = {}
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

function average(array) {
  function plus(x,y) {
    return (x+y);
  }
  return array.reduce(plus) /array.length;
}

function averageAge() {
  var ages = [];
  ancestry.forEach(function(person) {
    if (byName[person.mother] != null) {
      var mom = byName[person.mother]
      ages.push(person.born - mom.born);
    }
  })
  return ages;
}
console.log(flattening([[1, 2, 3], [4, 5], [6]]));
console.log(average(averageAge()));
