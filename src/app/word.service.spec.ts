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


  describe('The ordered word structure', () => {

    it('should have some "a" words', () => {
      // Should be 50 words starting with a
      expect(service.orderedWords[0]['a'].length).toBeGreaterThan(50)
      expect(service.orderedWords[0]['a'].length).toBeLessThan(1000)
    })

    it('should contain apply under "a"', () => {
      expect(service.orderedWords[0]['a']).toContain("apply")
    })

    it('should NOT contain beets under "a"', () => {
      expect(service.orderedWords[0]['a']).not.toContain("beets")
    })

    it('should contain beets under "b"', () => {
      expect(service.orderedWords[0]['b']).toContain("beets")
    })

    it('should not contain duplicates', () => {
      let kwords: string[] = service.orderedWords[0]['k'];
      expect(kwords.length).toEqual((new Set(kwords)).size)
    })

    it('should have words correctly under each letter key', () => {
      // All the words keyed 'd' should have an 'd' in them!
      let badWords: string[] = service.orderedWords[4]['d'].filter(word => !word.includes('d'))
      expect(badWords.length).toEqual(0)
    })

    it('should have words correctly under each numeric key', () => {
      // All the words keyed 4 -> 'e' should have an 'e' in them, in the 4th position!

      let allWords: string[] = service.orderedWords[4]['e'];
      expect(allWords.length).toBeGreaterThan(50);

      let badWords: string[] = allWords.filter(word => word.charAt(4) != 'e')
      expect(badWords.length).toEqual(0)
    })
  })

  describe('The unordered word structure', () => {

    it('should be longer than the ordered word structure', () => {
      expect(service.unorderedWords['a'].length).toBeGreaterThan(service.orderedWords[1]['a'].length)
      expect(service.unorderedWords['a'].length).toBeGreaterThan(service.orderedWords[2]['a'].length)
      expect(service.unorderedWords['e'].length).toBeGreaterThan(service.orderedWords[1]['e'].length)
    })

    it('should have some "a" words', () => {
      expect(service.unorderedWords['a'].length).toBeGreaterThan(500)
      expect(service.unorderedWords['a'].length).toBeLessThan(5000)
    })

    it('should have words correctly under each letter key', () => {
      // All the words keyed 'f' should have an 'f' in them!
      let badWords: string[] = service.unorderedWords['f'].filter(word => !word.includes('f'))
      expect(badWords.length).toEqual(0)
    })
  })

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
