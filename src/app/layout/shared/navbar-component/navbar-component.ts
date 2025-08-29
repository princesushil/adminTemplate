import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { notifications } from '../../../constants/data';
import { MenuService } from '../../../cores/services/menu-service';
import { CommonService } from '../../../services/common-service';
import { BehaviorSubject } from 'rxjs';
import { flattenMenu, hasUserAccessToMenu } from '../../../cores/functions/isUserHasAccess';
export interface MenuItem {
  id: number;
  title: string;
  url: string;
  icon: string;
  cssClass: string;
  parentMenuId: number;
  isFinYearWiseMenuLock: boolean;
  isActive: boolean;
  sequence: number;
  subMenu: MenuItem[]; // Recursive definition
}


@Component({
  selector: 'app-navbar-component',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.scss'
})
export class NavbarComponent implements OnInit {
  menuList: MenuItem[] = [];
  showNavbar: boolean = false;
  private menuItemsSubject = new BehaviorSubject<any[]>([]);
  menuItems$ = this.menuItemsSubject.asObservable();
  isMenuLoaded: any;
  constructor(private router: Router, private menuService: MenuService, private _cdr: ChangeDetectorRef, private commonService: CommonService) { }
  ngOnInit(): void { 
        this.loadMenuIfNeeded() 
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
  loadMenuIfNeeded(): void {
    if (!this.isMenuLoaded) {
      this.isMenuLoaded = true;
      this.commonService.getRoleWiseMenu().subscribe((response: any[]) => {
        if (response) {
          this.menuItems = response
          const currentUrl = this.router.url;
          const allMenus = flattenMenu(response); 
          if (!hasUserAccessToMenu(currentUrl, allMenus)) {
            //this.router.navigate(['/page/unauthorized-access']); 
          }

          this.setMenuItems(response);
          this._cdr.detectChanges()
        }
      });
    }
  }
  setMenuItems(items: any[]) {
    this.menuItemsSubject.next(items);
  }
  showNotifications = false;
  isSubmenuOpen: { [key: string]: boolean } = {};
  notifications = notifications
  menuItems: MenuItem[] = this.menuList

  toggle(item: any): void {
    item.expanded = !item.expanded;
  }
  toggleSubmenu(item: any) {
    if (item.children) {
      this.isSubmenuOpen[item.label] = !this.isSubmenuOpen[item.label];
    } 
  }
  getUnreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  markAllAsRead() {
    this.notifications.forEach(n => n.read = true);
  }
  handleNotificationClick(notification: any) {
    notification.read = true;
  }
  clearAll() {
    this.notifications = [];
  }
  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['page/login']);
  }

}
