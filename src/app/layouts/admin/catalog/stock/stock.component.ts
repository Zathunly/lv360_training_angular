import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent {
//   constructor(private router: Router, private route: ActivatedRoute) {
//     this.router.events
//       .pipe(filter(event => event instanceof NavigationEnd))
//       .subscribe((event: NavigationEnd) => {
//         this.showAddButton = !event.urlAfterRedirects.endsWith('/add');
//       });
//   }
}