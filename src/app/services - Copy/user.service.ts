import { Component, OnInit, Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BaseService } from './Base.Service';
// import { Events, AlertController } from 'ionic-angular';
import { DtoResult } from './DtoResult';

@Injectable()
export class UserService extends BaseService<any> {
  loginObj: any;

  // constructor(private events: Events, private alertCtrl: AlertController) {
  constructor() {
    super();
  }

  //SADIO 3/20/18
  // isLoggedIn(): Boolean {
  isLoggedIn(): boolean {

    if (this.localStorage.get('token') === undefined || this.localStorage.get('token') == null || this.localStorage.get('token') === '') {
      return false;
    }
    else {
      return true;
    }
  }

  async login(username: string, password: string,) {
    const loginEntity = {
      username,
      password,
    };

    const result = await this.post('login', loginEntity, BaseService.headers);
    // eslint-disable-next-line no-debugger
    this.loginObj = loginEntity;
    if (result.isSuccessful) {
      // eslint-disable-next-line no-debugger
      this.localStorage.set('token', 'bearer '.concat(result.data.token));
      // BaseService.headers['Authorization'] = 'bearer '.concat(result.Data.token);
      BaseService.headers.Authorization = 'bearer '.concat(result.data.token);
      this.loginObj = loginEntity;
    }

    return result;
  }

  // async lastLogin() {
  //   if (this.loginObj) {
  //     const dtoData = await this.login(this.loginObj.Username, this.loginObj.Password, this.loginObj.InstanceId,
  //       this.loginObj.IsMobileSession)
  //     if (dtoData.isSuccessful) { }
  //     else {
  //       this.events.publish('user:logout');
  //     }
  //   }
  //   else {
  //     this.events.publish('user:logout');
  //   }
  // }

  clear() {
    this.loginObj = null;
  }

  // async relogin() {
  //   const confirm = this.alertCtrl.create({
  //     header: 'Session Expired?',
  //     message: 'Do you want to login again?',
  //     buttons: [
  //       {
  //         text: 'Yes',
  //         handler: () => {
  //           this.lastLogin();
  //         }
  //       },
  //       {
  //         text: 'No',
  //         handler: () => {
  //           this.events.publish('user:logout');
  //         }
  //       }
  //     ]
  //   });
  //   // confirm.present();
  //   (await confirm).present();
  // }

}
