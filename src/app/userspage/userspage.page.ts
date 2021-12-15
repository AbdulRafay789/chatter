import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '../services/general.service';
import { HttpConfigService } from '../services/http-config.service';

@Component({
  selector: 'app-userspage',
  templateUrl: './userspage.page.html',
  styleUrls: ['./userspage.page.scss'],
})
export class UserspagePage implements OnInit {
  galleryType = 'videos';
  videosUsers = {
    users: [],
    videos: [],
  };
  search = '';
  videos = [];
  Data = [];
  value: any;
  user_id :any="";
  userData: any = {};
  constructor(
    private router: Router,
    public service: HttpConfigService,
    public generalService: GeneralService,
    private route: ActivatedRoute
  ) {
    let tempuser = this.service.getuser();
    this.userData = tempuser.user;
  }

  notifications() {
    this.router.navigate(['/notifications']);
  }

  setVideos(elem) {
    this.videos = [];
    elem.forEach((element) => {
      let obj = {};
      element.videos.forEach((vid) => {
        if (vid.path) {
          obj = vid;
          obj['_id'] = element['_id'];
          if (vid.path.indexOf('.mp4') == -1) {
            obj['isvideo'] = false;
          } else {
            obj['isvideo'] = true;
          }
        }
      });
      this.videos.push(obj);
    });
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.videosUsers.videos.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  async gotoUser(param) {
    this.generalService.showLoader();
    const url = 'users/details/' + param['_id'];
    const data1: any = await this.service.getApi(url, {});
    if (data1.status && data1.data) {
      this.router.navigate([
        '/profileforusers',
        { data: JSON.stringify(data1.data) },
      ]);
    } else {
      this.generalService.generalErrorMessage(data1.msg);
      console.log(data1.msg);
    }
    this.generalService.stopLoader();
  }

  async viewVideo(param) {
    let obj = {};
    let indx = 0;
    this.videosUsers.videos.forEach((element, i) => {
      if (param['_id'].toString() == element['_id'].toString()) {
        obj = element;
        indx = i;
      }
    });
    this.router.navigate([
      '/tabs/home/detail',
      { data: JSON.stringify(obj), index: indx },
    ]);
  }

  async getConnectUsers() {
    const url = 'users/connectUsers';
    this.generalService.showLoader();
    let params={};
    if(this.user_id != ""){
      params['user_id']=this.user_id;
    }
    const data1: any = await this.service.postApi(url, params);
    if (data1.status && data1.data) {
      this.Data = data1.data;
      // this.service.setVideo(data1.data);
    } else {
      this.generalService.generalToast(data1.msg, 2000);
      console.log(data1.msg);
    }
    this.generalService.stopLoader();
  }

  async getConnectedUsers() {
    const url = 'users/connectedUsers';
    this.generalService.showLoader();
    let params={};
    if(this.user_id != ""){
      params['user_id']=this.user_id;
    }
    const data1: any = await this.service.postApi(url, params);
    if (data1.status && data1.data) {
      this.Data = data1.data;
      // this.service.setVideo(data1.data);
    } else {
      this.generalService.generalToast(data1.msg, 2000);
      console.log(data1.msg);
    }
    this.generalService.stopLoader();
  }

  async getLikeUsers() {
    let url = 'melikeusers';
    this.generalService.showLoader();
    let params={};
    if(this.user_id != ""){
      params['user_id']=this.user_id;
    }
    const data1: any = await this.service.postApi(url, params);
    if (data1.status && data1.data) {
      this.Data = data1.data;
      // this.service.setVideo(data1.data);
    } else {
      this.generalService.generalToast(data1.msg, 2000);
      console.log(data1.msg);
    }
    this.generalService.stopLoader();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.value = params.data;
      if(params.user_id){
        this.user_id = params.user_id;
      }
      if (this.value === 'Like') {
        this.getLikeUsers();
        return;
      }
      if (this.value === 'Connect') {
        this.getConnectUsers();
        return;
      }
      if (this.value === 'Connected') {
        this.getConnectedUsers();
        return;
      }
    });
    
  }
}
