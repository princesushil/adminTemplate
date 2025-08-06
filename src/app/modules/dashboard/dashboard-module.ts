import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing-module';
import { DashboardComponent } from './dashboard-component/dashboard-component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MasterModule } from '../master/master-module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardComponent,
    NgApexchartsModule,
    DashboardRoutingModule,
    MasterModule
  ]
})
export class DashboardModule { }
