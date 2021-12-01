import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { HttpConfigService } from 'src/app/services/http-config.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  username = '';
  fname = '';
  lname = '';
  mobile = '';
  email = '';
  age = '';
  password = '';
  bio = '';
  location = '';
  view: boolean;
  value: 'Posts';
  segment: any;
  profileData: any = [];
  profileDataForPatch: any = [];
  constructor(public generalService: GeneralService, private router: Router, public service: HttpConfigService,) {
    this.segment = 'Posts';
  }

  toggle() {
    if (this.view === true) {
      this.view = false;
    }
    // else {
    //   this.view = true;
    // }
  }

  // notifications() {
  //   this.router.navigate(['/notifications']);
  // }

  segmentChanged(ev: any) {
    this.value = 'Posts';
    this.value = ev.detail.value;
  }

  async getUsers() {
    // const url = 'users/me/' + param['_id'];
    this.generalService.showLoader();
    const url = 'users/me';
    const data1: any = await this.service.getApi(url, {});
    if (data1.status && data1.data) {
      this.profileData = data1.data;
      // this.router.navigate(['/profileforusers', { data: JSON.stringify(data1.data[0]) }]);
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

  async patchVideos() {

    this.profileDataForPatch.username = this.profileData.username;
    this.profileDataForPatch.fname = this.profileData.fname;
    this.profileDataForPatch.lname = this.profileData.lname;
    this.profileDataForPatch.mobile = this.profileData.mobile;
    this.profileDataForPatch.email = this.profileData.email;
    this.profileDataForPatch.age = this.profileData.age;
    this.profileDataForPatch.bio = this.profileData.bio;
    this.profileDataForPatch.location = this.profileData.location;

    this.generalService.showLoader();
    const url = 'users/me';
    const data1: any = await this.service.postApi(url, this.profileDataForPatch);
    if (data1.status && data1.data) {
      this.profileData = data1.data;
    }
    else {
      this.generalService.generalErrorMessage(data1.msg);
      console.log(data1.msg);
    }
    this.generalService.stopLoader();

    // this.email = data1.email;
    // this.password = data1.password;
  }

  ngOnInit() {
    this.view = true;
    this.getUsers();
  }

}
