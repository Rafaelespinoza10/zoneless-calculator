import { ComponentFixture, TestBed } from '@angular/core/testing';
import CalculatorPageComponent from './calculator-page.component';

describe('CalculatorPageComponent', () => {
  let fixture: ComponentFixture<CalculatorPageComponent>;
  let compiled: HTMLElement;
  let component: CalculatorPageComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorPageComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component= fixture.componentInstance;
  });


  it('should create the app', () => {
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });


  it('should contain calculator component', ()=>{
    expect(compiled.querySelector('calculator')).not.toBeNull();
  });

  it('should contain basic css classes', ()=>{
      const divElement = compiled.querySelector('div');
      const divClasses = divElement?.classList.value.split(' ');
      const shouldHave = 'w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden'.split(' ');
      shouldHave.forEach(className => {
        expect(divClasses).toContain(className);
      });
  });

});



