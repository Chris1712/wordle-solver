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
    expect(fixture.nativeElement.querySelector('#guess').textContent).toEqual("You should guess 'arose'")
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
    expect(fixture.nativeElement.querySelector('#guess').textContent).toEqual("You should guess 'agile'")

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
