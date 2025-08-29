import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { menuList } from '../../constants/data';
import { LocalStorageService } from '../../services/local-storage-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private loalstorageServie: LocalStorageService) { }

  private getAllRoutes(menu: any[]): string[] {
    let routes: string[] = [];
    for (const item of menu) {
      if (item.route) {
        routes.push(item.route);
      }
      if (item.children) {
        routes = routes.concat(this.getAllRoutes(item.children));
      }
    }

    return routes;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.loalstorageServie.isUserLoggedIn())
      return true;
    else
      return false
  }
}
