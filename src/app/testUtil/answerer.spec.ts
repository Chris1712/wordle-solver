import {Answerer} from "./answerer";

describe('Game', () => {

  it('should answer a bad guess with bbbbb', () => {
    let guessAnswerer = new Answerer("guess")

    expect(guessAnswerer.takeGuess("aaaaa")).toEqual("bbbbb")
  });

  it('should answer correct guesses with ggggg', () => {
    let guessAnswerer = new Answerer("guess")

    expect(guessAnswerer.takeGuess("guess")).toEqual("ggggg")
  });

  it('should answer badly ordered guesses with yyyyy', () => {
    let guessAnswerer = new Answerer("guess")

    expect(guessAnswerer.takeGuess("ssueg")).toEqual("yyyyy")
  });

  it('should correctly mix yellow and green letters', () => {
    let guessAnswerer = new Answerer("guess")

    expect(guessAnswerer.takeGuess("geuss")).toEqual("gyygg")
  });

  it('should correctly cope with single letters guessed when the solution has two', () => {
    let guessAnswerer = new Answerer("guess")

    expect(guessAnswerer.takeGuess("saaaa")).toEqual("ybbbb")
  });

  describe('when evaluating guesses with repeated letters', () => {

    it('should correctly cope with triple letters guessed when the solution has one', () => {
      let guessAnswerer = new Answerer("guess")

      expect(guessAnswerer.takeGuess("aaggg")).toEqual("bbybb")
    });

    it('should correctly cope with triple letters guessed in the correct position when the solution has two', () => {
      let guessAnswerer = new Answerer("guess")

      expect(guessAnswerer.takeGuess("aasss")).toEqual("bbbgg")
    });

    it('should correctly cope with double letters guessed partly in the correct position when the solution has two', () => {
      let guessAnswerer = new Answerer("guess")

      expect(guessAnswerer.takeGuess("aassa")).toEqual("bbygb")
    });

    it('should correctly cope with triple letters guessed fully in the correct position when the solution has two', () => {
      let guessAnswerer = new Answerer("guess")

      expect(guessAnswerer.takeGuess("aasss")).toEqual("bbbgg")
    });
  });

})
