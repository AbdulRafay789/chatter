import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { GeneralService } from 'src/app/services/general.service';
import { HttpConfigService } from 'src/app/services/http-config.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
})
export class ForgotpasswordComponent implements OnInit {
  email = '';
  data: any = {};
  constructor(
    public modalController: ModalController,
    public service: HttpConfigService,
    public generalService: GeneralService,
    public router: Router
  ) {}

  dismiss() {
    this.modalController.dismiss({});
  }

  async forgotPassword() {
    if (this.email == '') {
      this.generalService.generalToast('Email Is Required', 2000);
      return false;
    }
    this.data.email = this.email;

    const data1: any = await this.service.postApi('users/forget', this.data);
    if (data1.status) {
      this.generalService.showLoader();
      // this.service.settoken(data1.data.token);
      // this.service.setuser(data1.user);
      this.generalService.generalToast(data1.msg);
      this.generalService.stopLoader();
      this.dismiss();
    } else {
      // this.generalService.generalToast(data1.msg.message);
      console.log(data1.msg);
    }
  }

  ngOnInit() {}
}
