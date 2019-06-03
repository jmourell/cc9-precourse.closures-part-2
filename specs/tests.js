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
    game.reset();
    expect(game.numGuesses()===0).toBeTruthy();
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
    expect(game.numGuesses()!==0).toBeTruthy();
    game.reset();
    expect(game.numGuesses()===0).toBeTruthy();
  });
  it("Expect number of guesses to equal one", () => {
    const bound = 3;
    const game = gameGenerator(bound);
    game.guess(2)
    expect(game.numGuesses()===1).toBeTruthy();
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
  

  it("should have some tests", () => {
    expect(false).toBeTruthy();
  });
});
