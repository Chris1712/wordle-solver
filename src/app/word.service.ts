import { Injectable } from '@angular/core';
import {DictionaryService} from "./dictionary.service";
import {Game} from "./model/game";

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor(private dictionaryService: DictionaryService) {}

  // Find the best guess, given the current game state
  public suggestGuess(gameState: Game): [string, number] {
    let initialWords: ReadonlyArray<string> = this.dictionaryService.getDictionary();
    let possibleWords = WordService.eliminateWords(initialWords, gameState)

    // Determine the best guess from this list of possible words
    return [WordService.pickBestGuessFromList(possibleWords), possibleWords.length]
  }

  // Determine which possible words could be the solution, given our guesses and answers so far
  public static eliminateWords(initialWords: ReadonlyArray<string>, gameState: Game): ReadonlyArray<string> {
    let possibleWords: ReadonlyArray<string> = initialWords;
    // Iterate backwards through turns to get our information.
    // Going backwards for efficiency since later guesses likely have more information
    for (let i = gameState.getTurnsTaken()-1; i >= 0; i--) {
      let guessWord: string = gameState.guesses[i]
      let answerWord: string = gameState.answers[i]

      let guessMap: Map<string, Map<number, string>> = new Map() // letter -> position -> outcome

      // Iterate through guess/answer this turn to build structure of values
      for (let pos = 0; pos < 5; pos++) {
        let guessLetter: string = guessWord.charAt(pos)
        let answerLetter: string = answerWord.charAt(pos)

        if (guessMap.get(guessLetter) == undefined) {
          guessMap.set(guessLetter, new Map())
        }
        // @ts-ignore
        guessMap.get(guessLetter).set(pos, answerLetter)
      }

      // Use response structure to filter out possible words
      for (let [guessLetter, answerMap] of guessMap) {

        let bCount: number = Array.from(answerMap.values()).filter(s => s == 'b').length
        let yCount: number = Array.from(answerMap.values()).filter(s => s == 'y').length
        let gCount: number = Array.from(answerMap.values()).filter(s => s == 'g').length

        if (bCount > 0) {
          // If we have blacks and non-blacks for the same letter, we know the solution must have EXACTLY count(non-blacks) of the letter
          possibleWords = WordService.onlyWordsWithLetterExactlyTimes(possibleWords, guessLetter, yCount + gCount)
        } else {
          // All we know is that we must have the letter at least as many times as we guessed it
          possibleWords = WordService.onlyWordsWithLetterAtLeastTimes(possibleWords, guessLetter, yCount + gCount)
        }

        for (let [pos, answer] of answerMap) {
          if (answer == 'g') {
            possibleWords = WordService.onlyWordsWithLetterInPosition(possibleWords, guessLetter, pos)
          }
          if (answer == 't') {
            possibleWords = WordService.onlyWordsWithoutLetterInPosition(possibleWords, guessLetter, pos)
          }
        }
      }
    }
    return possibleWords;
  }

  public static onlyWordsWithLetterAtLeastTimes(currentList: ReadonlyArray<string>, filterLetter: string, minCount: number): ReadonlyArray<string> {
    return currentList.filter(word => (word.split(filterLetter).length-1) >= minCount)
  }

  public static onlyWordsWithLetterExactlyTimes(currentList: ReadonlyArray<string>, filterLetter: string, count: number): ReadonlyArray<string> {
    return currentList.filter(word => (word.split(filterLetter).length-1) == count)
  }

  public static onlyWordsWithoutLetter(currentList: ReadonlyArray<string>, filterLetter: string): ReadonlyArray<string> {
    return currentList.filter(word => !word.includes(filterLetter))
  }

  public static onlyWordsWithLetterInPosition(currentList: ReadonlyArray<string>, filterLetter: string, filterPosition: number): ReadonlyArray<string> {
    return currentList.filter(word => word.charAt(filterPosition) == filterLetter)
  }

  public static onlyWordsWithoutLetterInPosition(currentList: ReadonlyArray<string>, filterLetter: string, filterPosition: number): ReadonlyArray<string> {
    return currentList.filter(word => word.charAt(filterPosition) != filterLetter)
  }

  // Chooses a word to guess from the remaining possible words
  // We do this by preferring words using letters most frequently occurring in the remaining possible words
  // TODO this isn't optimal, we're not always going to get the most information from our guess by doing this
  // TODO if we're not in hard mode, we don't even have to guess a word that is in the remaining set of possible words! We want to get max information
  public static pickBestGuessFromList(possibleWords: ReadonlyArray<string>): string {
    if (possibleWords.length == 0) {
      throw new Error(`No guesses available`)
    }

    let letterFrequencies: Map<string, number> = new Map()
    possibleWords.forEach((word => {
      for (let i = 0; i < 5; i++) {
        // TODO is it ok to give 2 score to EG o for looks? That makes o better, right?
        let letter: string = word.charAt(i);
        letterFrequencies.set(letter, 1 + (letterFrequencies.get(letter) ?? 0))
      }
    }))

    let letters: string[] = [...letterFrequencies.keys()]
      .sort((a, b) => (letterFrequencies.get(b) ?? 0) - (letterFrequencies.get(a) ?? 0))

    let remainingGuessable: ReadonlyArray<string> = Array.from(possibleWords);
    // Iterate through the letters, paring down our guessable list
    for (let i = 0; i < letters.length; i++) {
      if (WordService.onlyWordsWithLetterAtLeastTimes(remainingGuessable, letters[i], 1).length > 0) {
        remainingGuessable = WordService.onlyWordsWithLetterAtLeastTimes(remainingGuessable, letters[i], 1)
      }
    }
    // Any left are equivalent by this metric
    return remainingGuessable[0]
  }

}
