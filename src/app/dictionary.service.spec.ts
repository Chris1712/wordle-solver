import { TestBed } from '@angular/core/testing';

import { DictionaryService } from './dictionary.service';

describe('DictionaryService', () => {
  let service: DictionaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DictionaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should hold 12972 words', () => {
    expect(service.getDictionary().length).toEqual(12972);
  });

  it('should have 8092 words with a score greater than 0', () => {
    let valuedWords: number = [...service.getWordFreqs().entries()].filter(e => e[1] > 0).length

    expect(valuedWords).toEqual(8092)
  });

  it('should have 6258 words with a score greater than 50000', () => {
    // Print out the words ordered by score (each 100th)
    let words: string[] = [...service.getWordFreqs().entries()]
      .sort( (e1, e2) => e2[1] - e1[1])
      .map(e => `${e[0]}: ${e[1]}`)

    for (let i = 0; i < words.length; i+=100) {
      console.log(words[i])
    }

    // The actual test
    let valuedWords: number = [...service.getWordFreqs().entries()].filter(e => e[1] > 50000).length

    expect(valuedWords).toEqual(6258)
  });

  it('should return top n words correctly', () => {
    let topWords: string[] = service.getTopWords(50);

    expect(topWords.length).toEqual(50)
    expect(topWords[0]).toEqual("about")
    expect(topWords[49]).toEqual("while")
  });

});
