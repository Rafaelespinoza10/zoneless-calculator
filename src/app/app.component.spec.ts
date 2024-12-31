import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent!!!!', () => {
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
  });


  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it("should be 3", ()=>{
  //   //A = Arrange
  //   const number1 = 1;
  //   const number2 = 4;

  //   //A = Act
  //   const result = number1 + number2;


  //   //A = Assert
  //   expect(result).toBe(3);
  // });

  it(`should have the 'zoneless-calculator' title`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('zoneless-calculator');
  });

  it('should render router-outlet', ()=>{
    expect( compiled.querySelector('router-outlet')).not.toBeNull();
  });

  it('should render router-outlet wrapped with css classes', ()=>{
    const divElement = compiled.querySelector('div');
    const cssClasses = 'min-w-screen min-h-screen flex items-center justify-center px-5 py-5'.split(' ');
    expect(divElement).not.toBeNull();
    const divClasses = divElement?.classList.value.split(' ');
    divElement?.classList.forEach( className => {
      expect(divClasses).toContain(className);
    });
  });

  it('should contain the buy me a beer link and contains href', ()=>{
    const anchorElement = compiled.querySelector('a');
    const title = anchorElement?.title;
    const href = anchorElement?.getAttribute('href');
    expect(title).not.toBeNull();
    expect(href).not.toBeNull();
    expect(title).toContain('Buy me a beer');
    expect(href).toContain('https://www.buymeacoffe.com/scottwindon');
  });


});
