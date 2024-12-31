import { TestBed } from "@angular/core/testing";
import { CalculatorServiceService } from "./calculator-service.service";

describe('CalculatorService',()=>{
  let service: CalculatorServiceService;

  beforeEach(()=> {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorServiceService);
  });

  beforeAll(()=>{}); // antes de todas las pruebas
  afterEach(()=>{});// despues de cada prueba
  afterAll(()=>{});  // despues de todas las pruebas


  // Primera prueba
  it('should be created', ()=>{
    expect(service).toBeTruthy();
  });

  it('should be create with default values', ()=>{
    expect( service.resultText()).toBe('0');
    expect( service.subResultText()).toBe('0');
    expect( service.lastOperation()).toBe('+');
  });

  it('should set resultText, subResultText  to "0"  when C is Pressed',()=>{
    service.resultText.set('1234');
    service.resultText.set('456');
    service.resultText.set('*');

    service.constructNumber('C');

    expect( service.resultText()).toBe('0');
    expect( service.subResultText()).toBe('0');
    expect( service.lastOperation()).toBe('+');
  });

  it('should update resultText with number input',() =>{

    service.constructNumber('1');
    expect( service.resultText()).toBe('1');

    service.constructNumber('2');
    expect( service.resultText()).toBe('12');
  });

  it('should handle operators correctly', () => {
    service.constructNumber('1');
    service.constructNumber('-');

    expect( service.lastOperation()).toBe('-');
    expect( service.subResultText()).toBe('1');
    expect( service.resultText()).toBe('0');
  });

  it('should calculate result correctly for addition', () => {
    service.constructNumber('1');
    service.constructNumber('+');
    service.constructNumber('2');
    service.constructNumber('=');
    expect(service.resultText()).toBe('3');
  });

  it('should calculate result correctly for subtraction', () => {
    service.constructNumber('5');
    service.constructNumber('-');
    service.constructNumber('0');
    service.constructNumber('=');
    expect(service.resultText()).toBe('-5');
  });

  it('should calculate result correctly for multiplication', () => {
    service.constructNumber('8');
    service.constructNumber('*');
    service.constructNumber('9');
    service.constructNumber('=');
    expect(service.resultText()).toBe('72');
  });


  it('should calculate result correctly for division', ()=>{
    service.constructNumber('8');
    service.constructNumber('/');
    service.constructNumber('2');
    service.constructNumber('=');
    expect(service.resultText()).toBe('4');
  });

  it('should handle decimal point correctly', ()=>{
    service.constructNumber('1');
    service.constructNumber('.');
    service.constructNumber('5');
    expect(service.resultText()).toBe('1.5');
  });

  it('should handle decimal point correctly starting with 0', ()=>{
    service.constructNumber('0');
    service.constructNumber('.');
    service.constructNumber('0');
    expect(service.resultText()).toBe('0.0');
  });

  it('should handle sign change correctly', ()=>{
    service.constructNumber('1');
    service.constructNumber('+/-');
    expect(service.resultText()).toBe('-1');
    service.constructNumber('+/-');
    expect(service.resultText()).toBe('1');
  });

  it('should handle backspace correctly', ()=>{
    service.resultText.set('123');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('12');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('1');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('0');
  });

  it('should handle max lenght 10 correctly', ()=>{
    for(let i = 0; i < 10; i++){
      service.constructNumber('1');
    }

    expect(service.resultText().length).toBe(10);
    service.constructNumber('1');
    expect(service.resultText().length).toBe(10);

  });
});

