import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BaseHeaderLink } from './base-header.component.types';

@Component({
  selector: 'app-base-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './base-header.component.html',
  styleUrls: ['./base-header.component.scss']
})
export class BaseHeaderComponent {
  @Input() title = '';
  @Input() links: BaseHeaderLink[] = [];
  @Input() icon?: string;

  @Output() linkClicked = new EventEmitter<BaseHeaderLink>();
}
