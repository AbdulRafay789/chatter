/* eslint-disable quote-props */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '../services/general.service';
import { HttpConfigService } from '../services/http-config.service';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.page.html',
  styleUrls: ['./users-detail.page.scss'],
})
export class UsersDetailPage implements OnInit {
  likeusers: any;
  view: boolean;
  index: any;
  // videoData: any = [
  //   {
  //     '_id': '619ca529be53a422cd1d6405',
  //     'user_dp': {
  //       'name': 'uploadedImages-1637665673422.png',
  //       'size': 1173,
  //       'originalname': 'Icon material-send.png',
  //       'mimetype': 'image/png',
  //       'path': 'http://35.239.44.221:3000/getfile/uploadedImages-1637665673422.png',
  //     },
  //     'username': 'harisferoz',
  //     'fname': 'haris',
  //     'lname': 'feroz'
  //   },
  //   {
  //     '_id': '61a25a64505628033e5a9d7b',
  //     'user_dp': {
  //       'name': 'uploadedImages-1637587698785.png',
  //       'size': 700427,
  //       'originalname': '12_Search.png',
  //       'mimetype': 'image/png',
  //       'path': 'http://35.239.44.221:3000/getfile/uploadedImages-1637587698785.png',
  //     },
  //     'username': 'SiddiquiBeta',
  //     'fname': 'Siddiqi',
  //     'lname': 'Beta'
  //   }
  // ];
  videoData: any = [];
  constructor(public service: HttpConfigService, public generalService: GeneralService, private route: ActivatedRoute,
    private router: Router,) { }

  toggle() {
    if (this.view === true) {
      this.view = false;
    }
    // else {
    //   this.view = true;
    // }
  }

  async getVideos(param) {
    this.generalService.showLoader();
    const url = 'videos/' + param['_id'] + '/likesusers';
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

  profileForUsers(param, indx) {
    this.router.navigate(['/profileforusers', { data: JSON.stringify(param), index: indx }]);
  }

  async getUsers(param) {
    this.generalService.showLoader();
    const url = 'users/details/' + param['_id'];
    const data1: any = await this.service.getApi(url, {});
    if (data1.status && data1.data) {
      this.router.navigate(['/profileforusers', { data: JSON.stringify(data1.data[0]) }]);
    }
    else {
      if (data1.status === false) {
        this.generalService.generalErrorMessage('No Record Found');
      }
      this.generalService.generalErrorMessage(data1.msg);
      console.log(data1.msg);
    }
    this.generalService.stopLoader();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.videoData = JSON.parse(params.data);
      this.index = params.index;
    });
    this.getVideos(this.videoData);
  }

}
