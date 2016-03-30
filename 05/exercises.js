function flattening(arrays) {
  var newArray = arrays.reduce(function(x, y) {
    return x.concat(y);
  }, []);
  return newArray;
};

console.log(flattening([[1, 2, 3], [4, 5], [6]]));
