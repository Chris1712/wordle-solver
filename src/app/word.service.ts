import { Injectable } from '@angular/core';
import {DictionaryService} from "./dictionary.service";

@Injectable({
  providedIn: 'root'
})
export class WordService {

  // Stores our words in the structure 1 -> 'a' -> ['word1' 'word2']
  // Keyed by position, then letter, then a list of values
  // (ie position -> letter -> list of words)
  orderedWords: Record<number, Record<string, [string]>> = {
    0: {},
    1: {},
    2: {},
    3: {},
    4: {}
  }

  // Stores our words in the structure  'a' -> ['word1' 'word2']
  // Keyed by letter, then a list of values
  // (ie letter -> list of words)
  unorderedWords: Record<string, [string]> = {}

  constructor(private dictionaryService: DictionaryService) {
    this.orderedWords[1] = { "a": ['apple']}
    this.unorderedWords['a'] = ['apple']

    dictionaryService.getDictionary().forEach(word => {
        for (let i = 0; i < 5; i++) {
          this.orderedWords[i][word.charAt(i)].push(word)
          this.unorderedWords[word.charAt(i)].push(word)
        }
      })
  }

  // Determine letter preference (IE, which letters occur in most unique words?)

  // First time, suggest word with most frequent letters
  // Not optimal, doesn't consider optimal positions!
  // Take input like 'wwwyg' and previous word
  // Come up with a new word

  getWords(): string {
    console.log(this.orderedWords[1]["b"])
    return this.dictionaryService.getDictionary()[21950]
  }


}
