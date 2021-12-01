import { Injectable } from '@angular/core';
import { DtoResult } from './DtoResult';
// import { ToastController, LoadingController, ModalController, AlertController, Platform, NavController, Events } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
// import { File } from '@ionic-native/file';
// import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
// import { ErrorComponent } from '../components/error/error';
import { Subject } from 'rxjs';
import { Version, PlayStoreLink, AppStoreLink } from '../../../config';
import { ConfigurationProvider } from './configuration';
import { BaseService } from './Base.Service';
import {
  AlertController,
  LoadingController,
  ModalController,
  Platform,
  ToastController,
} from '@ionic/angular';
var dialogLoader;

@Injectable()
export class GeneralService {
  public disabled: boolean;

  // dialogLoader: any;
  accessorialDelivery: any = [];
  accessorialPickup: any = [];
  freightClassType: any[] = [];
  unitTypes: any[] = [];
  nonCommercialDelivery: any[] = [];
  nonCommercialPickup: any[] = [];
  commodities: any[] = [];
  packingGroup: any[] = [];
  classType: any[] = [];
  // public disabled: Boolean;
  customerCreditInfo: {
    creditLimit: number;
    dueDays: number;
    expiryDate: null;
  };
  router: any;
  actuallUserLogin1: string;
  // ShowLoaderChange: Subject<boolean> = new Subject<boolean>();

  financeLoadedDateFtl = {
    open: null,
    paid: null,
    pay: null,
    payment: null,
  };

  signUpModel: any;
  apiPath: string;

  private token: string;
  private customer1: string;
  private userLogin1: string;
  private role1: number;

  constructor(
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    // private http: HttpClient, private file: File, private transfer: FileTransfer,
    private http: HttpClient,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    // private platform: Platform, private events: Events, public conf: ConfigurationProvider) {
    private platform: Platform
  ) {
    // super();
    // super('General');
    // this.apiPath = conf.getServerUrl();
    // this.router = GlobalConfig.injector.get(Router);
  }

  clear() {
    this.customerCreditInfo = null;

    this.financeLoadedDateFtl = {
      open: null,
      paid: null,
      pay: null,
      payment: null,
    };
  }

  // fileTransfer: FileTransferObject = this.transfer.create();

  navigate(url: string) {
    this.router.navigate([url]);
  }
  clearActiveCustomer() {
    this.setCustomer('');
    this.setUserLogin('');
    // this.navigate('setting/changeactiveaccount')
  }

  getActuallUserLogin(): string {
    if (
      this.actuallUserLogin1 === undefined ||
      this.actuallUserLogin1 === undefined
    ) {
      // this.actuallUserLogin1 = this.localStorage.get('actuallUserLogin');
    }
    return this.actuallUserLogin1;
  }
  setActuallUserLogin(actuallUserLogin: string): any {
    //TODO: 6/29/18::
    //ADD TO COOKIES ALSO
    // this.localStorage.set('actuallUserLogin', actuallUserLogin);
    this.actuallUserLogin1 = actuallUserLogin;
  }
  isActiveCustomer(): boolean {
    const cust = this.getCustomer();
    return cust && cust !== '';
  }
  async getCustomerCreditinfo() {
    if (!this.customerCreditInfo) {
      // const dto = await this.get('GetCustomerCreditinfo');
      // if (dto.isSuccessful) {
      //   this.customerCreditInfo = dto.data;
      // }
    }
    return this.customerCreditInfo;
  }
  getCustomer(): string {
    if (!this.customer1 || this.customer1 === '') {
      // this.customer1 = this.localStorage.get('customer');
    }
    return this.customer1;
  }

  setCustomer(customer: string) {
    //TODO: 6/29/18::
    //ADD TO COOKIES ALSO
    // this.localStorage.set('customer', customer);
    this.customer1 = customer;
  }

  getRole(): number {
    if (!this.role1 || this.role1 === 0) {
      // this.role1 = parseInt(this.localStorage.get('RoleId'));
      // this.role1 = parseInt(this.localStorage.get('RoleId'), 10);
    }
    return this.role1;
  }

  setRole(roleId: number) {
    //TODO: 6/29/18::
    //ADD TO COOKIES ALSO
    // this.localStorage.set('RoleId', roleId);
    this.role1 = roleId;
  }

  getUserLogin(): string {
    //TODO: 6/29/18::
    //IF NULL GET FROM COOKIES..
    if (!this.userLogin1 || this.userLogin1 === '') {
      // this.userLogin1 = this.localStorage.get('userLogin');
    }
    return this.userLogin1;
  }

  setUserLogin(userLogin: string) {
    //TODO: 6/29/18::
    //ADD TO COOKIES ALSO
    // this.localStorage.set('userLogin', userLogin);
    this.userLogin1 = userLogin;
  }

  // LatestDocs = null;
  // LatestDocsDate: Date = null;
  // async setLatestDocs() {
  //   this.LatestDocsDate = new Date();
  //   const DtoData = await this.GetLatestDocumentsNote();
  //   if (DtoData.isSuccessful) {
  //     this.LatestDocs = DtoData.data;
  //   }
  //   else {
  //     this.LatestDocs = null;
  //     this.generalErrorMessage(DtoData.errors);
  //   }
  // }

  // async GetGUIDInvoiceDocumentFile(JobNumber: string, InvoiceNo: string, JobType: string): Promise<DtoResult<any>> {
  //   const params: any[] = [
  //     {
  //       name: 'JobNumber',
  //       value: JobNumber
  //     }, {
  //       name: 'InvoiceNo',
  //       value: InvoiceNo
  //     },
  //     {
  //       name: 'JobType',
  //       value: JobType
  //     }

  //   ];

  //   const result = this.get('GetGUIDInvoiceDocumentFile', params);
  //   // const result  = this.get('GetJobDocumentFile', params);

  //   return result;
  // }

  // async GetAiData() {
  //   const OpeningData = await this.GetAiOpeningInvoice();
  //   const PaidData = await this.GetAiPaidInvoice();
  //   const EPaymentData = await this.GetAiEpaymentInvoice();
  //   if (OpeningData.isSuccessful) {
  //     this.AiOpeningInvoice = OpeningData.data;
  //   }
  //   else if (typeof (OpeningData.errors) == typeof ('') && OpeningData.errors == 'Active Customer Not Set') {
  //     this.clearActiveCustomer();
  //   }
  //   else {
  //     this.AiOpeningInvoice = [];
  //   }
  //   if (PaidData.isSuccessful) {
  //     this.AiPaidInvoice = OpeningData.data;
  //   }
  //   else if (typeof (PaidData.errors) == typeof ('') && PaidData.errors == 'Active Customer Not Set') {
  //     this.clearActiveCustomer();
  //   }
  //   else {
  //     this.AiPaidInvoice = [];
  //   }

  //   if (EPaymentData.isSuccessful) {
  //     this.AiEPaymentInvoice = EPaymentData.data;
  //   }
  //   else if (typeof (EPaymentData.errors) == typeof ('') && EPaymentData.errors == 'Active Customer Not Set') {
  //     this.clearActiveCustomer();
  //   }
  //   else {
  //     this.AiEPaymentInvoice = [];
  //   }
  //   this.AiFinanceLoadedDate = new Date();
  // }

  async saveSignUp(signupData) {
    // return this.post('SaveSignUpData', signupData);
  }

  // async savePort(JobNo: string, PortType: string, data: any): Promise<DtoResult<any>> {
  //   //1 for open 2 for paid
  //   const params = [{
  //     name: 'PortType',
  //     value: PortType
  //   },
  //   {
  //     name: 'JobNo',
  //     value: JobNo
  //   }];
  //   return this.post('SavePorts', data, params);
  // }
  // SendDisputeDocumentFile(Dispute: {
  //   guidId: string;
  //   correctAmount: number;
  //   remarks: string;
  // }) {
  //   return this.post('SendDisputeDocumentFile', Dispute);

  // }

  // async getCountry() {
  //   return this.get('getCountries');
  // }
  // async IsCustomerActive(): Promise<DtoResult<any>> {
  //   return this.get('IsCustomerActive');
  // }
  // async GetPendingData() {

  //   const result = await this.get('GetPendingData');
  //   return result;
  // }

  // async GetSEJobInfoByJobNo(JobNo: string) {
  //   const params: any[] = [{
  //     name: 'JobNo',
  //     value: JobNo
  //   }];
  //   return await this.get('GetSEJobInfoByJobNo', params);
  // }
  // async GetGUIDBLPrintingFile(Id: number, ReportType: number) {
  //   const params: any[] = [{
  //     name: 'SIId',
  //     value: Id
  //   }, {
  //     name: 'ReportType',
  //     value: ReportType
  //   }];
  //   return await this.get('GetGUIDBLPrintingFile', params);
  // }
  // async GetTrackAndTracingListSI(MblNumber: string) {
  //   const params: any[] = [{
  //     name: 'sMBLNo',
  //     value: MblNumber
  //   }];
  //   return await this.get('GetTrackAndTracingListSI', params);
  // }

  // async GetTrackAndTracingListAE(MblNumber: string) {
  //   const params: any[] = [{
  //     name: 'sMBLNo',
  //     value: MblNumber
  //   }];
  //   return await this.get('GetTrackAndTracingListAE', params);
  // }

  // async GetTrackAndTracingListAI(MblNumber: string) {
  //   const params: any[] = [{
  //     name: 'sMBLNo',
  //     value: MblNumber
  //   }];
  //   return await this.get('GetTrackAndTracingListAI', params);
  // }

  // async GetTrackAndTracingListSE(MblNumber: string) {
  //   const params: any[] = [{
  //     name: 'sMBLNo',
  //     value: MblNumber
  //   }];
  //   return await this.get('GetTrackAndTracingListSE', params);
  // }

  // async GetTrackAndTracingListLTL(MblNumber: string) {
  //   const params: any[] = [{
  //     name: 'sJobNo',
  //     value: MblNumber
  //   }];
  //   return await this.get('GetTrackAndTracingListTP', params);
  // }

  // async GetTrackAndTracingListFTL(MblNumber: string) {
  //   const params: any[] = [{
  //     name: 'sJobNo',
  //     value: MblNumber
  //   }];
  //   return await this.get('GetTrackAndTracingListTPFTL', params);
  // }

  // async GetEmail(Email: string) {
  //   const params: any[] = [{
  //     name: 'Email',
  //     value: Email
  //   }];
  //   return await this.get('GetEmail', params);
  // }

  async getLogin(login: string) {
    const params: any[] = [
      {
        name: 'Login',
        value: login,
      },
    ];
    // return await this.get('GetUserLogin', params);
  }

  // async UnSetCustomer(): Promise<DtoResult<any>> {

  //   const result = this.get('UnSetCustomer');
  //   return result;
  // }

  // async GetBRIDANDJOBNO(BookingNo: string) {
  //   const params: any[] = [{
  //     name: 'BookingNo',
  //     value: BookingNo
  //   }];
  //   const result = await this.get('GetBRIDANDJOBNO', params);
  //   return result;

  // }

  // async UpdateCustomerDocEmail(IsDisableNotification: boolean, DocEmail?: string) {
  //   const params: any[] = [{
  //     name: 'IsDisableNotification',
  //     value: IsDisableNotification
  //   }, {
  //     name: 'DocEmail',
  //     value: DocEmail
  //   }];

  //   const result = await this.get('UpdateCustomerDocEmail', params);
  //   return result;
  // }

  // async getEmailConfiguration() {
  //   const result = await this.get('GetEmailConfiguration');
  //   return result;
  // }

  async getCitiesbyCountryCode(countryCode: string, cityName: string) {
    const params: any[] = [
      {
        name: 'CountryCode',
        value: countryCode,
      },
      {
        name: 'CityName',
        value: cityName,
      },
    ];
    // return await this.get('GetCitiesbyCountryCode', params);
  }
  async getPortsAndStatesbyCountryCode(countryCode: string) {
    const params: any[] = [
      {
        name: 'CountryCode',
        value: countryCode,
      },
    ];
    // return await this.get('GetPortsAndStatesbyCountryCode', params);
  }

  async getData() {
    // return await this.get('GetData');
  }

  async generalToast(msg: string, duration?: number) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: duration ? duration : 10000,
      // showCloseButton: true,
      position: 'bottom',
    });
    await toast.present();
    await toast.onDidDismiss();
  }

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
  generalErrorMessage(err: any) {
    this.generalToast(this.getMsgString(err));
  }

  generalCustomErrorMessage(err: any, err1: any, err2: any) {
    this.generalToast(this.getMsgString(err));
  }

  // async GenerateShipmentReport(JobNo: string) {
  //   const params: any[] = [
  //     {
  //       name: 'CountryCode',
  //       value: CountryCode
  //     },
  //   ]
  //   return await this.get('GetPortsAndStatesbyCountryCode', params);
  // }

  async showLoader() {
    // debugger;
    // dialogLoader = await this.loadingCtrl.create({
    //   message: 'Please wait...',
    // });
    // await dialogLoader.present();
  }
  stopLoader() {
    // setTimeout(() => {
      // if(dialogLoader){
      //   dialogLoader.onDidDismiss();
      // }
    
    // }, 200);
  }
  async presentLoading(fn?) {
    // const dialogLoader = await this.loadingCtrl.create({
    //   spinner: null,
    //   mode: 'ios',
    //   message: 'Please wait...',
    //   translucent: true,
    //   cssClass: 'custom-class custom-loading',
    //   backdropDismiss: true
    // });
    // await dialogLoader.present();
    // dialogLoader.present();
    // if (typeof fn == 'function') {
    //   await fn();
    // }
    // setTimeout(() => {
    //   dialogLoader.dismiss();
    // }, 400);
  }

  // public async showErrorDialog(data) {

  //   const modal = await this.modalCtrl.create({
  //     component: ErrorComponent,
  //     componentProps: {
  //       nData: data
  //     }
  //   });

  //   const modal = await this.modalCtrl.create(ErrorComponent, {
  //     BData: data
  //   });
  //   await modal.present();

  // }

  async showYesNo(title: string, fn: any, msg?: string) {
    const confirm = await this.alertCtrl.create({
      header: title,
      message: msg ? msg : '',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
          },
        },
        {
          text: 'Yes',
          handler: async () => {
            console.log('Yes clicked');
            if (fn) {
              await fn();
            }
          },
        },
      ],
    });
    await confirm.present();
  }

  async showYes(title: string, fn: any, msg?: string) {
    const confirm = await this.alertCtrl.create({
      header: title,
      message: msg ? msg : '',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Yes clicked');
            if (fn) {
              fn();
            }
          },
        },
      ],
    });
    await confirm.present();
  }

  async showSuccessDialog(title: string, fn: any, msg?: string) {
    const confirm = await this.alertCtrl.create({
      header: title,
      message: msg ? msg : '',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('Yes clicked');
            if (fn) {
              fn();
            }
          },
        },
      ],
    });
    await confirm.present();
  }

  // _OpenInvoice: FinanceGrid = null;

  // get OpenInvoice(): FinanceGrid {
  //   return this._OpenInvoice
  // }

  // changeShowLoader(change: boolean) {
  //   this.ShowLoaderChange.next(change);
  // }

  // async setOpeningInvoice(): Promise<any> {
  //   const data = await this.setOpeningInvoice();
  //   if (data.isSuccessful) {
  //     this.SeOpeningInvoice = data.Data;
  //     this.SearchedSeOpeningInvoice = data.Data;
  //   }
  //   else if (typeof (data.errors) == typeof ('') && data.errors === 'Active Customer Not Set') {
  //     this.clearActiveCustomer();
  //     this.generalErrorMessage(data.errors);
  //   }
  //   else if (typeof (data.errors) == typeof ('') && data.errors === 'No data records found for these selection criteria') {

  //     this.SeOpeningInvoice = [];
  //     this.SearchedSeOpeningInvoice = [];
  //   }

  //   else {
  //     this.SeOpeningInvoice = [];
  //     this.SearchedSeOpeningInvoice = [];

  //     this.generalErrorMessage(data.errors);

  //   }
  // }

  getDistinctList(oldList: any[], property: string) {
    const flags = {};
    const newList = oldList.filter((entry) => {
      if (flags[entry[property]]) {
        return false;
      }
      flags[entry[property]] = true;
      return true;
    });
    return newList;
  }

  getTimeObjFromDate(dateStr: string) {
    const timeObj = {
      hour: 0,
      minute: 0,
      second: 0,
    };
    if (dateStr && dateStr.split('T').length > 1) {
      const timeStr = dateStr.split('T')[1];
      if (timeStr && timeStr.split(':').length > 2) {
        const hr = Number(timeStr.split(':')[0]);
        const min = Number(timeStr.split(':')[1]);
        const sec = Number(timeStr.split(':')[2]);
        timeObj.hour = hr;
        timeObj.minute = min;
        timeObj.second = sec;
      }
    }

    return timeObj;
  }

  // async getAppCriticalVersion() {
  //   const dtoData = await this.get('GetAppCriticalVersion');
  //   if (dtoData.isSuccessful) {
  //     const version = Number(dtoData.data + '');
  //     if (version > Version) {
  //       const updatemodel = await this.alertCtrl.create({
  //         header: 'Update Required',
  //         // message: "Please, update app to new version to continue.",
  //         message: 'An update to new version is required to continue.',
  //         backdropDismiss: false,
  //         buttons: [
  //           {
  //             text: 'Ok',
  //             handler: () => {
  //               console.log('Yes clicked');
  //               // this.updateApp();
  //               // this.platform.exitApp();

  //             }
  //           }
  //         ]
  //       });
  //       updatemodel.present();
  //     }
  //   }

  //   else {

  //   }
  // }

  updateApp() {
    //TODO check if google play or app store is available.
    try {
      if (this.platform.is('ios')) {
        // window.open("market://details?id=" + AppStoreLink);
        window.open(AppStoreLink);
      } else {
        window.open('market://details?id=' + PlayStoreLink);
        // window.open(PlayStoreLink);
      }
    } catch (e) {
      console.log(e);
      this.toastCtrl.create({
        message: 'Error ' + e.message,
      });
    } finally {
      // this.platform.exitApp();
      // ERROR
    }
  }

  getToken(): string {
    // if (this._token) {
    // this.token = this.localStorage.get('token');
    // }
    return this.token;
  }

  // checkAppRights() {
  //   if (this.getToken()) {
  //     if (this.getRole()) {
  //       const Role = this.getRole();
  //       if (Role != 3) {
  //         if (!this.isActiveCustomer()) {
  //           this.showYes('Active Customer not set ', () => {
  //             this.events.publish('setCustomer');
  //           }), '';
  //         }
  //       }
  //     }
  //   }
  //   else {
  //     this.events.publish('user:logout');
  //   }
  // }

  // async getCustomerApplicationSigned() {
  //   const result = await this.get('GetCustomerApplicationSigned');
  //   return result;
  // }

  // showSpecialErrors(title: string, htmlContent: string) {
  //   const modal = this.modalCtrl.create(CustomErrorComponent, {
  //     data: {
  //       title,
  //       htmlContent
  //     }
  //   })
  //   modal.onDidDismiss((result) => {
  //   });
  //   modal.present();

  // }

  async showsuccessmessage(title: any, subTitle?: any) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: subTitle,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async practiceAlert(title: any) {
    const alert = await this.alertCtrl.create({
      header: title,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // async getOpeningInvoices() {
  //   const res = await this.get('GetOpeningInvoices');
  //   return res;
  // }

  // async searchZip(ZipCode: string, LocationCode?: string) {
  //   const params = [];
  //   params.push({
  //     name: 'ZipCode',
  //     value: ZipCode
  //   });
  //   if (LocationCode
  //   ) {
  //     params.push({
  //       name: 'LocationCode',
  //       value: LocationCode
  //     });
  //   }
  //   return await this.get('GetZipCodes', params);
  // }

  // async isCustomerAllowedToBook() {
  //   return await this.get('IsCustomerAllowedToBook');
  // }
}
