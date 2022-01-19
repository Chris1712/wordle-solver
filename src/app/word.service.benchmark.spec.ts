import { TestBed } from '@angular/core/testing';

import { WordService } from './word.service';
import {Answerer} from "./testUtil/answerer";
import {Game} from "./model/game";
import {MockGame} from "./testUtil/mockGame.spec";

describe('WordService benchmarks:', () => {
  let service: WordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordService);
  });

  it('should guess aeros first time', () => {
    let aerosAnswerer = new Answerer('aeros')

    aerosAnswerer.takeGuess(service.suggestGuess(Game.newGame())[0])

    expect(aerosAnswerer.isSolved).toBeTrue()
  });

  it('should guess aeros first time', () => {
    let aerosAnswerer = new Answerer('aeros')

    let game = new MockGame(service, aerosAnswerer)
    game.playToFinish();

    expect(game.isWon()).toBeTrue()
    expect(game.turnsTaken()).toEqual(1)
  });

  it('should guess aeros first time', () => {
    let aerosAnswerer = new Answerer('aeros')

    let game = new MockGame(service, aerosAnswerer)
    game.playToFinish();

    expect(game.isWon()).toBeTrue()
    expect(game.turnsTaken()).toEqual(1)
  });

  // TODO fixme
  xit('should guess abbey in 3 tries', () => {
    let abbeyAnswerer = new Answerer('abbey')

    let game = new MockGame(service, abbeyAnswerer)
    game.playToFinish();

    expect(game.isWon()).toBeTrue()
    expect(game.turnsTaken()).toEqual(3)
  });

  // TODO play the entire dictionary and compute some stats

});
