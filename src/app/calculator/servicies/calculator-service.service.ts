import { Injectable, signal } from '@angular/core';

const numbers= ['0', '1', '2', '3', '4', '5', '6','7','8','9'];
const operator = ['/', '*', '+', '-', '÷'];
const specialOperator = ['+/-', '%', '.', '=', 'C','Backspace'];
@Injectable({
  providedIn: 'root'
})
export class CalculatorServiceService {
  public  resultText = signal('0');
  public subResultText = signal('0');
  public lastOperation = signal('+');

  constructor() { }

   constructNumber(value:string):void{
       //validar el input
      if(![...numbers, ...operator, ...specialOperator].includes(value)) return;

      //=
      if( value === '='){
        // console.log('calcular resultado');
        this.calculateResult();
        return;
      }

      if(value === 'C'){
        this.resultText.set('0');
        this.subResultText.set('0');
        this.lastOperation.set('+');
        return;
      }

      if( value === 'Backspace'){
        if(this.resultText() === '0') return;

        if(this.resultText().includes('-') && this.resultText().length === 2){
            this.resultText.set('0');
        }
        if(this.resultText().length === 1){
          this.resultText.set('0');
          return;
        }

        this.resultText.update( currentValue  =>  currentValue.slice(0, -1 ));
        //!TODO: revisar cuando se tenga numeros negativos.
        return;
      }


      //Aplicar operadores
      if(operator.includes(value)){
        this.calculateResult();
        this.lastOperation.set(value);
        this.subResultText.set( this.resultText());
        this.resultText.set('0');
        return;
      }
      //Limite de caracteres

      if(this.resultText().length >= 10){
        console.log('Max length reached');
        return;
      }
      //Validar punto decimal
      if(value === '.' && !this.resultText().includes('.')){
        if(this.resultText() === '0' || this.resultText() === ''){
          this.resultText.set( '0.');
          return;
        }
        this.resultText.update(text => text + '.');
        return;
      }

      //Manejo del cero inicial
      if(value === '0' && (this.resultText() === '0' || this.resultText() === '-0' )){
        return;
      }

      //cambio de signo
      if(value === '+/-'){
        if(this.resultText().includes('-')){
          this.resultText.update( text => text.slice(1))
          return;
        }
        this.resultText.update(  text => '-' + text);
        return;
      }

      // validacion de los numeros
      if(numbers.includes(value)){
        if(this.resultText() === '0' || this.resultText() === '-0'){
            if(this.resultText().includes('-')){
              this.resultText.set('-' + value);
            }
            this.resultText.set(value);
            return;
        }
      }
      this.resultText.update( text => text + value);

   }

   calculateResult(){
      const numberSubResultText = parseFloat( this.subResultText());
      const numberResultText = parseFloat( this.resultText());

      let result = 0;

      switch(this.lastOperation()){
        case '+':
            result = numberResultText + numberSubResultText;
            break;
        case '-':
            result = numberResultText - numberSubResultText;
            break;
        case '*':
          result = numberResultText * numberSubResultText;
          break;
        case 'X':
          result = numberResultText * numberSubResultText;
          break;
        case '/':
          result = numberSubResultText /numberResultText;
          break;
        case '÷':
          result = numberSubResultText /numberResultText;
          break;

      }

      this.resultText.set(result.toString());
      this.subResultText.set('0');
   }
}
