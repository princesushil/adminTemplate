import { Component } from '@angular/core';
import { HeaderComponent } from "../header-component/header-component";
import { SidebarComponent } from "../sidebar-component/sidebar-component";
import { FooterComponent } from "../footer-component/footer-component";
import { ProductListRoutingModule } from "../../../modules/inventory/product-list/product-list-routing-module";

@Component({
  selector: 'app-mainlayout-component',
  imports: [HeaderComponent, SidebarComponent, FooterComponent, ProductListRoutingModule],
  templateUrl: './mainlayout-component.html',
  styleUrl: './mainlayout-component.scss'
})
export class MainlayoutComponent {

}
