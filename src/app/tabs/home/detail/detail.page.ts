import { AbstractType, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { HttpConfigService } from 'src/app/services/http-config.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  videoData: any;
  message = '';
  videos = [];
  showdetails: any;
  constructor(private router: Router, private route: ActivatedRoute, public service: HttpConfigService,
    public generalService: GeneralService,) {

  }

  // notifications() {
  //   this.router.navigate(['/notifications']);
  // }

  async commentVideo(param, indx) {
    const url = 'videos/' + param['_id'] + '/comment';
    const data = { message: this.message };
    const data1: any = await this.service.postApi(url, data);
    if (data1.status) {
      debugger;
      this.videoData = data1.data;
      // this.videoData[indx]["comment"] = this.videoData[indx]["comment"] + 1;
      // this.showdetails = await this.service.getApi('videos', {});
    }
    else {
      this.generalService.generalErrorMessage(data1.msg);
      console.log(data1.msg);
    }
    // this.router.navigate(['/tabs/home/detail', { data: JSON.stringify(param) }]);
    // this.email = data1.email;
    // this.password = data1.password;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.videoData = JSON.parse(params.data);
      debugger;
      // this.id = params['id'];
    });
  }

}
