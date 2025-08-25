import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchMaster } from './branch-master/branch-master';
import { AuthGuard } from '../../cores/guards/auth-guard';
const routes: Routes = [
  { path: 'branch-master', component: BranchMaster, canActivate: [AuthGuard] }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
