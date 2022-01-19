// Generates answer strings like 'bbygg' for a guess. Used for benchmarking our guess performance
export class Answerer {

  private readonly solution: string
  public guesses: number
  public isSolved: boolean = false

  constructor(solution: string) {
    this.solution = solution
    this.guesses = 0
  }

  public takeGuess(guessWord: string): string {
    if (guessWord.length != this.solution.length) {
      throw new Error("Guess is incorrect length")
    }
    if (this.isSolved) {
      throw new Error("Answer already foun")
    }
    this.guesses++

    // Build map from letter -> [positions]
    let guessMap: Map<string, number[]> = new Map()

    for (let i = 0; i < guessWord.length; i++) {
      let guessLetter: string = guessWord.charAt(i)
      if (guessMap.get(guessLetter) == undefined) {
        guessMap.set(guessLetter, [i])
      } else {
        guessMap.get(guessLetter)!.push(i)
      }
    }

    let solutionList: string[] = this.solution.split('')

    // Now for each letter guessed, find g's then y's, then the rest are b's
    // We keep track by removing letters from the solutionList after we use them
    // And by cloning and paring down the guessed positions
    let response: string[] = ["b", "b", "b", "b", "b"]
    for (let [guessLetter, positionsRef] of guessMap) {
      let positions: number[] = positionsRef.slice() // make a clone we can modify
      while (solutionList.includes(guessLetter) && positions.length > 0) {
        if(positions.some(p => solutionList[p] == guessLetter)) {
          // Exact match
          positions
            .filter(p => solutionList[p] == guessLetter)
            .forEach(p => {
              response[p] = 'g'
              solutionList[p] = ''
            })
          positions = positions.filter(p => solutionList[p] != guessLetter)
          continue
        }
        // solutionsList includes letter, but no exact matches. So set first guessed position as yellow, and remove from solutionList
        response[positions[0]] = 'y'
        solutionList[solutionList.findIndex(l => l == guessLetter)] = ''
        positions.shift()
      }
    }

    if (response.every(l => l == 'g')) {
      this.isSolved = true
    }

    return response.join('')
  }

}
