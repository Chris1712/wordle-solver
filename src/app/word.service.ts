import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor() { }

  getWords(): string {
    return "hi from wordservice!"
  }
}
