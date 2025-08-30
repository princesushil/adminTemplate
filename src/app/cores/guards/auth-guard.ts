import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators'; 
import { CommonService } from '../../services/common-service';
import { flattenMenu, hasUserAccessToMenu } from '../functions/isUserHasAccess'; 
import { hiddenRoutes } from '../../constants/data';
import { MenuService } from '../services/menu-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate { 
  private allMenus: any[] = []; 
  constructor(
    private router: Router, 
    private menuService:MenuService,
    private commonService: CommonService
  ) { } 

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {  
    if (this.allMenus && this.allMenus.length > 0) {
      return this.checkAccess(state.url);
    }
      
  const existingMenus = this.menuService.menuItemsSubject.getValue(); 
  const currentUrl = state.url; 
  if (existingMenus && existingMenus.length > 0) {
    if (!hiddenRoutes.includes(currentUrl) && !hasUserAccessToMenu(currentUrl, existingMenus)) {
      this.router.navigate(['/page/unauthorized-access']);
      return false;
    }
    return true;
  }
 
  return this.commonService.getRoleWiseMenu().pipe(
    map((response: any[]) => {
      if (response) {
        const allMenus = flattenMenu(response);

        // Save menus in BehaviorSubject
        this.menuService.setMenuItems(allMenus);

        if (!hiddenRoutes.includes(currentUrl) && !hasUserAccessToMenu(currentUrl, allMenus)) {
          this.router.navigate(['/page/unauthorized-access']);
          return false;
        }
      }
      return true;
    }),
    catchError(() => {
      this.router.navigate(['/page/unauthorized-access']);
      return of(false);
    })
  );
}

  private checkAccess(currentUrl: string, list: any = ""): boolean {
    const cleanUrl = currentUrl.split('?')[0];
    if (list.includes(cleanUrl)) {
      return true;
    }
    this.router.navigate(['/page/unauthorized-access']);
    return false;
  }
} 
