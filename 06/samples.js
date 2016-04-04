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