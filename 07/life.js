//HELPER FUNCTIONS

//Helper function to grab a random element out of a given array
function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

//WORLD LOGIC

//The layout of the 'world'. # are walls and rocks, 0 are critters"
var plan = ["############################",
            "#      #    #      o      ##",
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##       o             #",
            "# o  #         o       ### #",
            "#    #                     #",
            "############################"];


//Vector data structure to hold positions
function Vector(x, y) {
  this.x = x;
  this.y = y;
}
Vector.prototype.plus = function (other) {
  return new Vector(this.x + other.x, this.y + other.y);
};


//Grid for the logic of the world
function Grid(width, height) {
  this.space = new Array(width * height);
  this.width = width;
  this.height = height;
}
Grid.prototype.isInside = function (vector) {
  return vector.x >= 0 && vector.x < this.width &&
    vector.y >= 0 && vector.y < this.height;
};
Grid.prototype.get = function (vector) {
  return this.space[vector.x + this.width * vector.y];
};
Grid.prototype.set = function (vector, value) {
  this.space[vector.x + this.width * vector.y] = value;
};
Grid.prototype.forEach = function (f, context) {
  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x < this.width; x++) {
      var value = this.space[x + y * this.width];
      if (value != null)
        f.call(context, value, new Vector(x, y));
    }
  }
};

//Basic grid test
//var grid = new Grid(5, 5);
//console.log(grid.get(new Vector(1, 1))); // undefined
//grid.set(new Vector(1, 1), "X");
//console.log(grid.get(new Vector(1, 1))); // X

//Function to map an elmenent to a character based on a legend, and vise-versa
function elementFromChar(legend, ch) {
  if (ch == " ")
    return null;
  var element = new legend[ch]();
  element.originChar = ch;
  return element;
}

function charFromElement(element) {
  if (element == null)
    return " ";
  else
    return element.originChar;
}



//Build the actual world
function World(map, legend) {
  var grid = new Grid(map[0].length, map.length);
  this.grid = grid;
  this.legend = legend;

  map.forEach(function (line, y) {
    for (var x = 0; x < line.length; x++)
      grid.set(new Vector(x, y),
        elementFromChar(legend, line[x]));
  });
}

World.prototype.toString = function () {
  var output = "";
  for (var y = 0; y < this.grid.height; y++) {
    for (var x = 0; x < this.grid.width; x++) {
      var element = this.grid.get(new Vector(x, y));
      output += charFromElement(element);
    }
    output += "\n";
  }
  return output;
};

var world = new World(plan, {
  "#": Wall,
  "o": BouncingCritter
});
console.log(world.toString());

//Walls don't do anything
function Wall() {}

//Function to iterate through the world and look for any object that can act
World.prototype.turn = function () {
  var acted = []; //So each critter will only move once per turn
  this.grid.forEach(function (critter, vector) {
    if (critter.act && acted.indexOf(critter) == -1) {
      acted.push(critter);
      this.letAct(critter, vector);
    }
  }, this);
};

World.prototype.letAct = function (critter, vector) {
  var action = critter.act(new View(this, vector));
  if (action && action.type == "move") {
    var dest = this.checkDestination(action, vector);
    if (dest && this.grid.get(dest) == null) {
      this.grid.set(vector, null);
      this.grid.set(dest, critter);
    }
  }
};

World.prototype.checkDestination = function (action, vector) {
  if (directions.hasOwnProperty(action.direction)) {
    var dest = vector.plus(directions[action.direction]);
    if (this.grid.isInside(dest))
      return dest;
  }
};
//CRITTER LOGIC

//Directions that the critters can go in
var directions = {
  "n": new Vector(0, -1),
  "ne": new Vector(1, -1),
  "e": new Vector(1, 0),
  "se": new Vector(1, 1),
  "s": new Vector(0, 1),
  "sw": new Vector(-1, 1),
  "w": new Vector(-1, 0),
  "nw": new Vector(-1, -1)
};


//Basic critter that just moves in a straight line until it hits a wall
function BouncingCritter() {
  var directionNames = "n ne e se s sw w nw".split(" ");
  this.direction = randomElement(directionNames);
};

BouncingCritter.prototype.act = function (view) {
  if (view.look(this.direction) != " ")
    this.direction = view.find(" ") || "s";
  return {
    type: "move",
    direction: this.direction
  };
};
