import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchMaster } from './branch-master/branch-master';
import { AuthGuard } from '../../cores/guards/auth-guard';
import { ItemMasterComponent } from './item-master/item-master';
import { CustomerMaster } from './customer-master/customer-master';
import { MachineMaster } from './machine-master/machine-master';


const routes: Routes = [
  { path: 'branch-master', component: BranchMaster, canActivate: [AuthGuard] },
  { path: 'item-master', component: ItemMasterComponent, canActivate: [AuthGuard] },
  {path:  'customer-master',component: CustomerMaster,canActivate:[AuthGuard]},
  {path:'machine-master',component:MachineMaster,canActivate:[AuthGuard]}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
