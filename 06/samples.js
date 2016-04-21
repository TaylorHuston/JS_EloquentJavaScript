var rabbit = {};

rabbit.speak = function (line) {
  console.log("The rabbit says '" + line + "'");
}

rabbit.speak("I'm alive");

//Object notation
function speak(line) {
  console.log("The " + this.type + " rabbit says '" +
    line + "'");
}
var whiteRabbit = {
  type: "white",
  speak: speak
};
var fatRabbit = {
  type: "fat",
  speak: speak
};

whiteRabbit.speak("Hi");
fatRabbit.speak("Bye");

speak.apply(fatRabbit, ["Nom nom"]);
speak.call({type: "old"}, "Oh Myyyyyyyy.");

//Prototypes
console.log(Object.getPrototypeOf({}) == Object.prototype);  //True
console.log(Object.getPrototypeOf(isNaN) == Function.prototype);  //True
console.log(Object.getPrototypeOf([]) == Array.prototype);  //True

//Prototype (like class?)
var protoRabbit = {
  speak: function(line) {
    console.log("The " + this.type + " rabbit says '" +
                line + "'");
  }
};

//Create an object with a specific prototype
var killerRabbit = Object.create(protoRabbit);
killerRabbit.type = "killer";
killerRabbit.speak("SKREEEE!");

//Constructor
function Rabbit(type) {
  this.type = type;
}

var killerRabbit = new Rabbit("killer");
var blackRabbit = new Rabbit("black");
console.log(blackRabbit.type); //black

//Add funciontality to a class
Rabbit.prototype.speak = function(line) {
  console.log("The " + this.type + " rabbit says '" +
              line + "'");
};
blackRabbit.speak("Doom...");
killerRabbit.speak("The count shall be 3");

//Override prototype values
Rabbit.prototype.teeth = "small";
console.log(killerRabbit.teeth);
killerRabbit.teeth = "long, sharp, and bloody";
console.log(killerRabbit.teeth);
console.log(blackRabbit.teeth);
console.log(Rabbit.prototype.teeth);

//Create an object without a prototype
var map = Object.create(null);
map["someProp"] = 0.069;
console.log("toString" in map);  //False


var pile = {
  elements: ["eggshell", "orange peel", "worm"],
  get height() {
    return this.elements.length;
  },
  set height(value) {
    console.log("Ignoring attempt to set height to", value);
  }
};

console.log(pile.height); //3
pile.height = 100; //Ignoring attempt to set height to 100
