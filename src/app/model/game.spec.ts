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

})
