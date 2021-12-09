import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import {
  IonContent,
  ModalController,
  NavController,
  Platform,
} from '@ionic/angular';
import { GeneralService } from 'src/app/services/general.service';
import { HttpConfigService } from 'src/app/services/http-config.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  @ViewChild(IonContent) theContent: IonContent;
  max = new Date().toISOString().split('T')[0];
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
  transformValue = '';
  devicetoken = '';
  constructor(
    private router: Router,
    public modalController: ModalController,
    public service: HttpConfigService,
    public generalService: GeneralService,
    public platform: Platform,
    private navctrl: NavController,
    private loc: Location
  ) {}

  //
  inputTrigger(value) {
    requestAnimationFrame(() => {
      // let ionSelector = document.querySelector('ion-content');
      // ionSelector.style.transform = '';
      // ionSelector.style.transform = 'translateY(-'+(253-value)+'px)';
      this.transformValue = 'translateY(-' + (253 - value) + 'px)';
      document.activeElement.scrollIntoView(true);
    });

    // });
  }
  inputBlur() {
    requestAnimationFrame(() => {
      // let ionSelector = document.querySelector('ion-content');
      // ionSelector.style.transform = '';
      this.transformValue = '';
    });
  }
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
    this.data.username = this.username.toLowerCase();
    this.data.fname = this.fname.toLowerCase();
    this.data.lname = this.lname.toLowerCase();
    this.data.mobile = this.mobile;
    this.data.email = this.email;
    this.data.dob = this.age;
    this.data.password = this.password;
    this.data.bio = this.bio.toLowerCase();
    this.data.location = this.location.toLowerCase();
    this.data.device_token = this.devicetoken;
    const data1: any = await this.service.postApi('users/signup', this.data);
    if (data1.status && data1.data) {
      this.service.settoken(data1.data.token);
      this.service.setuser(data1.data);
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

  ngOnInit() {
    this.getToken();
    this.platform.ready().then(() => {
      Keyboard.addListener('keyboardWillHide', () => {
        this.transformValue = '';
      });
      Keyboard.addListener('keyboardDidHide', () => {
        this.transformValue = '';
      });
    });
  }
  showPassword(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
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
  }

  // this.fcm.getToken().then(token => {
  //   this.devicetoken = token;
}
