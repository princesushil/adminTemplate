import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/shared/navbar-component/navbar-component';
import { filter, Subject, takeUntil } from 'rxjs';
import { hiddenRoutes } from './constants/data';
import { LocalStorageService } from './services/local-storage-service'; 
import moment from 'moment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class App implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  protected readonly title = signal('admin');

  showNavbar = false;
  menuList: any = null;
  isMenuLoaded = false;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService, 
  ) { }

  ngOnInit(): void {
    const loggedInAt = localStorage.getItem('loggedInAtMoment'); 
    const loginTime = moment(loggedInAt, "HH:mm:ss");
    const now = moment();
    const diffInHours = now.diff(loginTime, 'hours');

    if (diffInHours >= 2) { 
      localStorage.removeItem('p-token');
      localStorage.removeItem('loggedInAtMoment');
      this.router.navigate(['/login']);
    }
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;
        var isLoggedIn = this.localStorageService?.isUserLoggedIn();
        this.showNavbar = isLoggedIn && hiddenRoutes && !hiddenRoutes.includes(url);
      });
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
