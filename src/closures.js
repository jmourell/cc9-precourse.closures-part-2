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
  
    numberGuesses:function() {
      return this.numOfGuesses;
    },
  }
}
/**
[ ] `accountGenerator`: You'll be provided with a function called `accountGenerator` in `src/closures.js`. Please add more functionality:

- [ ] Add function `getBalance` that returns the current balance
- [ ] Change `withdraw` to return a transaction object (see below)
- [ ] Change `deposit` to return a transaction object (see below)
- [ ] Implement a function `transactionHistory` to get the last `n` withdrawals or deposits 💵 (see below)
- [ ] Implement a function `averageTransaction` that determines the average withdrawal and deposit amounts 💰. _IMPORTANT: Only approved transactions count towards the total!_. It should return an object that looks like

  ```js
  {
    deposit: number,
    withdrawal: number
  }
  ```

- [ ] Use the `Date` object to incorporate a key `time` into the transactions 📅

A single transaction should be represented by an object. For instance:

```js
const exampleDeposit = {
  type: "deposit",
  amount: 1000,
  before: 500,
  after: 1500,
  status: "approved"
};

const exampleWithdrawal = {
  type: "withdrawal",
  amount: 1000,
  before: 520,
  after: 520,
  status: "denied"
};
```

Transaction history, for instance:

```js
const account = accountGenerator(100);
account.transactionHistory(2); // => [{...}, {...}]
```
*/


function accountGenerator(initial) {
  let balance = initial;
  //records transaction history
  const transactions = [];
   
  const WITHDRAW = "withdrawal";
  const DEPOSIT = "deposit";
  const APPROVED = "approved";
  const DENIED = "denied";

  return {
    getBalance:function() {
      return balance;
    },
    withdraw: function(amount) {
      const withdrawal = {
        type:WITHDRAW,
        amount:amount,
        before:balance,
      };
      if (balance - amount >= 0) {
        withdrawal.after = balance - amount;
        withdrawal.status = APPROVED;
        balance = balance - amount;
      } else {
        withdrawal.after = balance;
        withdrawal.status = DENIED;
      } 
      withdrawal.time = new Date();
      transactions.push(withdrawal);
      return withdrawal;
    },
    transactionHistory:function(numOfTransactions){
      return transactions.slice(-numOfTransactions);
    }
    ,
    deposit: function(amount) {
      const deposit = {
        type:DEPOSIT,
        amount:amount,
        before:balance,
        after:balance + amount,
        status:APPROVED,
        time:new Date(),
      };
      balance += amount;
      transactions.push(deposit);
      return deposit;
    },

    averageTransaction:function() {
      const deposits = transactions.filter((transaction)=>transaction.type===DEPOSIT && transaction.status===APPROVED)
      const withdrawals = transactions.filter((transaction)=>transaction.type===WITHDRAW && transaction.status===APPROVED)
      let depositAverage;
      if (deposits.length === 0) {
        depositAverage = 0;
      } else {
        depositAverage= deposits.reduce((total,deposit) => total + deposit.amount,0) / deposits.length;
      }
      let withdrawalAverage;
      if (withdrawals.length=== 0) {
        withdrawalAverage = 0;
      } else {
        withdrawalAverage = withdrawals.reduce((total,withdrawal) => total + withdrawal.amount,0) / withdrawals.length;
      }
      return {
        deposit:depositAverage,
        withdrawal:withdrawalAverage,
      }
    },
  };
}
