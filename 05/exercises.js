var data = require('./ancestry.js');
var ancestry = JSON.parse(data);

var byName = {}
ancestry.forEach(function (person) {
  byName[person.name] = person;
});

function average(array) {
  function plus(x, y) {
    return (x + y);
  }
  return array.reduce(plus) / array.length;
}


/**Flatten an array of arrays into a single array**/
function flattening(arrays) {
  var newArray = arrays.reduce(function (x, y) {
    return x.concat(y);
  }, []);
  return newArray;
};

console.log(flattening([[1, 2, 3], [4, 5], [6]]));

/**Calculate the average age difference between mothers and children**/
function averageAge() {
  var ages = [];
  ancestry.forEach(function (person) {
    if (byName[person.mother] != null) {
      var mom = byName[person.mother]
      ages.push(person.born - mom.born);
    }
  })
  return ages;
}

console.log(average(averageAge()));

/**Historical Life Expectancy**/

function GroupAges() {
  var ageHash = {}
  ancestry.forEach(function (person) {
    var key = (Math.ceil(person.died / 100));
    var age = person.died - person.born;
    if (key in ageHash) {
      ageHash[key].push(age);
    } else {
      ageHash[key] = [age];
    }

  })
  return ageHash;
}

function CalcAverage(ages) {
  var averageAges = {}
  for (century in ages) {
    averageAges[century] = average(ages[century]);
  }
  return averageAges
}
console.log(CalcAverage(GroupAges()));

/**Custom 'every' and 'some' functions**/
function every(array, predicate) {
  for (var i = 0; i < array.length; i++) {
    if (!predicate(array[i]))
      return false;
  }
  return true;
}

function some(array, predicate) {
  for (var i = 0; i < array.length; i++) {
    if (predicate(array[i]))
      return true;
  }
  return false;
}
console.log(every([NaN, NaN, NaN], isNaN));
console.log(every([NaN, NaN, 4], isNaN));
console.log(some([NaN, 3, 4], isNaN));
console.log(some([2, 3, 4], isNaN));