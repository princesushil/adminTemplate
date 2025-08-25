import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { menuList, notifications } from '../../../constants/data';
interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[]; // Optional and recursive
}

@Component({
  selector: 'app-navbar-component',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.scss'
})
export class NavbarComponent implements OnInit {
  showNavbar: boolean = false;
  constructor(private router: Router) { }
  ngOnInit(): void {
   
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
  showNotifications = false;
  isSubmenuOpen: { [key: string]: boolean } = {};
  notifications =notifications  
  menuItems: MenuItem[]=menuList

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
