// Represents the state of a game - the guesses and answers so far
export class Game {

  readonly guesses: string[]
  readonly answers: string[]

  private constructor(guesses: string[], answers: string[]) {
    this.guesses = guesses
    this.answers = answers
  }

  public takeTurn(guess: string, answer: string): Game {
    if (guess.length != 5) {
      throw new Error("Guess isn't 5 letters!")
    }
    if (answer.length != 5) {
      throw new Error("Answer isn't 5 letters!")
    }
    if (!answer.match(/[byg]{5}/i)) {
      throw new Error("Answer includes letters other than 'b', 'y', and 'g'")
    }


    let newGuesses = this.guesses.concat(guess.toLowerCase())
    let newAnswers = this.answers.concat(answer.toLowerCase())
    return new Game(newGuesses, newAnswers);
  }

  public static newGame(): Game {
    return new Game([], [])
  }

  public getTurnsTaken(): number {
    return this.guesses.length
  }

  public isWon(): boolean {
    return this.answers.map(a => a == 'ggggg').reduce((acc, next) => acc || next, false)
  }

  public toString(): string {
    let out: string = "Game status:\n"
    if (this.getTurnsTaken() == 0) {
      out += "No turns taken\n"
    }
    for (let i = 0; i < this.getTurnsTaken(); i++) {
      out += `Turn ${1+i}: guess: ${this.guesses[i]}, answer: ${this.answers[i]}\n`
    }
    return out
  }

}
