import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  stats = [
    { title: 'Total Products', value: 128 },
    { title: 'Orders Today', value: 42 },
    { title: 'Revenue', value: '$12,540' },
    { title: 'Low Stocks', value: 8 },
  ];
}
