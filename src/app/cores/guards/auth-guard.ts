import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'; 
import { menuList } from '../../constants/data';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}
 
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
    
    const allowedRoutes = this.getAllRoutes(menuList);
    const targetUrl = state.url; 
    
    if (allowedRoutes.includes(targetUrl)) {
      return true;
    }

    this.router.navigate(['./page.unautherized-access']);
    return false; 
  }
}
