import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router, UrlTree } from '@angular/router';

let token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTljYTUyOWJlNTNhNDIyY2QxZDY0MDUiLCJpYXQiOjE2MzgyODQxMTF9.s5Vh8b41DFC9RVzbq2CjGmLsAZnm0KfYiqBal8OXgaU';
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
        created_at: '2021-11-30T11:47:53.562Z',
        name: 'uploadedImages-1638274333160.png',
        size: 3913,
        originalname: 'facebook.png',
        mimetype: 'image/png',
        path: 'https://mychatterapp.com:3000/getfile/uploadedImages-1638274333160.png',
      },
      active: true,
      active_status: true,
      app_token: '',
      bio: 'Freelance1',
      location: 'PK1',
      country: '',
      created_at: '2021-11-27T16:12:19.355Z',
      dark_mode: false,
      deleted: false,
      device_token: '',
      email_verified: false,
      eula_agree: false,
      gender: '',
      login_type: '',
      messenger_color: '',
      remember_token: false,
      updated_at: '2021-11-27T16:12:19.355Z',
      verification_code: '',
      verification_time: '2021-11-27T16:12:19.355Z',
      dob: '1990-05-25',
      _id: '61a25a64505628033e5a9d7b',
      username: 'mharisferoz1',
      fname: 'haris1',
      lname: 'feroz',
      mobile: '89090909891',
      email: 'mharisferoz@gmail.com',
      connect: [
        {
          created_at: '2021-11-29T20:50:25.560Z',
          _id: '61a53d86c03bb1117cc2a03e',
          user_id: '619ca529be53a422cd1d6405',
        },
        {
          created_at: '2021-11-30T12:43:26.623Z',
          _id: '61a62b1c35b97e50f8a69e02',
          user_id: '619cb1211a5e6c2e3da6b48a',
        },
      ],
      connected: [
        {
          created_at: '2021-11-29T20:45:38.215Z',
          _id: '61a53bf6f20fee0fc1fc1171',
          user_id: '619ca529be53a422cd1d6405',
        },
      ],
      createdAt: '2021-11-27T16:18:44.816Z',
      updatedAt: '2021-11-30T14:09:59.522Z',
      __v: 50,
    },
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWEyNWE2NDUwNTYyODAzM2U1YTlkN2IiLCJpYXQiOjE2MzgyODEzOTl9.Y_Hs7qgnW2pjwTEhWyBrfob7TviVpNLY3tpdMskTzo4',
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
    let result:any;

    await this.http.post(environment.baseUrl + url, params, options).toPromise()
    .then( async (resp:any) =>{ 
      console.log(resp);
      result = await resp;

    } ).catch( (error) => {
      console.log(error);

    } )

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
    debugger;
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

  async postAttachmentApi(url, params, headerson?) {
    let headers = new HttpHeaders();
    let formData = new FormData();
    formData.append('title', params.title);
    formData.append('description', params.description);
    formData.append('uploadedImages', params.uploadedImages);

    // headers = headers.append('Content-Type', 'multipart/form-data');
    // headers = headers.append('Access-Control-Allow-Origin', '*');
    // headers = headers.append('Access-Control-Allow-Credentials', 'true');
    // if (token !== '') {
    //   headers = headers.append('Authorization', 'Bearer ' + token);
    // }
    const headerObj = {
      'enctype': 'multipart/form-data;',
      'Accept': 'plain/text',
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

    // old
    // const result = this.http
    //   .post(environment.baseUrl + url, params)
    //   .toPromise();
    // return result;
    // old
    debugger;
    let result:any;

    await this.http.post(environment.baseUrl + url, formData, options).toPromise()
    .then( async (resp:any) =>{ 
      console.log(resp);
      result = await resp;

    } ).catch( (error) => {
      console.log(error);

    } )

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
