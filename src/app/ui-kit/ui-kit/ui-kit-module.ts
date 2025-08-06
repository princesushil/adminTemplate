import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiKitRoutingModule } from './ui-kit-routing-module';
import { FormsComponent } from './forms-component/forms-component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsComponent,
    UiKitRoutingModule
  ]
})
export class UiKitModule { }
