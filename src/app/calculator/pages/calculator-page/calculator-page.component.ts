import { CalculatorComponent } from './../../components/calculator/calculator.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'calculator-page',
  standalone: true,
  imports: [CalculatorComponent],
  templateUrl: './calculator-page.component.html',
  styleUrl: './calculator-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CalculatorPageComponent {

}
