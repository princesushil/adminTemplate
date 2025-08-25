import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing-module';
import { Login } from './login/login';
import { Register } from './register/register';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToastrModule } from 'ngx-toastr'; 
import { ForgetPassword } from './forget-password/forget-password';
import { ResetPassword } from './reset-password/reset-password';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UnautherizedAccess } from './unautherized-access/unautherized-access';


@NgModule({
  declarations: [
    Login, Register, ForgetPassword, ResetPassword,UnautherizedAccess
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    NgxSpinnerModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    ToastrModule
  ]
})
export class PagesModule { }
