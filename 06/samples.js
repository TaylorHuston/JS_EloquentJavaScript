var rabbit = {};

rabbit.speak = function (line) {
  console.log("The rabbit says '" + line + "'");
}

rabbit.speak("I'm alive");



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
console.log(Object.getPrototypeOf({}) == Object.prototype);
console.log(Object.getPrototypeOf(isNaN) == Function.prototype);
console.log(Object.getPrototypeOf([]) == Array.prototype);

//Prototype (like class?)
var protoRabbit = {
  speak: function(line) {
    console.log("The " + this.type + " rabbit says '" +
                line + "'");
  }
};
var killerRabbit = Object.create(protoRabbit);
killerRabbit.type = "killer";
killerRabbit.speak("SKREEEE!");

//Constructor
function Rabbit(type) {
  this.type = type;
}

var killerRabbit = new Rabbit("killer");
var blackRabbit = new Rabbit("black");
console.log(blackRabbit.type);

//Add funciontality to a class
Rabbit.prototype.speak = function(line) {
  console.log("The " + this.type + " rabbit says '" +
              line + "'");
};
blackRabbit.speak("Doom...");
killerRabbit.speak("The count shall be 3");