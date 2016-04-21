function Vector(x, y) {
  this.x = x;
  this.y = y;
}

Vector.prototype.plus = function (V) {
  return new Vector(this.x + V.x, this.y + V.y);
}

Vector.prototype.minus = function (V) {
  return new Vector(this.x - V.x, this.y - V.y);
}

Object.defineProperty(Vector.prototype, "length", {
  get: function () {
    return (Math.sqrt(this.x * this.x + this.y * this.y));
  }
});

console.log(new Vector(1, 2).plus(new Vector(2, 3)));
console.log(new Vector(1, 2).minus(new Vector(2, 3)));
console.log(new Vector(3, 4).length);

function ArraySeq(array) {
  this.pos = -1;
  this.array = array;
}
ArraySeq.prototype.next = function () {
  if (this.pos >= this.array.length - 1)
    return false;
  this.pos++;
  return true;
};
ArraySeq.prototype.current = function () {
  return this.array[this.pos];
};

function RangeSeq(from, to) {
  this.pos = from - 1;
  this.to = to;
}
RangeSeq.prototype.next = function () {
  if (this.pos >= this.to)
    return false;
  this.pos++;
  return true;
};
RangeSeq.prototype.current = function () {
  return this.pos;
};

function logFive(sequence) {
  for (var i = 0; i < 5; i++) {
    if (sequence.next() == false)
      break;
    console.log(sequence.current());
  }
};

logFive(new ArraySeq([1, 2]));
logFive(new RangeSeq(100, 1000));