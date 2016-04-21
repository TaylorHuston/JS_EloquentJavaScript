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