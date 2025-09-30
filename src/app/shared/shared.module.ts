import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { HighlightDirective } from './directives/highlight.directive';
import { DateFormatPipe } from './pipes/date-format.pipe';

@NgModule({
  declarations: [ButtonComponent, HighlightDirective, DateFormatPipe],
  imports: [CommonModule],
  exports: [ButtonComponent, HighlightDirective, DateFormatPipe, CommonModule]
})
export class SharedModule {}
