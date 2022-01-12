import { Injectable } from '@angular/core';
import {DictionaryService} from "./dictionary.service";

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor(private dictionaryService: DictionaryService) { }

  // Determine letter preference (IE, which letters occur in most unique words?)

  // First time, suggest word with most frequent letters
  // Not optimal, doesn't consider optimal positions!
  // Take input like 'wwwyg' and previous word
  // Come up with a new word

  getWords(): string {
    return this.dictionaryService.getDictionary()[21950]
  }


}
