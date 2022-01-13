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
      let guess: string = service.suggestGuess(Game.newGame());
      expect(guess).toEqual("arose")
    });

    it('should suggest a second word with common letters after the first fails', () => {
      let gameOneTurn: Game = Game.newGame().takeTurn("arose", "bbbbb")

      let guess: string = service.suggestGuess(gameOneTurn);
      expect(guess).toEqual("unity") // No letters from 'arose'
    });

    it('should make use of yellow letters', () => {
      let gameOneTurn: Game = Game.newGame().takeTurn("zoool", "ybbbb")

      let guess: string = service.suggestGuess(gameOneTurn);
      expect(guess.includes('z')).toBeTrue()
      expect(guess.charAt(0)).not.toEqual('z')
    });

    it('should play a real game reasonably', () => {
      // wordle 208
      let gameAfterTurnOne: Game = Game.newGame().takeTurn("arose", "gbbby")
      expect(service.suggestGuess(gameAfterTurnOne)).toEqual('admen');

      let gameAfterTurnTwo: Game = gameAfterTurnOne.takeTurn("admen", "gbbgb")
      expect(service.suggestGuess(gameAfterTurnTwo)).toEqual('abbey');
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
