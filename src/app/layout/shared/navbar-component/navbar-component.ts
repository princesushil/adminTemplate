import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
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
  notifications = [
    { message: 'New order placed Inventory updatedInventory updatedInventory updatedInventory updatedInventory updatedInventory updated', read: false, time: new Date() },
    { message: 'Inventory updated', read: false, time: new Date(Date.now() - 10000000) },
    { message: 'System reboot scheduled', read: true, time: new Date(Date.now() - 3600000) },
    { message: 'Inventory updated', read: false, time: new Date(Date.now() - 10000000) },
    { message: 'System reboot scheduled', read: true, time: new Date(Date.now() - 3600000) },
    { message: 'Inventory updated', read: false, time: new Date(Date.now() - 10000000) },
    { message: 'System reboot scheduled', read: true, time: new Date(Date.now() - 3600000) },
    { message: 'Inventory updated', read: false, time: new Date(Date.now() - 10000000) },
    { message: 'System reboot scheduled', read: true, time: new Date(Date.now() - 3600000) },
    { message: 'Inventory updated', read: false, time: new Date(Date.now() - 10000000) },
    { message: 'System reboot scheduled', read: true, time: new Date(Date.now() - 3600000) },
    { message: 'Inventory updated', read: false, time: new Date(Date.now() - 10000000) },
    { message: 'System reboot scheduled', read: true, time: new Date(Date.now() - 3600000) },
    { message: 'Inventory updated', read: false, time: new Date(Date.now() - 10000000) },
    { message: 'System reboot scheduled', read: true, time: new Date(Date.now() - 3600000) },
  ];
  menuItems: MenuItem[] = [

    {
      label: 'Dashboard',
      icon: 'dashboard',
      // remove this route if you want the parent to only expand, not navigate
      // OR keep it and submenu still works
      route: '/dashboard',
      children: [
        {
          label: 'Change Branch',
          icon: 'sync_alt',
          route: '/dashboard/change-branch'
        }
      ]
    },
    {
      label: 'Master',
      icon: 'folder',
      children: [
        {
          label: 'Branch Master',
          icon: 'people',
          route: '/master/branch-master'
        },
        {
          label: 'Vendors',
          icon: 'local_shipping',
          route: '/master/vendors'
        },
        {
          label: 'Products',
          icon: 'inventory',
          route: '/master/products'
        },
        {
          label: 'Vehicles',
          icon: 'commute',
          route: '/master/vehicles'
        },
        {
          label: 'Employees',
          icon: 'badge',
          route: '/master/employees', // optional parent route
          children: [
            {
              label: 'Driver',
              icon: 'directions_car',
              route: '/master/employees/driver'
            },
            {
              label: 'Helper',
              icon: 'engineering',
              route: '/master/employees/helper'
            },
            {
              label: 'Manager',
              icon: 'supervisor_account',
              route: '/master/employees/manager'
            },
            {
              label: 'Departments',
              icon: 'corporate_fare',
              route: '/master/employees/departments',
              children: [
                {
                  label: 'HR',
                  icon: 'person',
                  route: '/master/employees/departments/hr'
                },
                {
                  label: 'Accounts',
                  icon: 'account_balance',
                  route: '/master/employees/departments/accounts',
                  children: [
                    {
                      label: 'Payroll',
                      icon: 'payments',
                      route: '/master/employees/departments/accounts/payroll'
                    },
                    {
                      label: 'Invoices',
                      icon: 'receipt_long',
                      route: '/master/employees/departments/accounts/invoices'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      label: 'Transaction',
      icon: 'swap_horiz',
      children: [
        {
          label: 'Create Order',
          icon: 'add_shopping_cart',
          route: '/transaction/create-order'
        },
        {
          label: 'Dispatch',
          icon: 'local_shipping',
          route: '/transaction/dispatch',
          children: [
            {
              label: 'Create Dispatch',
              icon: 'add',
              route: '/transaction/dispatch/create'
            },
            {
              label: 'Track Dispatch',
              icon: 'track_changes',
              route: '/transaction/dispatch/track'
            }
          ]
        },
        {
          label: 'Invoice',
          icon: 'receipt_long',
          route: '/transaction/invoice'
        },
        {
          label: 'Payments',
          icon: 'payments',
          route: '/transaction/payments'
        }
      ]
    },
    {
      label: 'Reports',
      icon: 'bar_chart',
      children: [
        {
          label: 'Sales Report',
          icon: 'show_chart',
          route: '/reports/sales'
        },
        {
          label: 'Inventory Report',
          icon: 'stacked_line_chart',
          route: '/reports/inventory'
        },
        {
          label: 'Transaction Summary',
          icon: 'assignment',
          route: '/reports/transaction-summary'
        }
      ]
    },
    {
      label: 'Settings',
      icon: 'settings',
      children: [
        {
          label: 'User Management',
          icon: 'manage_accounts',
          route: '/settings/users'
        },
        {
          label: 'Roles & Permissions',
          icon: 'security',
          route: '/settings/roles'
        },
        {
          label: 'Preferences',
          icon: 'tune',
          route: '/settings/preferences'
        }
      ]
    },
    {
      label: 'Settings',
      icon: 'settings',
      children: [
        {
          label: 'User Management',
          icon: 'manage_accounts',
          route: '/settings/users'
        },
        {
          label: 'Roles & Permissions',
          icon: 'security',
          route: '/settings/roles'
        },
        {
          label: 'Preferences',
          icon: 'tune',
          route: '/settings/preferences'
        }
      ]
    }
  ];

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
    console.log('Clicked:', notification.message);
    // Navigate or open modal based on notification if needed
  }
  clearAll() {
    this.notifications = [];
  }
  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  logout() {
    // Clear session, token, etc.
    localStorage.clear();
    this.router.navigate(['page/login']);
  }

}
