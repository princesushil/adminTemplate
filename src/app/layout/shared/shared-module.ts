import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing-module'; 
import { SidebarComponent } from './sidebar-component/sidebar-component';
import { HeaderComponent } from './header-component/header-component';
import { FooterComponent } from './footer-component/footer-component';
import { MainlayoutComponent } from './mainlayout-component/mainlayout-component';
import { NavbarComponent } from './navbar-component/navbar-component';
import { AppGridView } from './app-grid-view/grid-view';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [ 
  ],
  imports: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    MainlayoutComponent,
    CommonModule,
    SharedRoutingModule,
    RouterModule
  ]
})
export class SharedModule { }
