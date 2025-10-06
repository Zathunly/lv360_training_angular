import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  massEditMode = false;
  showAddButton = true;


  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showAddButton = !event.urlAfterRedirects.endsWith('/add');
      });
  }
}