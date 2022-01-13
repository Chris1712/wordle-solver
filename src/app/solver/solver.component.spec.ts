import {ComponentFixture, ComponentFixtureAutoDetect, TestBed} from '@angular/core/testing';

import { SolverComponent } from './solver.component';
import {ReactiveFormsModule} from "@angular/forms";

describe('SolverComponent', () => {
  let component: SolverComponent;
  let fixture: ComponentFixture<SolverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ SolverComponent ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    })
    .compileComponents();
  });

  beforeEach(async() => {
    fixture = TestBed.createComponent(SolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should give a default suggestion', () => {
    expect(fixture.nativeElement.querySelector('#guess').textContent).toEqual("You should guess 'aeros'")
  });

  it('should give a second suggestion', () => {
    // Put in a first guess and answer
    const guess0: HTMLInputElement = fixture.nativeElement.querySelector('#guess-input-0')
    guess0.value = 'arose'
    guess0.dispatchEvent(new Event('input'))

    const answer0: HTMLInputElement = fixture.nativeElement.querySelector('#answer-input-0')
    answer0.value = 'gbbbg'
    answer0.dispatchEvent(new Event('input'))
    component.inputChanges() // TODO this is a hack should trigger itself
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#guess').textContent).toEqual("You should guess 'aline'")

  });

  it('should give a fourth suggestion for quake', () => {
    const guess0: HTMLInputElement = fixture.nativeElement.querySelector('#guess-input-0')
    guess0.value = 'brain'
    guess0.dispatchEvent(new Event('input'))

    const answer0: HTMLInputElement = fixture.nativeElement.querySelector('#answer-input-0')
    answer0.value = 'bbgbb'
    answer0.dispatchEvent(new Event('input'))

    const guess1: HTMLInputElement = fixture.nativeElement.querySelector('#guess-input-1')
    guess1.value = 'least'
    guess1.dispatchEvent(new Event('input'))

    const answer1: HTMLInputElement = fixture.nativeElement.querySelector('#answer-input-1')
    answer1.value = 'bygbb'
    answer1.dispatchEvent(new Event('input'))

    const guess2: HTMLInputElement = fixture.nativeElement.querySelector('#guess-input-2')
    guess2.value = 'adage'
    guess2.dispatchEvent(new Event('input'))

    const answer2: HTMLInputElement = fixture.nativeElement.querySelector('#answer-input-2')
    answer2.value = 'bbgbg'
    answer2.dispatchEvent(new Event('input'))

    component.inputChanges() // TODO this is a hack should trigger itself
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#guess').textContent).not.toEqual("You should guess 'adage'")
    // TODO spec should specify that we guess something else. I guess 'quake' ideally
  });

  it("should show some confetti when there's a 'ggggg' answer", () => {
    // Put in a first guess and answer
    const guess0: HTMLInputElement = fixture.nativeElement.querySelector('#guess-input-0')
    guess0.value = 'balds'
    guess0.dispatchEvent(new Event('input'))

    const answer0  = fixture.nativeElement.querySelector('#answer-input-0')
    answer0.value = 'ggggg'
    answer0.dispatchEvent(new Event('input'))
    component.inputChanges() // TODO this is a hack, should not be needed
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#guess').textContent).toEqual("🎊🎉🥳🎉🎊")
  });

});
