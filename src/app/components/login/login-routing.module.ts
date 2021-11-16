import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
  },
];

@NgModule({
  // declarations:[ForgotpasswordComponent],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule,],
})
export class LoginPageRoutingModule { }
