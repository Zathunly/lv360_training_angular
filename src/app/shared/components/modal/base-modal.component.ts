import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-base-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-modal.component.html',
  styleUrls: ['./base-modal.component.scss'],
})
export class BaseModalComponent {
  visible = false; 

  @Output() closed = new EventEmitter<void>();

  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
    this.closed.emit();
  }
}
