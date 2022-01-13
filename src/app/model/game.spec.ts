import {Game} from "./game";

describe('Game', () => {

  const emptyGame: Game = Game.newGame()

  it('should create empty new games', () => {
    expect(emptyGame.getTurnsTaken()).toEqual(0)
  });

  it('should fail if the answer is not formatted correctly', () => {
    expect(() => emptyGame.takeTurn('apple', 'abcde'))
      .toThrowError("Answer includes letters other than 'b', 'y', and 'g'")
  });

  describe('isWon', () => {

    it('should return true when appropriate', () => {
      expect(
        emptyGame
          .takeTurn('apple', 'gbbbb')
          .takeTurn('avids', 'ggggg')
          .isWon()).toBeTrue()
    });

    it('should return false for an ongoing game', () => {
      expect(emptyGame.takeTurn('apple', 'bbbbb').isWon()).toBeFalse()
    });

    it('should return false for a new game', () => {
      expect(emptyGame.isWon()).toBeFalse()
    });


  });


})
