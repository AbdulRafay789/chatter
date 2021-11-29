import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { GeneralService } from '../services/general.service';
import { HttpConfigService } from '../services/http-config.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})

export class TabsPage implements OnInit, OnChanges {
  videos = [];
  items = [];
  items1 = {};
  numTimesLeft = 5;
  detailedsource: any;
  videoLike: any;
  videoLikeData: any;
  showdetails: any;
  likeconnect: any;
  interval: number;
  constructor(private router: Router, public service: HttpConfigService, public generalService: GeneralService,
    private loadingController: LoadingController) {
    this.addMoreItems();
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      this.addMoreItems();
      this.numTimesLeft -= 1;
      event.target.complete();
    }, 500);
  }
  addMoreItems() {
    for (let i = 0; i < 15; i++) {
      this.items.push(i);
    }
  }

  // notifications() {
  //   this.router.navigate(['/notifications']);
  // }

  detail(param) {
    this.router.navigate(['/tabs/home/detail', { data: JSON.stringify(param) }]);
  }

  search() {
    this.router.navigate(['/search-results']);
  }

  // pisca() {
  //   this.httpConfigService.getListItems(this.items).subscribe(response => {
  //     console.log(response);
  //     this.items1 = response;
  //   }, error => { console.log(error); });
  //   console.log(this.items1);
  // }

  async getVideos() {
    this.generalService.showLoader();
    const data1: any = await this.service.getApi('videos', {});
    if (data1.status && data1.data) {
      // this.videos = data1.data;
      this.service.setVideo(data1.data);
      this.videos = this.service.getVideo();
      this.generalService.stopLoader();
      // this.videoLike = data1.data._id;
      // this.detailedsource = data1.data[0].videos;
      // let fieldValues
      // this.detailedsource = data1.data.videos.Object.keys(fieldValues).map(key => fieldValues[key]);
    }
    else {
      if (data1.status === false) {
        this.generalService.generalErrorMessage('No Record Found');
      }
      this.generalService.generalErrorMessage(data1.msg);
      console.log(data1.msg);
    }

    // this.email = data1.email;
    // this.password = data1.password;
  }

  async patchVideos() {
    const data1: any = await this.service.postAttachmentApi('videos', {});
    if (data1.status && data1.data) {
      this.videos = data1.data;
    }
    else {
      this.generalService.generalErrorMessage(data1.msg);
      console.log(data1.msg);
    }

    // this.email = data1.email;
    // this.password = data1.password;
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Click the backdrop to dismiss early...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed with role:', role);
  }

  async likeVideo(param, indx) {
    // this.videoLike = this.videos._id
    // param.islike = true;
    if (param.islike) {
      this.generalService.showLoader();
      this.likeconnect = param.like;
      const url = 'videos/' + param['_id'] + '/unlike';
      const data1: any = await this.service.deleteApi(url, {});
      if (data1.status) {
        debugger;
        this.videos[indx]["total_likes"] = this.videos[indx]["total_likes"] - 1;
        this.generalService.stopLoader();
        // this.router.navigate(['/tabs']);
      }
      else {
        this.generalService.generalErrorMessage(data1.msg);
        console.log(data1.msg);
      }

    }
    else {
      this.generalService.showLoader();
      const url = 'videos/' + param['_id'] + '/like';
      const data1: any = await this.service.postApi(url, {});
      if (data1.status && data1.data) {
        this.videoLikeData = data1;
        debugger;
        this.videos.splice(indx, 1, data1.data);
        this.generalService.stopLoader();
        // this.generalService.generalToast('Logged In SuccessFully', 2000);
        // this.router.navigate(['/tabs']);
      }
      else {
        this.generalService.generalErrorMessage(data1.msg);
        console.log(data1.msg);
      }
    }

    // this.email = data1.email;
    // this.password = data1.password;
  }

  async unlikeVideo(param, indx) {
    // this.videoLike = this.videos._id
    const url = 'videos/' + param['_id'] + '/like';
    const data1: any = await this.service.deleteApi(url, {});
    if (data1.status) {
      debugger;
      this.videos[indx]["total_likes"] = this.videos[indx]["total_likes"] - 1;
      // this.router.navigate(['/tabs']);
    }
    else {
      this.generalService.generalErrorMessage(data1.msg);
      console.log(data1.msg);
    }

    // this.email = data1.email;
    // this.password = data1.password;
  }

  async viewVideo(param, indx) {
    // this.videoLike = this.videos._id
    this.generalService.showLoader();
    const url = 'videos/' + param['_id'] + '/view';
    const data1: any = await this.service.postApi(url, {});
    if (data1.status) {
      debugger;
      // this.showdetails = data1.data;
      this.videos[indx]["total_views"] = this.videos[indx]["total_views"] + 1;
      this.generalService.stopLoader();
    }
    else {
      this.generalService.generalErrorMessage(data1.msg);
      console.log(data1.msg);
    }
    this.router.navigate(['/tabs/home/detail', { data: JSON.stringify(param), index: indx }]);
    // this.email = data1.email;
    // this.password = data1.password;
  }

  usersDetail(param, indx) {
    // this.generalService.showLoader();
    this.router.navigate(['/users-detail', { data: JSON.stringify(param), index: indx }]);
    // this.generalService.stopLoader();
  }

  ngOnInit() {
    this.getVideos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.videos = this.service.getVideo();
  }

}
