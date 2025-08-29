import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/shared/navbar-component/navbar-component';
import { filter, Subject, takeUntil } from 'rxjs';
import { hiddenRoutes } from './constants/data';
import { LocalStorageService } from './services/local-storage-service';
import { CommonService } from './services/common-service';
import { AppStateService } from './cores/services/app-state-service';
import { MenuService } from './cores/services/menu-service';

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
    private _commonService: CommonService,
   private menuService: MenuService
  ) {}

  ngOnInit(): void { 
 
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;
        var isLoggedIn = this.localStorageService?.isUserLoggedIn();  
        this.showNavbar =
          isLoggedIn &&
          hiddenRoutes &&
          !hiddenRoutes.includes(url);  
      }); 
  }  
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
