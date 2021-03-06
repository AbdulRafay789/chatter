import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router, UrlTree } from '@angular/router';

let token = '';
@Injectable({
  providedIn: 'root',
})
export class HttpConfigService {
  isSuccessful: boolean;
  obj = {};
  errors: ErrorObject[] | string;
  loginobj: LoginObj[] | string;
  pisca: DtoResult[] | string;
  url = 'users/login';
  // url = 'users/login';
  tree: UrlTree;
  // token = '';
  user: any = {
    user: {
      user_dp: {
        created_at: '',
        name: '',
        size: 0,
        originalname: '',
        mimetype: '',
        path: '',
      },
      active: false,
      active_status: false,
      app_token: '',
      bio: '',
      location: '',
      country: '',
      created_at: '',
      dark_mode: false,
      deleted: false,
      device_token: '',
      email_verified: false,
      eula_agree: false,
      gender: '',
      login_type: '',
      messenger_color: '',
      remember_token: false,
      updated_at: '',
      verification_code: '',
      verification_time: '',
      dob: '',
      _id: '',
      username: '',
      fname: '',
      lname: '',
      mobile: '',
      email: '',
      connect: [],
      connected: [],
      createdAt: '',
      updatedAt: '',
      __v: 50,
    },
    token: '',
  }; //{}
  // url = 'posts';
  videos = [];
  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController,
    private loadingController: LoadingController,
    private router: Router
  ) {}

  getMsgString(err: any) {
    const messages = err;
    let msg = '';
    if (typeof messages === 'string') {
      msg = messages;
    } else if (messages) {
      msg = '';
      messages.forEach((error) => {
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
      position: 'bottom',
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
    // const dialogLoader = this.loadingController.create({
    //   message: 'Please wait...',
    // });
    // (await dialogLoader).present();
    // if (typeof fn == 'function') {
    //   await fn();
    // }
    // setTimeout(async () => {
    //   (await dialogLoader).dismiss();
    // }, 400);
  }

  async presentToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  settoken(tok) {
    token = tok;
  }

  setuser(usr) {
    this.user = usr;
  }

  getuser() {
    return this.user;
  }

  setVideo(vids) {
    this.videos = vids;
  }

  getVideo() {
    return this.videos;
  }

  async postApi(url, params, headerson?) {
    const headerObj = {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
      Authorization: '',
    };
    if (token !== '') {
      headerObj.Authorization = 'Bearer ' + token;
    }
    const obj = Object.assign({}, headerObj);
    const httpHeaders = new HttpHeaders(obj);
    const options = { headers: httpHeaders };

    // const result = this.http.post(environment.baseUrl + url, params, options);
    // return result;
    let result: any;

    await this.http
      .post(environment.baseUrl + url, params, options)
      .toPromise()
      .then(async (resp: any) => {
        console.log(resp);
        result = await resp;
      })
      .catch((error) => {
        console.log(error);
      });

    return result;
  }

  async putApi(url, params, headerson?) {
    const headerObj = {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
      Authorization: '',
    };
    if (token !== '') {
      headerObj.Authorization = 'Bearer ' + token;
    }
    const obj = Object.assign({}, headerObj);
    const httpHeaders = new HttpHeaders(obj);
    const options = { headers: httpHeaders };

    // const result = this.http.post(environment.baseUrl + url, params, options);
    // return result;
    let result: any;

    await this.http
      .post(environment.baseUrl + url, params, options)
      .toPromise()
      .then(async (resp: any) => {
        console.log(resp);
        result = await resp;
      })
      .catch((error) => {
        console.log(error);
      });

    return result;
  }

  async patchApi(url, params, headerson?) {
    const headerObj = {
      'Content-Type': 'application/json',
      Authorization: '',
    };
    if (token !== '') {
      headerObj.Authorization = 'Bearer ' + token;
    }
    const obj = Object.assign({}, headerObj);
    const httpHeaders = new HttpHeaders(obj);
    const options = { headers: httpHeaders };
    const result = this.http
      .patch(environment.baseUrl + url, params, options)
      .toPromise();
    return result;
  }

  async getApi(url, params, headerson?) {
    let headers = new HttpHeaders();

    // headers = headers.append('Content-Type', 'application/json; charset=utf-8');
    // headers = headers.append('Access-Control-Allow-Origin', '*');
    // headers = headers.append('Access-Control-Allow-Credentials', 'true');
    // if (token !== '') {
    //   headers = headers.append('Authorization', 'Bearer ' + token);
    // }
    // headers.append('GET', 'POST');

    const headerObj = {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: '',
    };
    if (token !== '') {
      headerObj.Authorization = 'Bearer ' + token;
    }
    const obj = Object.assign({}, headerObj);
    const httpHeaders = new HttpHeaders(obj);
    const options = { headers: httpHeaders };
    const result = this.http
      .get(environment.baseUrl + url, options)
      .toPromise();
    return result;
  }

  async postAttachmentApi(url, formData, headerson?) {
    // let formData = new FormData();
    // formData.append('title', params.title);
    // formData.append('description', params.description);
    // formData.append('uploadedImages[]', params.uploadedImages);

    const headerObj = {
      enctype: 'multipart/form-data;',
      Accept: 'plain/text',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
      Authorization: '',
    };
    if (token !== '') {
      headerObj.Authorization = 'Bearer ' + token;
    }
    const obj = Object.assign({}, headerObj);
    const httpHeaders = new HttpHeaders(obj);
    const options = { headers: httpHeaders };
    let result: any;

    await this.http
      .post(environment.baseUrl + url, formData, options)
      .toPromise()
      .then(async (resp: any) => {
        console.log(resp);
        result = await resp;
      })
      .catch((error) => {
        console.log(error);
      });

    return result;
  }

  async deleteApi(url, params, headerson?) {
    // let headers = new HttpHeaders();
    // headers.set('Content-Type', 'application/json; charset=utf-8');

    // headers = headers.append('Content-Type', 'application/json; charset=utf-8');
    // headers = headers.append('Access-Control-Allow-Origin', '*');
    // headers = headers.append('Access-Control-Allow-Credentials', 'true');
    // headers = headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // headers = headers.append('Accept', '*/*');

    const headerObj = {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: '',
    };
    if (token !== '') {
      headerObj.Authorization = 'Bearer ' + token;
    }
    const obj = Object.assign({}, headerObj);
    const httpHeaders = new HttpHeaders(obj);
    const options = { headers: httpHeaders };

    const result = this.http
      .delete(environment.baseUrl + url, options)
      .toPromise();
    return result;
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
