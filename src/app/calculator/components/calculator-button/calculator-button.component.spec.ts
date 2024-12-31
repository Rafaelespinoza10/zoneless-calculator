

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorButtonComponent } from './calculator-button.component';
import { Component } from '@angular/core';


//OBTENER EL CONTENIDO PROYECTADO
@Component({
  standalone: true,
  imports: [CalculatorButtonComponent],
  template:
  `
    <calculator-button>
      <span class="projected-content underline"> Test content </span>
    </calculator-button>
  `
})
class TestHostComponent{}

describe('CalculatorButtonComponent', () => {
  let fixture: ComponentFixture<CalculatorButtonComponent>;
  let compiled: HTMLElement;
  let component: CalculatorButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorButtonComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component= fixture.componentInstance;

    fixture.autoDetectChanges();
  });


  it('should create the app', () => {
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });


  it('should apply w-1/4 doubleSize w-2/4 is false', ()=>{
    const cssHostClasses:string[] = compiled.classList.value.split(' ');
    expect( cssHostClasses).toContain('w-1/4');
    expect( component.isDoubleSize()).toBeFalsy();
  });

  it('should apply w-2/4  doubleSize is true', ()=>{
    fixture.componentRef.setInput('isDoubleSize', true);

    //espera cambios
    fixture.autoDetectChanges();
    const cssHostClasses:string[] = compiled.classList.value.split(' ');
    expect( cssHostClasses).toContain('w-2/4');
    expect( component.isDoubleSize()).toBeTruthy();
  });

  it('should emit onClick when handleClick is called', ()=>{
    //Espias esta al pendiente de algun suceso
    spyOn( component.onClick, 'emit');

    component.handleClick();

    expect(component.onClick.emit).toHaveBeenCalled();
  });

  it('should set isPressed to true and then false when keyboardPressesStyle is called with a matching key', ( done )=>{

    component.contentValue()!.nativeElement.innerText = '1';
    component.keyBoardPressedStyle('1');

    expect(component.isPressed()).toBeTruthy();

    // DESPUES DE ESTO AHORA TIENE QUE CAMBIAR A FALSE
    setTimeout(() => {
      expect(component.isPressed()).toBeFalsy();
      done();
    }, 101);

  });


  it('should not set isPressed to true if key is not matching',  ()=>{

    component.contentValue()!.nativeElement.innerText = '1';
    component.keyBoardPressedStyle('2');

    expect(component.isPressed()).toBeFalsy();
  });

  it('should display projected content', ()=>{
       const testHostFixture = TestBed.createComponent(TestHostComponent);
       const compiled = testHostFixture.nativeElement as HTMLDivElement;
       const projectedContent = compiled.querySelector('.projected-content');
      expect(projectedContent).not.toBeNull();
      expect(projectedContent?.classList.contains('underline')).toBeTruthy();
  });
});



