/* exported gameGenerator accountGenerator randomInteger */
/*
We've written a few tests for your Game Generator function which you can find them in the 'specs' folder.
By the end of this exercise, you'll be writing tests for the functions yourself.
*/

function randomInteger(n) {
  return Math.floor(Math.random() * (n + 1));
}

function gameGenerator(upperLimit) {
// returns an object
let upper = upperLimit;
//take a number input that provides the 'upper bound' (limit)
// - [ ] keep track of how many guesses have been made
  return {
    // - [ ] generate a random number between 0 and the upper bound
    number: randomInteger(upper) ,
    numOfGuesses: 0,
    // - [ ] have a method `reset` that resets the game (new winning number, reset guesses, same upper bound)
  
    reset: function () {
      this.number=randomInteger(upper);
      this.numOfGuesses=0;
    },
    // - [ ] have a method `giveUp` that returns the correct number and resets the game
  
    giveUp:function(){
      let pastGameNumber=this.number;
      this.reset();
      return pastGameNumber;
      
    },
    // - [ ] have a method `guess` that allows you to guess the number and returns true or false if the guess is right or wrong
  
    guess:function(num){
      if (num > upper) {
          return false;
      } 
      this.numOfGuesses++;
      if (num===this.number){
        return true;
      } else {
        return false;
      }
    },
    // - [ ] have a method `numGuesses` that provides a way to see the number of guesses that have been made
  
    numGuesses:function() {
      return this.numOfGuesses;
    },
  }
}


  // function randomInteger(n) {
  //   return Math.floor(Math.random() * (n + 1));
  // }

  // const upperBound = 5;

  // function guessThisNumber(n) {
  //   if (n > upperBound) {
  //     return {
  //       message: `Wrong. Please try a number between 0 and ${upperBound}.`,
  //       status: false
  //     };
  //   } else if (n === randomInteger(upperBound)) {
  //     return {
  //       message: "You win!",
  //       status: true
  //     };
  //   }

  //   return {
  //     message: `Wrong. Please try a number between 0 and ${upperBound}.`,
  //     status: false
  //   };
  // }


function accountGenerator(initial) {
  let balance = initial;

  return {
    withdraw: function(amount) {
      if (balance - amount >= 0) {
        balance = balance - amount;
        return `Here’s your money: $${amount}`;
      }
      return "Insufficient funds.";
    },
    deposit: function(amount) {
      balance = balance + amount;
      return `Your balance is: $${balance}`;
    }
  };
}
