import { Routes } from '@angular/router';
 
 

export const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard-module').then(m => m.DashboardModule) },
  { path: 'master', loadChildren: () => import('./modules/master/master-module').then(m => m.MasterModule) },
  { path: 'page', loadChildren: () => import('./layout/page/pages/pages-module').then(m => m.PagesModule) },
  { path: '', redirectTo: 'page/login', pathMatch: 'full' }, 
  { path: '**', redirectTo: 'page/unautherized-access' },  
];
