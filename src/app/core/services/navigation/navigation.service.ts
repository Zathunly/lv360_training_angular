import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private previousUrl: string | null = null;
  private currentUrl: string | null = null;

  constructor(private router: Router) {
    this.currentUrl = router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
  }

  getPreviousUrl() {
    return this.previousUrl || '/';
  }
}
