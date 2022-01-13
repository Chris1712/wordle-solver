import {ComponentFixture, ComponentFixtureAutoDetect, TestBed} from '@angular/core/testing';

import { SolverComponent } from './solver.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('SolverComponent', () => {
  let component: SolverComponent;
  let fixture: ComponentFixture<SolverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ SolverComponent ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]

    })
    .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(SolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should give a default suggestion', () => {
    expect(fixture.nativeElement.querySelector('#guess').textContent).toEqual("You should guess 'arose'")
  });

  // it('should give a second suggestion', async () => {
  //   // Put in a first guess and answer
  //   const guess0: HTMLInputElement = fixture.nativeElement.querySelector('#guess-input-0')
  //   guess0.value = 'arose'
  //   guess0.dispatchEvent(new Event('input'))
  //
  //   const answer0: HTMLInputElement = fixture.nativeElement.querySelector('#answer-input-0')
  //   answer0.value = 'gbbbg'
  //   answer0.dispatchEvent(new Event('input'))
  //
  //   // console.log(`form: ${component.answerForms[0].value}`)
  //   fixture.detectChanges();
  //   // component.calcuateGuess()
  //   console.log(component.recommendedGuess)
  //   console.log(fixture.isStable())
  //
  //   fixture.whenStable().then(() => {
  //     expect(fixture.nativeElement.querySelector('#guess').textContent).toEqual("You should guess 'agile'")
  //   })
  //
  // });
});
