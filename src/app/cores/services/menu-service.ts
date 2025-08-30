import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; 
import { MenuItem } from '../../layout/shared/navbar-component/navbar-component';

@Injectable({ providedIn: 'root' })
export class MenuService {
   menuItemsSubject = new BehaviorSubject<MenuItem[]>([]);
  menuItems$ = this.menuItemsSubject.asObservable();

  setMenuItems(items: MenuItem[]) {
    this.menuItemsSubject.next(items);
  }
  getMenuItems(): any[] {
    return this.menuItemsSubject.getValue();
  }
  clearMenuItems() {
    this.menuItemsSubject.next([]); 
  }
}
