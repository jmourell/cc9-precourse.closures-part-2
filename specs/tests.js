describe("gameGenerator", () => {
  it("should be there", () => {
    expect(gameGenerator).toBeDefined();
    expect(typeof gameGenerator).toBe("function");
  });

  it("should generate some games!", () => {
    const game = gameGenerator(4);
    expect(typeof game).toBe("object");
  });

  it("should have just one winning number", () => {
    const bound = 4;
    const game = gameGenerator(bound);
    const number = [];
    for (let i = 0; i < bound; i++) {
      if (game.guess(i)) {
        number.push(i);
      }
    }
    expect(number.length).toBe(1);
  });

  it("should have a reset method", () => {
    const bound = 4;
    const game = gameGenerator(bound);
    // How do you test for this?
    expect(game.reset).toBeTruthy();
  });

 
  it("Expect game to reset number of guesses", () => {
    const bound = 4;
    const game = gameGenerator(bound);
    const number = [];
    for (let i = 0; i < bound; i++) {
      if (game.guess(i)) {
        number.push(i);
      }
    }
    expect(game.numberGuesses()!==0).toBeTruthy();
    game.reset();
    expect(game.numberGuesses()===0).toBeTruthy();
  });

  it("Expect number of guesses to equal one", () => {
    const bound = 3;
    const game = gameGenerator(bound);
    game.guess(2)
    expect(game.numberGuesses()===1).toBeTruthy();
  });

  it("Expect giveUp to return number", () => { 
    const bound = 4;
    const game = gameGenerator(bound);
    let number ;
    for (let i = 0; i < bound; i++) {
      if (game.guess(i)) {
        number = i;
      }
    }
    expect(game.giveUp()===number).toBeTruthy();
  });
});

describe("accountGenerator", () => {
  it("should be there", () => {
    expect(accountGenerator).toBeDefined();
    expect(typeof accountGenerator).toBe("function");
  });
  it("should have a get balance function ", () => {
    let account = accountGenerator(500);
    expect(account.getBalance).toBeDefined();
    expect(typeof account.getBalance).toBe("function");
    expect(account.getBalance()).toEqual(500);
  });

  it("withdrawals should return objects ", () => {
    let account = accountGenerator(1000);
    
    expect(account.withdraw(500)).toEqual({type:"withdrawal",amount:500,before:1000,after:500,status:"approved",date:new Date()});
    expect(account.withdraw(1000)).toEqual({type:"withdrawal",amount:1000,before:500,after:500,status:"denied",date:new Date()});
    expect(account.transactionHistory(1)).toEqual([{type:"withdrawal",amount:1000,before:500,after:500,status:"denied",date:new Date()}]);
  });

  it("deposits should return objects ", () => {
    let account = accountGenerator(1000);
    
    expect(account.deposit(500)).toEqual({type:"deposit",amount:500,before:1000,after:1500,status:"approved",date:new Date()});
    expect(account.deposit(1000)).toEqual({type:"deposit",amount:1000,before:1500,after:2500,status:"approved",date:new Date()});
    expect(account.transactionHistory(1)).toEqual([{type:"deposit",amount:1000,before:1500,after:2500,status:"approved",date:new Date()}]);
  });
  
  it("should average the deposits and withdrawls", () => {
    let account = accountGenerator(1000);
    expect(account.deposit(500)).toEqual({type:"deposit",amount:500,before:1000,after:1500,status:"approved",date:new Date()});
    expect(account.deposit(1000)).toEqual({type:"deposit",amount:1000,before:1500,after:2500,status:"approved",date:new Date()});
    account.withdraw(500); 
    account.withdraw(1000);
    expect(account.averageTransaction()).toEqual({deposit:750,withdrawal:750});
  });
});
