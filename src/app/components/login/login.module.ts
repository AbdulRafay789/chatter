import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { SignupPageRoutingModule } from './signup/signup-routing.module';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { UserService } from 'src/app/services/user.service';
import { HttpHelper } from 'src/app/services/http.helper';

@NgModule({
  declarations: [LoginPage,ForgotpasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    // SignupPageRoutingModule
  ],
//   providers: [
//     UserService,
//     HttpHelper,
// ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginPageModule { }
