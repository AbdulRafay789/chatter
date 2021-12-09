import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HttpHelper } from 'src/app/services/http.helper';
import { UserService } from 'src/app/services/user.service';
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
  imports: [RouterModule.forChild(routes), CommonModule,IonicModule],
  exports: [RouterModule,],
  // providers: [UserService,
  //   HttpHelper,]
})
export class LoginPageRoutingModule { }
