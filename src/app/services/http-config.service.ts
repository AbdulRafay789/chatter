import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HttpConfigService {
  isSuccessful: boolean;
  obj = {};
  errors: ErrorObject[] | string;
  loginobj: LoginObj[] | string;
  pisca: DtoResult[] | string;
  // url = 'users/login';
  url = 'posts';
  constructor(private http: HttpClient, private toastCtrl: ToastController, private loadingController: LoadingController) { }

  getMsgString(err: any) {
    const messages = err;
    let msg = '';
    if (typeof messages === 'string') {
      msg = messages;
    } else if (messages) {
      msg = '';
      messages.forEach(error => {
        msg += error;
        msg += ' ';
      });
    }
    return msg;
  }

  async generalToast(msg: string, duration?: number) {
    const toast = await this.toastCtrl.create({
      header: msg,
      duration: duration ? duration : 10000,
      position: 'bottom'
    });

    await toast.onDidDismiss();
    await toast.present();
  }

  generalErrorMessage(err: any) {

    this.generalToast(this.getMsgString(err));
  }

  // async presentLoading(any: any) {
  //   const loading = await this.loadingController.create({
  //     cssClass: 'my-custom-class',
  //     message: 'Please wait...',
  //     duration: 2000
  //   });
  //   await loading.present();

  //   const { role, data } = await loading.onDidDismiss();
  //   console.log('Loading dismissed!');
  // }

  async presentLoading(fn) {
    const dialogLoader = this.loadingController.create({
      message: 'Please wait...'
    });

    (await dialogLoader).present();
    if (typeof fn == 'function') {
      await fn();
    }
    setTimeout(async () => {
      (await dialogLoader).dismiss();
    }, 400);
  }

  async presentToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async getListItems(params) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://162.215.217.147:3000');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST');

    console.log(environment.baseUrl + params);
    const result = await this.http.post(environment.baseUrl + this.url, params);
    return result;
    // return this.http.post(environment.baseUrl + this.url, params).toPromise();
  }

}
export interface ErrorObject {
  description: string;
  fields: string[];
}

export interface LoginObj {
  username: any;
  password: any;
}

export interface DtoResult {
  // data: T;
  errors: ErrorObject[] | string;
  isSuccessful: boolean;
  keyValue: any;
}


