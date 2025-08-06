import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchMaster } from './branch-master/branch-master';
const routes: Routes = [
  { path: 'branch-master', component: BranchMaster }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
