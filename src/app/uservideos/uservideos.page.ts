import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { GeneralService } from '../services/general.service';
import { HttpConfigService } from '../services/http-config.service';

@Component({
  selector: 'app-uservideos',
  templateUrl: './uservideos.page.html',
  styleUrls: ['./uservideos.page.scss'],
})
export class UservideosPage implements OnInit, OnChanges {
  value: any;
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
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public service: HttpConfigService,
    public generalService: GeneralService,
    private loadingController: LoadingController
  ) {
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
    this.router.navigate([
      '/tabs/home/detail',
      { data: JSON.stringify(param) },
    ]);
  }

  search() {
    this.router.navigate(['/search-results']);
  }

  async getVideos() {
    this.generalService.showLoader();
    const data1: any = await this.service.getApi('videos', {});
    if (data1.status && data1.data) {
      this.service.setVideo(data1.data);
      this.videos = this.service.getVideo();
    } else {
      if (data1.status === false) {
        this.generalService.generalToast('No Record Found', 2000);
      }
      this.generalService.generalToast(data1.msg, 2000);
      console.log(data1.msg);
    }
    this.generalService.stopLoader();
  }

  async patchVideos() {
    const data1: any = await this.service.postAttachmentApi('videos', {});
    if (data1.status && data1.data) {
      this.videos = data1.data;
    } else {
      this.generalService.generalToast(data1.msg, 2000);
      console.log(data1.msg);
    }
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Click the backdrop to dismiss early...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed with role:', role);
  }

  async likeVideo(param, indx) {
    if (param.islike) {
      this.likeconnect = param.like;
      const url = 'videos/' + param['_id'] + '/unlike';
      const data1: any = await this.service.deleteApi(url, {});
      if (data1.status) {
        this.videos[indx]['total_likes'] = this.videos[indx]['total_likes'] - 1;
      } else {
        this.generalService.generalToast(data1.msg, 2000);
        console.log(data1.msg);
      }
    } else {
      const url = 'videos/' + param['_id'] + '/like';
      const data1: any = await this.service.postApi(url, {});
      if (data1.status && data1.data) {
        this.videoLikeData = data1;
        this.videos.splice(indx, 1, data1.data);
      } else {
        this.generalService.generalToast(data1.msg, 2000);
        console.log(data1.msg);
      }
    }
  }

  async unlikeVideo(param, indx) {
    const url = 'videos/' + param['_id'] + '/like';
    const data1: any = await this.service.deleteApi(url, {});
    if (data1.status) {
      this.videos[indx]['total_likes'] = this.videos[indx]['total_likes'] - 1;
    } else {
      this.generalService.generalToast(data1.msg, 2000);
      console.log(data1.msg);
    }
  }

  async viewVideo(param, indx) {
    this.generalService.showLoader();
    const url = 'videos/' + param['_id'] + '/view';
    const data1: any = await this.service.postApi(url, {});
    if (data1.status) {
      this.videos[indx]['total_views'] = this.videos[indx]['total_views'] + 1;
    } else {
      this.generalService.generalToast(data1.msg, 2000);
      console.log(data1.msg);
    }
    this.generalService.stopLoader();
    this.router.navigate([
      '/tabs/home/detail',
      { data: JSON.stringify(param), index: indx },
    ]);
  }

  usersDetail(param, indx) {
    this.router.navigate([
      '/users-detail',
      { data: JSON.stringify(param), index: indx },
    ]);
  }

  async getPosts() {
    const url = 'mine';
    this.generalService.showLoader();
    const data1: any = await this.service.getApi(url, {});
    if (data1.status && data1.data) {
      this.service.setVideo(data1.data);
      this.videos = this.service.getVideo();
      // this.videos = data1.data;
    } else {
      this.generalService.generalToast(data1.msg, 2000);
      console.log(data1.msg);
    }
    this.generalService.stopLoader();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.value = params.data;
    });
    if (this.value === 'Posts') {
      this.getPosts();
      return;
    }
    this.getVideos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.videos = this.service.getVideo();
  }
}
