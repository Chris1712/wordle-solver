import { Component, OnInit } from '@angular/core';
import {WordService} from "../word.service";

@Component({
  selector: 'app-solver',
  templateUrl: './solver.component.html',
  styleUrls: ['./solver.component.css'],
  providers: [ WordService ]
})
export class SolverComponent implements OnInit {

  constructor(private wordService: WordService) { }

  ngOnInit(): void {
  }

  getWords(): string {
    return "";
  }
}
