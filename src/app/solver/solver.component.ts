import {Component, OnInit } from '@angular/core';
import {WordService} from "../word.service";
import {FormControl, Validators} from "@angular/forms";
import {Game} from "../model/game";

@Component({
  selector: 'app-solver',
  templateUrl: './solver.component.html',
  styleUrls: ['./solver.component.css'],
  providers: [ WordService ]
})
export class SolverComponent implements OnInit {

  recommendedGuessText: string = "";

  remainingWords: number = 0;

  constructor(private wordService: WordService) { }

  ngOnInit(): void {
    this.calcuateGuess()
  }

  inputChanges() {
    console.log("Changes detected")
    this.calcuateGuess()
  }

  // Build a game from the valid rows, and submit a guess!
  calcuateGuess() {
    let game = Game.newGame();
    for (let i = 0; i < 6; i++) {
      if (this.guessForms[i].invalid || this.answerForms[i].invalid) {
        console.log(`Gave up at row ${i}`)
        break;
      } else {
        game = game.takeTurn(this.guessForms[i].value.toString().toLowerCase(), this.answerForms[i].value.toString().toLowerCase())
      }
    }
    console.log(game.toString())
    if (game.isWon()) {
      this.recommendedGuessText = "🎊🎉🥳🎉🎊"
      this.remainingWords = 0;
    } else {
      let wordServiceResponse: [string, number] = this.wordService.suggestGuess(game);
      this.remainingWords = wordServiceResponse[1]
      this.recommendedGuessText = SolverComponent.printGuess(wordServiceResponse[0])
    }
  }


  static printGuess(guess: string): string {
    if (guess == "") {
      return "Guess unknown"
    }
    else {
      return "You should guess '" + guess + "'";
    }
  }

  guessForms: FormControl[] = Array(6).fill(0).map(o =>
    new FormControl('',
    [Validators.required, Validators.pattern(/^[A-z]{5}$/)]
    )
  )
  answerForms: FormControl[] = Array(6).fill(0).map(o =>
    new FormControl('',
      [Validators.required, Validators.pattern(/[byg]{5}/)]
    )
  )

}
