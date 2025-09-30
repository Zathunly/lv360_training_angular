import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `<button [ngClass]="type">{{ label }}</button>`,
})
export class ButtonComponent {
  @Input() label = '';
  @Input() type = '';
}
