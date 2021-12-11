import { AbstractType, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Keyboard } from '@capacitor/keyboard';
import { Platform } from '@ionic/angular';
import { GeneralService } from 'src/app/services/general.service';
import { HttpConfigService } from 'src/app/services/http-config.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  videoData: any;
  profileData: any;
  message = '';
  videos = [];
  showdetails: any;
  index: any;
  transformValue = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public platform: Platform,
    public service: HttpConfigService,
    public generalService: GeneralService
  ) {}

  // notifications() {
  //   this.router.navigate(['/notifications']);
  // }

  async commentVideo(param, indx) {
    this.generalService.showLoader();
    const url = 'videos/' + param['_id'] + '/comment';
    const data = { message: this.message };
    const data1: any = await this.service.postApi(url, data);
    if (data1.status) {
      this.videoData = data1.data[0];
      const videos: any = this.service.getVideo();
      videos[this.index] = this.videoData;
      this.service.setVideo(videos);
      this.message = '';
      // this.videoData[indx]["comment"] = this.videoData[indx]["comment"] + 1;
      // this.showdetails = await this.service.getApi('videos', {});
    } else {
      this.generalService.generalErrorMessage(data1.msg);
      console.log(data1.msg);
    }
    this.generalService.stopLoader();
    // this.router.navigate(['/tabs/home/detail', { data: JSON.stringify(param) }]);
    // this.email = data1.email;
    // this.password = data1.password;
  }

  async profileForUsers(param, indx) {
    // users/details/id
    // user_id
    const url = 'users/details/' + param['user_id'];
    this.generalService.showLoader();
    const data1: any = await this.service.getApi(url, {});
    if (data1.status && data1.data) {
      this.profileData = data1.data;
      this.service.setVideo(data1.data);
      this.generalService.stopLoader();
    }
    this.router.navigate([
      '/profileforusers',
      { data: JSON.stringify(this.profileData[0]), index: indx },
    ]);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.videoData = JSON.parse(params.data);
      this.index = params.index;
      // this.id = params['id'];
    });
    this.platform.ready().then(() => {
      Keyboard.addListener('keyboardWillShow', () => {
        this.transformValue = 'translateY(-245px)';
        document.activeElement.scrollIntoView(true);
      });
      Keyboard.addListener('keyboardWillHide', () => {
        this.transformValue = '';
      });
      Keyboard.addListener('keyboardDidHide', () => {
        this.transformValue = '';
      });
    });
  }
}
