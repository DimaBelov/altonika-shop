import { Directive, ViewContainerRef,  ElementRef, Input } from '@angular/core';
import { AsyncCommand } from '@lib/async-command';

@Directive({ 
    selector: '[appWaitSpinner]'
})
export class WaitSpinnerDirective {
    // constructor(
    //     viewContainerRef: ViewContainerRef
    // ) {
    //     console.log('WaitSpinnerDirective constructor');
    //     console.log('viewContainerRef');
    //     console.log(viewContainerRef);
    //     viewContainerRef.element.nativeElement.innerHTML = 
    //         '<div class="spinner-container">' +
    //             '<mat-progress-spinner ' +
    //                 'class="spinner" ' +
    //                 'color="primary" ' +
    //                 '[mode]="refreshCommand.isBusy ? \'indeterminate\' : \'determinate\'" ' +
    //                 '*ngIf="refreshCommand.isBusy">' +
    //             '</mat-progress-spinner>' +
    //         '</div>';
    // }

    @Input() command: AsyncCommand<any>;

    constructor (private el: ElementRef) {
        
    }

    ngOnInit() {
        console.log('WaitSpinnerDirective constructor');
        console.log('el');
        console.log(this.el);
        console.log('command');
        console.log(this.command);

        this.el.nativeElement.innerHTML = 
                '<div class="spinner-container">' +
                    '<mat-progress-spinner ' +
                        'class="spinner" ' +
                        'color="primary" ' +
                        // '[mode]="command.isBusy ? \'indeterminate\' : \'determinate\'" ' +
                        'mode="indeterminate" '  +
                        '*ngIf="command.isBusy">' +
                    '</mat-progress-spinner>' +
                '</div>';
    }
}



/*

// Extend the base HTMLElement class
// in es5 you would instread do Object.create(HTMLElement)
class AppLogo extends HTMLElement {
  // define our private properties and types
  // this will be our private value that we store
  // typescript lets us predefine what type we are going to store here
  private _src: string = '';
  
  // define our property getter
  // this sinmply returns our private value
  get src() {
    return this._src;
  }
  
  // define our property setter
  // this is how we tell our element to render when it receives new data
  // this will trigger a rerender when something changes
  set src(val) {
    if(this._src !== value) {
      this._src = value;
      this.render();
    }
  }
  
  // when make use of the contructor be sure to call super!
  constructor() {
    super();
    
    // fire our custom event when the image is clicked.
    this.addEventListener('click', e => {
      // create our event object
      const eventObj = new CustomEvent('logoClicked');
      
      if(e.currentTarget.tagName === 'IMG') {
        this.dispatchEvent(eventObj);
      }
    })
  }
  
  // render our component to the DOM
  // render and renderString are where we could be clever
  // but for now we are just going to write the string to innerHTML
  render() {
    this.innerHTML = this.renderString();  
  }
  
  // just returns a string;
  renderString() {
    return `
      <div>
        Our Logo Text
        <img src="${this.src}" >
      </div>
    `;
  }
}

// Register our element with the custom elements API
window.customElements.define('app-logo', AppLogo);

*/
