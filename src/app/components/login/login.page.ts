import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { HttpConfigService } from 'src/app/services/http-config.service';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  msg: any;
  email: any;
  signUp: Form;
  password: any;
  data: any = {};
  isLoading = false;
  pisci: any;

  currentDisplayDepartment: number = null;

  constructor(
    private router: Router,
    public modalController: ModalController, private service: HttpConfigService
  ) { }

  pisca() {
    this.router.navigate(['/folder/inbox']);
  }

  signup() {
    this.router.navigate(['/signup']);
  }

  home() {
    // this.router.navigate(['/folder/inbox']);
    this.router.navigate(['/tabs']);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ForgotpasswordComponent,
      cssClass: 'my-custom-class',
      backdropDismiss: true,
      mode: 'ios',
      showBackdrop: true,
    });
    return await modal.present();
  }

  async login() {
    // this.isLoading = false;
    // this.service.LoginObj.username = this.username;
    // this.service.LoginObj.password = this.password;
    // this.data.username = this.email;
    // this.data.password = this.password;

    // this.service.obj.username = this.username;
    // this.service.obj.username = this.password;
    // let loginRes = await this.service.getListItems(this.data);
    // if (loginRes.isSuccessful ) {
    //   this.isLoading = false;
    //   this.data = loginRes.Data;
    //   this.router.navigate(['/tabs']);
    // }
    // else {
    //   this.isLoading = false;
    //   this.service.generalErrorMessage(this.service.errors);
    // }
  }

  // async initializeDepartmentList(): Promise<void> {
  //   const data: SearchChange = await this.service.getListItems(this.data).toPromise();
  //   this.data = data;
  //   this.username = data.userName
  //   this.username = data.password
  // }

  isAuthorize() {
    // const msg = 'email';
    // const msg1 = 'password';
    // if (!this.email || this.email === '') {
    //   this.service.presentToast(msg);
    // };
    // if (!this.password || this.password === '') {
    //   this.service.presentToast(msg1);
    // };
    // return true;

    // const errors = [];
    // let msg = '';
    if (!this.email) {
      this.msg = 'Email is required';
      this.service.presentToast(this.msg);
      // this.service.presentToast(msg);
    }
    if (!this.password) {
      this.msg = 'Password is required';
      this.service.presentToast(this.msg);
      // this.service.presentToast(msg1);
    }
    return this.msg.length === 0;
  }

  async initializeDepartmentList() {

    // let result
    // await this.service.presentLoading(async () => {
    //   result = this.service.getListItems(this.data);
    // });

    // if (result.isSuccessful) {
    //   this.data = result.data;
    //   return true;
    // } else {
    //   return result.errors;
    // }

    // if (this.isAuthorize()) {
    //   this.isLoading = true;
    //   this.data.email = this.email;
    //   this.data.password = this.password;

    //    (await this.service.getListItems(this.data)).subscribe(
    //     async (data: DepartmentModel[]) => {
    //       this.pisci = data;
    //       const values = Object.keys(data).map(key => data[key]);
    //       const commaJoinedValues = values.join(',');
    //     }
    //   );
    //   this.isLoading = false;
    // }

  }

  async initializeDepartmentListt(): Promise<void> {
    // if (this.isAuthorize()) {
      this.data.username = this.email;
    this.data.password = this.password;
      const data = (await this.service.getListItems(this.data)).toPromise();
      this.pisci = data;
      this.router.navigate(['/tabs']);
    // }
  }

  ngOnInit() { }
}
