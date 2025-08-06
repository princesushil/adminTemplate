import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPassword } from './forget-password/forget-password';
import { Login } from './login/login';
import { Register } from './register/register';

const routes: Routes = [
  { path: 'forget-password', component: ForgetPassword },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
