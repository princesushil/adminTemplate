import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { DashboardComponent } from './dashboard-component/dashboard-component';
import { AuthGuard } from '../../cores/guards/auth-guard';  
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent, canActivate: [AuthGuard]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
