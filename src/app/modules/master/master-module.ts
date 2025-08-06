import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { MasterRoutingModule } from './master-routing-module';
import { BranchMaster } from './branch-master/branch-master';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../layout/shared/shared-module'; 
import { AppGridView } from '../../layout/shared/app-grid-view/grid-view';
import { NgxSpinnerModule } from "ngx-spinner"; 
@NgModule({
  declarations: [
    BranchMaster ,// ✅ Declare component here 
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    SharedModule,
    MasterRoutingModule, 
    AppGridView,
    NgxSpinnerModule
]
})
export class MasterModule { }
