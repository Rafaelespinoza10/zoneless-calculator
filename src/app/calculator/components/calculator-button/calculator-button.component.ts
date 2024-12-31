import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, input, OnInit, output, signal, viewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host:{
    class: ' border-r border-b border-indigo-400',
    //bind to signal (alternative HostBinding)
    '[class.isDoubleSize]' : 'isDoubleSize()',   // esto es para una signal alternativa a HostBinding
    '[class.w-2/4]' : 'isDoubleSize()',          // se aplica el estilo cuando la signal es true.
    '[class.w-1/4]' : '!isDoubleSize()'
  },
  // encapsulation: ViewEncapsulation.None,
})
export class CalculatorButtonComponent implements OnInit {
  public isPressed = signal(false);
  public onClick = output<string>();
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  public isCommand = input( false,{
    transform: ( value: boolean | string ) =>
      typeof value === 'string' ? value === '' : value
  });  // recibir el input

  public isDoubleSize = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value
  })

  // @HostBinding('class.w-2/4') get commandStyle(){
  //   return this.isDoubleSize();
  // }

  ngOnInit(): void {
    console.log(this.isCommand());
  }

  handleClick(){
    if(!this.contentValue()!.nativeElement) return;

    const key = this.contentValue()!.nativeElement.innerText;
     this.onClick.emit(key.trim());
  }

  keyBoardPressedStyle(key:string){
    if( !this.contentValue()) return;
    const value = this.contentValue()?.nativeElement.innerText;
    // si el value es igual al key presionado
    if( value !== key) return;
    this.isPressed.set(true);

    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);

  }

}
