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

  public static eliminateWords(initialWords: ReadonlyArray<string>, gameState: Game): ReadonlyArray<string> {
    let possibleWords: ReadonlyArray<string> = initialWords;
    // Iterate backwards through turns to get our information
    for (let i = gameState.getTurnsTaken()-1; i >= 0; i--) {
      let guessWord: string = gameState.guesses[i]
      let answerWord: string = gameState.answers[i]

      // Iterate through guess/answer this turn
      for (let pos = 0; pos < 5; pos++) {
        // TODO handle guesses with the same letter more than once!

        let guessLetter: string = guessWord.charAt(pos)
        let answerLetter: string = answerWord.charAt(pos)

        if (answerLetter == 'b') { // Black, IE this letter isn't in the word at all
          possibleWords = WordService.excludeWordsByLetter(possibleWords, guessLetter)
        } else if (answerLetter == 'y') { // Yellow, IE this letter IS in the word. But not in this position.
          possibleWords = WordService.includeWordsByLetter(possibleWords, guessLetter)
          possibleWords = WordService.excludeWordsByLetterPosition(possibleWords, guessLetter, pos)
        } else if (answerLetter == 'g') { // Green, IE this letter IS in the word at this position
          possibleWords = WordService.includeWordsByLetterPosition(possibleWords, guessLetter, pos)
        } else {
          throw new Error(`Guess ${guessWord} on turn ${i} invalid at position ${pos}`)
        }
      }
    }
    return possibleWords;
  }

  public static includeWordsByLetter(currentList: ReadonlyArray<string>, filterLetter: string): ReadonlyArray<string> {
    return currentList.filter(word => word.includes(filterLetter))
  }

  public static excludeWordsByLetter(currentList: ReadonlyArray<string>, filterLetter: string): ReadonlyArray<string> {
    return currentList.filter(word => !word.includes(filterLetter))
  }

  public static includeWordsByLetterPosition(currentList: ReadonlyArray<string>, filterLetter: string, filterPosition: number): ReadonlyArray<string> {
    return currentList.filter(word => word.charAt(filterPosition) == filterLetter)
  }

  public static excludeWordsByLetterPosition(currentList: ReadonlyArray<string>, filterLetter: string, filterPosition: number): ReadonlyArray<string> {
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
      if (WordService.includeWordsByLetter(remainingGuessable, letters[i]).length > 0) {
        remainingGuessable = WordService.includeWordsByLetter(remainingGuessable, letters[i])
      }
    }
    // Any left are equivalent by this metric
    return remainingGuessable[0]
  }

}
