import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { SignupPageRoutingModule } from './signup/signup-routing.module';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

@NgModule({
  declarations: [LoginPage,ForgotpasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    // SignupPageRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginPageModule { }
