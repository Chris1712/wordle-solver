// Class representing a game
import {WordService} from "../word.service";
import {Answerer} from "./answerer";
import {Game} from "../model/game";

export class MockGame {

  public game: Game = Game.newGame();

  constructor(private service: WordService, private answerer: Answerer) {}

  // Use the wordService to attempt to guess the word
  public playToFinish(): void {
    while(this.game.getTurnsTaken()<6 && !this.game.isWon()) {
      // Get a guess from the service
      let guess: string = this.service.suggestGuess(this.game)[0]
      // Get the response from the answerer
      let response: string = this.answerer.takeGuess(guess)
      // Update our game
      this.game = this.game.takeTurn(guess, response)
      console.log(`Turn ${this.game.getTurnsTaken()} completed:`)
      console.log(this.game.toString());
    }
  }

  public isWon(): boolean {
    return this.game.isWon()
  }

  public turnsTaken(): number {
    return this.game.getTurnsTaken()
  }


}
