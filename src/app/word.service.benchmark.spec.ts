import { TestBed } from '@angular/core/testing';

import { WordService } from './word.service';
import { Answerer } from "./testUtil/answerer";
import { Game } from "./model/game";
import { MockGame } from "./testUtil/mockGame.spec";
import {DictionaryService} from "./dictionary.service";

describe('WordService benchmarks:', () => {
  let service: WordService;
  let dictionaryService: DictionaryService

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordService);
    dictionaryService = TestBed.inject(DictionaryService);
  });

  it('should guess aeros first time', () => {
    let aerosAnswerer = new Answerer('aeros')

    aerosAnswerer.takeGuess(service.suggestGuess(Game.newGame())[0])

    expect(aerosAnswerer.isSolved).toBeTrue()
  });

  it('should guess abbey in 5 tries', () => {
    let abbeyAnswerer = new Answerer('abbey')

    let game = new MockGame(service, abbeyAnswerer)
    game.playToFinish()

    expect(game.isWon()).toBeTrue()
    expect(game.turnsTaken()).toEqual(5)
  });

  // TODO enable me, and set realistic expectations :(
  xit('should obtain reasonable statistics on the top 5000 words', () => {
    const startTime: number = performance.now()
    const turnCounts: number[] = []

    dictionaryService.getTopWords(100).forEach(word => {
      let answerer = new Answerer(word)
      let game = new MockGame(service, answerer)
      game.playToFinish()

      expect(game.isWon()).withContext(`Failed on word: ${word}`).toBeTrue()
      turnCounts.push(game.turnsTaken())
    })

    const endTime: number = performance.now()

    let meanTurns = turnCounts.reduce((a, b) => a + b, 0) / turnCounts.length
    expect(meanTurns).toBeLessThan(3)
    console.log(`Test completed in ${endTime - startTime} ms`)
  });

});
