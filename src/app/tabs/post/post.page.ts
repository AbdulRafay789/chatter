import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { HttpConfigService } from 'src/app/services/http-config.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  notifications: any = [];
  timeinterval: any;
  constructor(
    public service: HttpConfigService,
    public generalService: GeneralService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getNotifications(true);
    this.timeinterval = setInterval(() => {
      this.getNotifications(false); // Now the "this" still references the component
    }, 8000);
  }
  ionViewWillLeave(){
    clearInterval(this.timeinterval);
  }
  async getNotifications(flag) {
    // eslint-disable-next-line no-underscore-dangle
    const url = 'notifications';
    if (flag) {
      this.generalService.showLoader();
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const data1: any = await this.service.getApi(url, {});
    if (data1.status && data1.data) {
      this.notifications = data1.data;
      if (flag) {
        this.generalService.stopLoader();
      }
    } else {
      this.generalService.generalToast(data1.msg, 2000);
      console.log(data1.msg);
    }
    if (flag) {
      this.generalService.stopLoader();
    }
  }
  async read(obj, indx) {
    const url = 'notifications/read/' + obj._id;
    this.generalService.showLoader();
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const data1: any = await this.service.getApi(url, {});
    if (data1.status && data1.data) {
      this.notifications[indx]['read'] = true;
    } else {
      this.generalService.generalToast(data1.msg, 2000);
      console.log(data1.msg);
    }
    this.generalService.stopLoader();
  }
}
