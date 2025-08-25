import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Routing
import { SharedRoutingModule } from './shared-routing-module';

// Components
import { SidebarComponent } from './sidebar-component/sidebar-component';
import { HeaderComponent } from './header-component/header-component';
import { FooterComponent } from './footer-component/footer-component';
import { MainlayoutComponent } from './mainlayout-component/mainlayout-component';
import { NavbarComponent } from './navbar-component/navbar-component';
import { AppGridView } from './app-grid-view/grid-view';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms'; 
const materialModules = [
  MatButtonModule,
  MatIconModule,
  FormsModule,
  MatRadioModule,
  MatInputModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatDialogModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatTooltipModule,
  CommonModule,
  SharedRoutingModule,
  RouterModule
];

@NgModule({
  declarations: [
  ],
  imports: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    MainlayoutComponent 
  ],
  exports: [...materialModules]
})
export class SharedModule { }
