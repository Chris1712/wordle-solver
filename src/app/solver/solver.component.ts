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

  recommendedGuess: string = "";
  remainingWords: number = 0;

  constructor(private wordService: WordService) { }

  ngOnInit(): void {
    this.calcuateGuess()
  }

  inputChanges() {
    console.log("Changes detected")
    this.calcuateGuess()
  }

  // Build a game form the valid rows, and submit a guess!
  calcuateGuess() {
    let game = Game.newGame();
    for (let i = 0; i < 5; i++) {
      if (this.guessForms[i].invalid || this.answerForms[i].invalid) {
        console.log(`Gave up at row ${i}`)
        break;
      } else {
        game = game.takeTurn(this.guessForms[i].value.toString().toLowerCase(), this.answerForms[i].value.toString().toLowerCase())
      }
    }
    console.log(game.toString())
    let wordServiceResponse: [string, number] = this.wordService.suggestGuess(game);
    this.recommendedGuess = wordServiceResponse[0]
    this.remainingWords = wordServiceResponse[1]
  }

  printGuess(): string {
    if (this.recommendedGuess == "") {
      return "Guess unknown"
    }
    else {
      return "You should guess '" + this.recommendedGuess + "'";
    }
  }

  guessForms: FormControl[] = Array(5).fill(0).map(o =>
    new FormControl('',
    [Validators.required, Validators.pattern(/^[A-z]{5}$/)]
    )
  )
  answerForms: FormControl[] = Array(5).fill(0).map(o =>
    new FormControl('',
      [Validators.required, Validators.pattern(/[byg]{5}/)]
    )
  )

}
