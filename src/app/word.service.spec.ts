import { TestBed } from '@angular/core/testing';

import { WordService } from './word.service';
import {Game} from "./model/game";

describe('WordService', () => {
  let service: WordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('suggestGuess', () => {

    it('should suggest some word with common letters for a new game', () => {
      let guess: string = service.suggestGuess(Game.newGame())[0]
      expect(guess).toEqual("aeros")
    });

    it('should suggest a second word with common letters after the first fails', () => {
      let gameOneTurn: Game = Game.newGame().takeTurn("arose", "bbbbb")

      let guess: string = service.suggestGuess(gameOneTurn)[0]
      expect(guess).toEqual("unity") // No letters from 'arose'
    });

    it('should make use of yellow letters', () => {
      let gameOneTurn: Game = Game.newGame().takeTurn("zoool", "ybbbb")

      let guess: string = service.suggestGuess(gameOneTurn)[0]
      expect(guess.includes('z')).toBeTrue()
      expect(guess.charAt(0)).not.toEqual('z')
    });

    it('should play a real game reasonably', () => {
      // wordle 208. 'abbey' is the answer
      let gameAfterTurnOne: Game = Game.newGame().takeTurn("arose", "gbbby")
      expect(service.suggestGuess(gameAfterTurnOne)[0]).toEqual('abled')

      let gameAfterTurnTwo: Game = gameAfterTurnOne.takeTurn("abled", "ggbgb")
      expect(service.suggestGuess(gameAfterTurnTwo)[0]).toEqual('abbey')
    });

    it('should be able to guess "quake"', () => {
      let gameAfterManyGuesses: Game = Game.newGame()
        .takeTurn("aeros", "yybbb")
        .takeTurn("eland", "ybgbb")
        .takeTurn("teach", "bygbb")
        .takeTurn("agape", "bbgbg")
        .takeTurn("buaze", "bggbg")

      expect(service.suggestGuess(gameAfterManyGuesses)[0]).toEqual('quake')
    });

    it('should not guess a yellow in the same position', () => {
      let game: Game = Game.newGame()
        .takeTurn("manty", "bggyg") // This tells us the T must be in pos 0

      expect(service.suggestGuess(game)[0]).toEqual('tangy')
    });
  });

  describe('eliminateWords', () => {

    it('should handle repeated letters', () => {
      // Here the answer is quake
      let gameOneTurn: Game = Game.newGame().takeTurn("adage", "bbgbg")
      let initialWords: ReadonlyArray<string> = ["quake", "crepe", "flang"]

      let possibleWords: ReadonlyArray<string> = WordService.eliminateWords(initialWords, gameOneTurn);

      expect(possibleWords).toEqual(["quake"])
    });
  });

  describe('pickBestGuessFromList', () => {

    it('should pick a word with the most common remaining letters', () => {
      let guess: string = WordService.pickBestGuessFromList(
        ["aabcd", "aadef", "aahij", "aajih", 'aajhz'])

      // Here aahij and aajih have the same letters, so we should prefer to guess those
      expect(["aajih", 'aahij']).toContain(guess)
    });
  });


});
