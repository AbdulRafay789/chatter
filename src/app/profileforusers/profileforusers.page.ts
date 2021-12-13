import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '../services/general.service';
import { HttpConfigService } from '../services/http-config.service';

@Component({
  selector: 'app-profileforusers',
  templateUrl: './profileforusers.page.html',
  styleUrls: ['./profileforusers.page.scss'],
})
export class ProfileforusersPage implements OnInit {
  index: any;
  videoData: any = [];
  user: any = {};
  isconnectdata = false;
  isdisconnectdata = false;
  isreportdata = false;
  isunreportdata = false;
  showverified = false;
  verify = false;
  constructor(public service: HttpConfigService, public generalService: GeneralService, private route: ActivatedRoute,
    private router: Router,) { }

  async getVideos(param) {
    const url = 'users/details/' + param['_id'];
    this.generalService.showLoader();
    const data1: any = await this.service.getApi(url, {});
    if (data1.status && data1.data) {
      this.videoData = data1.data;
      this.service.setVideo(data1.data);
      this.generalService.stopLoader();
    }
    else {
      if (data1.status === false) {
        this.generalService.generalErrorMessage('No Record Found');
      }
      this.generalService.generalErrorMessage(data1.msg);
      console.log(data1.msg);
    }
  }
  async GotoChat(param) {
    // eslint-disable-next-line no-underscore-dangle
    let userto_id = param._id;
    const url = 'chats/create';
    this.generalService.showLoader();
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const data1: any = await this.service.postApi(url, {
      userto_id: userto_id,
    });
    if (data1.status && data1.data) {
      this.router.navigate([
        '/tabs/chat/messages',
        { data: JSON.stringify(data1.data) },
      ]);
    } else {
      this.generalService.generalToast(data1.msg, 2000);
      console.log(data1.msg);
    }
    this.generalService.stopLoader();
  }
  async connect(param) {
    const url = 'users/connect/' + this.videoData._id;
    this.generalService.showLoader();
    const data1: any = await this.service.postApi(url, {});
    if (data1.status && data1.data) {
      this.videoData = data1.data;
      this.setValues();
    } else {
      if (data1.status === false) {
        this.generalService.generalErrorMessage('No Record Found');
      }
      this.generalService.generalErrorMessage(data1.msg);
      console.log(data1.msg);
    }
    this.generalService.stopLoader();
  }

  async disconnect(param) {
    const url = 'users/unconnect/' + this.videoData._id;
    this.generalService.showLoader();
    const data1: any = await this.service.postApi(url, {});
    if (data1.status && data1.data) {
      this.videoData = data1.data[0];
      this.setValues();
    } else {
      if (data1.status === false) {
        this.generalService.generalErrorMessage('No Record Found');
      }
      this.generalService.generalErrorMessage(data1.msg);
      console.log(data1.msg);
    }
    this.generalService.stopLoader();
  }

  async report(param) {
    const url = 'users/report/' + this.videoData._id;
    this.generalService.showLoader();
    const data1: any = await this.service.postApi(url, {});
    if (data1.status && data1.data) {
      this.videoData = data1.data;
      this.setValues();
    } else {
      if (data1.status === false) {
        this.generalService.generalErrorMessage('No Record Found');
      }
      this.generalService.generalErrorMessage(data1.msg);
      console.log(data1.msg);
    }
    this.generalService.stopLoader();
  }

  async unreport(param) {
    const url = 'users/unreport/' + this.videoData._id;
    this.generalService.showLoader();
    const data1: any = await this.service.postApi(url, {});
    if (data1.status && data1.data) {
      this.videoData = data1.data[0];
      this.setValues();
    } else {
      if (data1.status === false) {
        this.generalService.generalErrorMessage('No Record Found');
      }
      this.generalService.generalErrorMessage(data1.msg);
      console.log(data1.msg);
    }
    this.generalService.stopLoader();
  }
  setValues() {
    let disconnectcount = 0;
    let unreportcount = 0;
    if(this.videoData.connected && this.videoData.connected.length > 0){
      this.videoData.connected.forEach((element) => {
        if (this.user.user._id == element.user_id) {
          disconnectcount++;
          this.isconnectdata = true;
        }
      });
    }
    if(this.videoData.report && this.videoData.report.length > 0){
      this.videoData.report.forEach((element) => {
        if (this.user.user._id == element.user_id) {
          unreportcount++;
          this.isreportdata = true;
        }
      });
    }
    
    
    if (disconnectcount == 0) {
      this.isdisconnectdata = false;
      this.isconnectdata = true;
    }
    else{
      this.isdisconnectdata = true;
      this.isconnectdata = false;
    }
    if (unreportcount == 0) {
      this.isunreportdata = false;
      this.isreportdata = true;
    }
    else{
      this.isunreportdata = true;
      this.isreportdata = false;
    }
  }


  ngOnInit() {
    this.user = this.service.getuser();
    this.route.params.subscribe((params) => {
      this.videoData = JSON.parse(params.data);
      if(this.videoData.active_status || this.videoData.hawaii){
        this.showverified = true;
        if(this.videoData.active_status){
          this.verify = false;
        }
        if(this.videoData.hawaii){
          this.verify = true;
        }
      }
      this.setValues();
      this.index = params.index;
    });
    // this.route.params.subscribe(params => {
    //   this.videoData = JSON.parse(params.data);
    //   this.index = params.index;
    // });
  }

}
