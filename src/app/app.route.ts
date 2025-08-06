import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard-component/dashboard-component';
 

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'dashboard', loadChildren: () => import('./modules/dashboard//dashboard-component/dashboard-component').then(m => m.DashboardComponent) },

    ]
  },
  { path: 'master', loadChildren: () => import('./modules/master/master-module').then(m => m.MasterModule) },
  { path: 'page', loadChildren: () => import('./layout/page/pages/pages-module').then(m => m.PagesModule) },
  { path: '', redirectTo: 'page/login', pathMatch: 'full' }, 
  { path: '**', redirectTo: 'login' }
];
