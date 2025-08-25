import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./layout/shared/navbar-component/navbar-component";
import { filter } from 'rxjs';
import { hiddenRoutes } from './constants/data';
import { LocalStorageService } from './services/local-storage-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class App {
  protected readonly title = signal('admin'); showNavbar: boolean = false;
  constructor(private router: Router,private localStorageService:LocalStorageService) { }
  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const isLoggedIn = this.localStorageService?.isUserLoggedIn(); 
        const hiddenRoute = hiddenRoutes
        this.showNavbar = isLoggedIn && hiddenRoute && !hiddenRoute.includes(event.urlAfterRedirects); 
        if(!isLoggedIn)
          this.router.navigate['/login']
      });
  }
}
