import { Component, OnInit } from '@angular/core';
import { isPlatform, Platforms } from '@ionic/core';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { BaseService } from 'src/app/services/Base.Service';
import { GeneralService } from 'src/app/services/general.service';
import { globalConfig } from 'src/app/services/global.config';
import { HttpConfigService } from 'src/app/services/http-config.service';
import { UserService } from 'src/app/services/user.service';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { Capacitor } from '@capacitor/core';
// import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
// auth
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { SubjectsService } from 'src/app/services/subjects.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  msg: any;
  email = ''; //mharisferoz@gmail.com
  password = ''; //m6zfbtfk
  signUp: Form;
  data: any = {};
  isLoading = false;
  pisci: any;
  isRemember = false;
  currentDisplayDepartment: number = null;
  devicetoken = '';
  constructor(
    public router: Router,
    // public modalController: ModalController, public service: HttpConfigService, public auth: UserService,
    public modalController: ModalController,
    public service: HttpConfigService,
    public generalService: GeneralService,
    public plt: Platform,
    // private googlePlus: GooglePlus,
    private subjectService: SubjectsService
  ) {
    this.generalService.setCustomer('');
    this.generalService.setUserLogin('');
    this.generalService.setActuallUserLogin('');
    this.generalService.clear();
    // this.auth.clear();
    // this.plt.ready()
    //   .then(() => {
    //     this.fcm.onNotification().subscribe(data => {
    //       if (data.wasTapped) {
    //         console.log("Received in background");
    //       } else {
    //         console.log("Received in foreground");
    //       };
    //     });

    //     this.fcm.onTokenRefresh().subscribe(token => {
    //       this.devicetoken = token;
    //       // Register your new token in your back-end if you want
    //       // backend.registerToken(token);
    //     });
    //   })
  }
  subscribeToTopic() {
    // this.fcm.subscribeToTopic('enappd');
  }
  getToken() {
    let platform = Capacitor.getPlatform();
    if (platform == 'android' || platform == 'ios') {
      PushNotifications.requestPermissions().then((result) => {
        if (result.receive === 'granted') {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          // Show some error
        }
      });

      // On success, we should be able to receive notifications
      PushNotifications.addListener('registration', (token: Token) => {
        console.log('Push registration success, token: ' + token.value);
        this.devicetoken = token.value;
      });

      // Some issue with our setup and push will not work
      PushNotifications.addListener('registrationError', (error: any) => {
        console.log('Error on registration: ' + JSON.stringify(error));
      });

      // Show us the notification payload if the app is open on our device
      PushNotifications.addListener(
        'pushNotificationReceived',
        (notification: PushNotificationSchema) => {
          console.log('Push received: ' + JSON.stringify(notification));
        }
      );

      // Method called when tapping on a notification
      PushNotifications.addListener(
        'pushNotificationActionPerformed',
        (notification: ActionPerformed) => {
          console.log('Push action performed: ' + JSON.stringify(notification));
        }
      );
    }

    // this.fcm.getToken().then(token => {
    //   this.devicetoken = token;
    // });
  }
  unsubscribeFromTopic() {
    // this.fcm.unsubscribeFromTopic('enappd');
  }

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
      // backdropDismiss: true,
      // mode: 'ios',
      // showBackdrop: true,
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

  async getLogin() {
    if (this.email == '') {
      this.generalService.generalToast('Email Is Required', 2000);
      return false;
    }
    if (this.password == '') {
      this.generalService.generalToast('Password Is Required', 2000);
      return false;
    }
    this.data.email = this.email;
    this.data.password = this.password;
    this.data.device_token = this.devicetoken;
    this.generalService.showLoader();
    const data1: any = await this.service.postApi('users/login', this.data);
    if (data1.status && data1.data) {
      this.service.settoken(data1.data.token);
      this.service.setuser(data1.data);

      // Subscription
      this.subjectService.userDetails.next(data1.data.user);
      // Subscription

      this.data = data1;
      // this.generalService.generalToast('Logged In SuccessFully', 2000);
      this.router.navigate(['/tabs']);
    } else {
      this.generalService.generalToast(data1.msg, 2000);
      console.log(data1.msg);
    }
    this.generalService.stopLoader();
    // this.email = data1.email;
    // this.password = data1.password;
  }

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
   
  }

  
  saveForm() {
    if (this.isRemember === true) {
      localStorage.setItem('email', this.email);
      localStorage.setItem('password', this.password);
    } else {
      localStorage.setItem('email', '');
      localStorage.setItem('password', '');
    }
  }

  setACustomer(data) {
    if (data.loginObject) {
      this.generalService.setUserLogin(data.loginObject.userLogin);
      this.generalService.setActuallUserLogin(data.loginObject.userLogin);
      this.generalService.setRole(data.loginObject.genRolesId);
      if (
        data.loginObject.customer != null &&
        data.loginObject.customer !== undefined
      ) {
        this.generalService.setCustomer(data.loginObject.customer.shortName);
      }
    }
  }

  ngOnInit() {
    this.getToken();
    // GoogleAuth.init();
  }
  // push notifications
  async Google() {
    // try {
    //   const res = await GoogleAuth.signIn();
    //   if (res) {
    //     console.log(res);
    //     let obj = {
    //       username: '',
    //       fname: '',
    //       lname: '',
    //       mobile: '',
    //       email: '',
    //       dob: '',
    //       password: '',
    //       bio: '',
    //       location: '',
    //       image: '',
    //     };
    //     obj.username = res.givenName + res.familyName;
    //     obj.fname = res['givenName'];
    //     obj.lname = res['familyName'];
    //     obj.mobile = '000000000';
    //     obj.email = res.email;
    //     obj.dob = '1999-01-01';
    //     obj.password = res['id'];
    //     obj.bio = 'bio';
    //     obj.location = 'location';
    //     obj.image = res.imageUrl;

    //     const data1: any = await this.service.postApi('users/signup', obj);
    //     if (data1.status && data1.data) {
    //       this.service.settoken(data1.data.token);
    //       this.service.setuser(data1.data);
    //       this.data = data1.user;
    //       this.generalService.stopLoader();
    //       // this.generalService.generalToast('You Have Signed Up SuccessFully', 2000);
    //       this.router.navigate(['/tabs']);
    //     } else {
    //       // this.generalService.generalToast(data1.msg.message);
    //       console.log(data1.msg);
    //     }
    //   }
    // } catch (error) {}
  }
  showPassword(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
  }
}
