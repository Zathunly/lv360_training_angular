import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { HighlightDirective } from '../../../shared/directives/highlight.directive';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ButtonComponent, HighlightDirective, DateFormatPipe],
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent {}
