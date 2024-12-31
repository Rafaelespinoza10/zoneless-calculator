

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';
import { CalculatorServiceService } from '@/calculator/servicies/calculator-service.service';

//mock para simular el service
class MockCalculatorService{
  public resultText = jasmine.createSpy('resultText').and.returnValue('100.00'); //ALEATORIO 100.00
  public subResultText = jasmine.createSpy('subResultText').and.returnValue('0');
  public lastOperation = jasmine.createSpy('lastOperation').and.returnValue('+');
  public constructNumber = jasmine.createSpy('constructNumber');
}

describe('CalculatorComponent', () => {
  let fixture: ComponentFixture<CalculatorComponent>;
  let compiled: HTMLElement;
  let component: CalculatorComponent;
  let calculatorService: MockCalculatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers:[
        {
          provide: CalculatorServiceService, useClass: MockCalculatorService  //injection Service
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component= fixture.componentInstance;
    calculatorService = TestBed.inject(CalculatorServiceService) as unknown as MockCalculatorService; //injection service
    // fixture.autoDetectChanges();
  });


  it('should create the app', () => {
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have the current getters', ()=>{
    expect(component.resultText()).toBe('100.00');
    expect(component.subResultText()).toBe('0');
    expect(component.lastOperator()).toBe('+');
  });

  it('should display proper calculation values', ()=>{

    calculatorService.resultText.and.returnValue('123');
    calculatorService.subResultText.and.returnValue('456');
    calculatorService.lastOperation.and.returnValue('*');

    fixture.detectChanges();

    expect(compiled.querySelector('span')?.innerText).toBe('456 *');
    expect(component.resultText()).toBe('123');
    expect(component.subResultText()).toBe('456');
    expect(component.lastOperator()).toBe('*');
  });

  it('should have 19 calculator-button components',()=>{
    expect(component.calculatorButtons()).toBeTruthy();
    expect(component.calculatorButtons().length).toBe(19);
  });

  it('should have 19 calculator-button with content projection', ()=>{
    const buttons = compiled.querySelectorAll('calculator-button');
    expect(buttons.length).toBe(19);
    expect(buttons[0].textContent?.trim()).toBe('C');
    expect(buttons[1].textContent?.trim()).toBe('+/-');
    expect(buttons[2].textContent?.trim()).toBe('%');
  });

  it('should handle keyboard events currently', ()=>{
    const eventEnter = new KeyboardEvent('keyup', {key: 'Enter'});
    document.dispatchEvent( eventEnter );
    expect( calculatorService.constructNumber).toHaveBeenCalledWith('=');

    const eventESC = new KeyboardEvent('keyup', { key: 'Escape'});
    document.dispatchEvent( eventESC );
    expect(calculatorService.constructNumber).toHaveBeenCalledWith('C');
  });

  it('should display result result text correctly', ()=>{
    calculatorService.resultText.and.returnValue('123');
    calculatorService.subResultText.and.returnValue('10');
    calculatorService.lastOperation.and.returnValue('-');

    fixture.detectChanges();
    expect(component.resultText()).toBe('123');
    expect(compiled.querySelector('#sub-result')?.textContent).toContain("10 -");

  });

});



