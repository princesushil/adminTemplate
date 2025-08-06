import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./layout/shared/navbar-component/navbar-component";
import { filter } from 'rxjs';
import { hiddenRoutes } from './constants/data';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('admin'); showNavbar: boolean = false;
  constructor(private router: Router) { }
  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const hiddenRoute = hiddenRoutes 
        this.showNavbar = !hiddenRoute.includes(event.urlAfterRedirects);
      });
  }
}
