import { ChangeDetectionStrategy, Component, computed, HostListener, inject, viewChild, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorServiceService } from '@/calculator/servicies/calculator-service.service';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host:{
    '(document:keyup)':'handleKeyboardEvent($event)'
  },
})
export class CalculatorComponent {
  private calculatorService = inject( CalculatorServiceService);
  public calculatorButtons = viewChildren( CalculatorButtonComponent ); // obtiene todos los elementos

  public resultText = computed( ()=> this.calculatorService.resultText() );
  public subResultText = computed(()=> this.calculatorService.subResultText());
  public lastOperator = computed(() => this.calculatorService.lastOperation());
  // get resultText(){
  //   return this.calculatorService.resultText;
  // }

  handleClick( event: string){
    // console.log({ event });
    this.calculatorService.constructNumber(event);
  }

  // @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event:KeyboardEvent ){
    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      X : '*',
      '/': '÷',
      Enter: '='
    }
    const key = event.key;
    const keyValue = keyEquivalents[key] ?? key;
    this.handleClick(keyValue);
    this.calculatorButtons().forEach((button) =>{
      button.keyBoardPressedStyle(keyValue);
    })
  }

}
