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

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.videoData = JSON.parse(params.data);
      this.index = params.index;
    });
    // this.getVideos(this.videoData);
  }

}
