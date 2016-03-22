function exercise1() {
  var string = "";

  for (var i = 0; i < 7; i++) {
    string = string + "#";
    console.log(string);
  }

}

function exercise2() {
  for (var i = 1; i <= 100; i++) {
    if (i % 3 == 0 && i % 5 != 0) {
      console.log('Fizz');
    } else if (i % 3 != 0 && i % 5 == 0) {
      console.log('Buzz');
    } else if (i % 3 == 0 && i % 5 == 0) {
      console.log('FizzBuzz');
    } else {
      console.log(i);
    }
  }
}

function exercise3() {
  var string = "";
  var next = " ";
  for (var i = 1; i <= 65; i++) {
    string += next;
    if (i % 8 == 0) {
      string += "\n";
    } else if (next == " ") {
      next = "#";
    } else {
      next = " ";
    }
  }

  console.log(string);

}

exercise1();
exercise2();
exercise3();