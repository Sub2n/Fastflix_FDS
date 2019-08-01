import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from '@angular/router';
import { fadeAnimation } from './animations/fadeinout.animation';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  animations: [fadeAnimation],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  showHeader: boolean;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isHeaderNeed();
  }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  isHeaderNeed() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        // Home, Movie, MyList, Search일 때만 header 필요
        if (
          this.router.url.slice(0, 7) === '/search' ||
          this.router.url === '/home' ||
          this.router.url === '/movie' ||
          this.router.url === '/mylist'
        )
          this.showHeader = true;
        else this.showHeader = false;
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator
        // Present error to user
      }
    });
  }

  reload() {}

  ngOnDestroy() {
    this.authService.logout();
  }
}
