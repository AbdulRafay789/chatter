import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { GeneralService } from 'src/app/services/general.service';
import { HttpConfigService } from 'src/app/services/http-config.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  username = '';
  fname = '';
  lname = '';
  mobile = '';
  email = '';
  age = '';
  password = '';
  bio = '';
  location = '';
  data: any = {};
  constructor(
    private router: Router,
    public modalController: ModalController,
    public service: HttpConfigService,
    public generalService: GeneralService,
    private navctrl: NavController,
    private loc: Location
  ) {}

  backtologin() {
    this.router.navigate(['/login']);
  }

  async signup() {
    if (this.username == '') {
      this.generalService.generalToast('Username Is Required', 2000);
      return false;
    }
    if (this.fname == '') {
      this.generalService.generalToast('First Name Is Required', 2000);
      return false;
    }
    if (this.lname == '') {
      this.generalService.generalToast('Last Name Is Required', 2000);
      return false;
    }
    // if (this.mobile == '') {
    //   this.generalService.generalToast('Mobile# Is Required', 2000);
    //   return false;
    // }
    if (this.email == '') {
      this.generalService.generalToast('Email Is Required', 2000);
      return false;
    }
    if (this.age == '') {
      this.generalService.generalToast('Age Is Required', 2000);
      return false;
    }
    if (this.password == '') {
      this.generalService.generalToast('Password Is Required', 2000);
      return false;
    }
    // if (this.bio == '') {
    //   this.generalService.generalToast('Bio Is Required', 2000);
    //   return false;
    // }
    // if (this.location == '') {
    //   this.generalService.generalToast('Location Is Required', 2000);
    //   return false;
    // }
    this.generalService.showLoader();
    this.data.username = this.username;
    this.data.fname = this.fname;
    this.data.lname = this.lname;
    this.data.mobile = this.mobile;
    this.data.email = this.email;
    this.data.dob = this.age;
    this.data.password = this.password;
    this.data.bio = this.bio;
    this.data.location = this.location;

    const data1: any = await this.service.postApi('users/signup', this.data);
    if (data1.status && data1.data.user) {
      this.service.settoken(data1.data.token);
      this.service.setuser(data1.user);
      this.data = data1.user;
      this.generalService.stopLoader();
      this.generalService.generalToast('You Have Signed Up SuccessFully', 2000);
      this.router.navigate(['/tabs']);
    } else {
      // this.generalService.generalToast(data1.msg.message);
      console.log(data1.msg);
    }

    // this.email = data1.email;
    // this.password = data1.password;
  }

  // async presentModal() {
  //   const modal = await this.modalController.create({
  //     component: ForgotpasswordComponent,
  //     cssClass: 'my-custom-class',
  //     backdropDismiss:true,
  //     mode: 'ios',
  //     showBackdrop: true
  //   });
  //   return await modal.present();
  // }

  ngOnInit() {}
}
