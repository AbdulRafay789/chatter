import { AbstractType, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Keyboard } from '@capacitor/keyboard';
import { AlertController, Platform } from '@ionic/angular';
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
    public generalService: GeneralService,
    private alertCtrl: AlertController
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
      { data: JSON.stringify(this.profileData), index: indx },
    ]);
  }

  async deletePost(param) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Warning',
      mode: 'ios',
      // subHeader: 'Subtitle',
      message: 'Are You Sure You Want To Delete This Post?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Yes',
          role: 'submit',
          cssClass: 'primary',
          handler: (blah) => {
            // this.SavePost();
          },
        },
      ],
    });

    await alert.present();
  }

  async deleteVideo(param) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Warning',
      mode: 'ios',
      // subHeader: 'Subtitle',
      message: 'Are You Sure You Want To Delete This Video?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Yes',
          role: 'submit',
          cssClass: 'primary',
          handler: (blah) => {
            // this.SavePost();
          },
        },
      ],
    });

    await alert.present();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.videoData = JSON.parse(params.data);
      this.index = params.index;
      // this.id = params['id'];
    });
    this.platform.ready().then(() => {
      Keyboard.addListener('keyboardWillShow', () => {
        requestAnimationFrame(() => {
          this.transformValue = 'translateY(-244px)';
          document.activeElement.scrollIntoView(true);
        });
      });
      Keyboard.addListener('keyboardWillHide', () => {
        requestAnimationFrame(() => {
          this.transformValue = '';
        });
      });
      Keyboard.addListener('keyboardDidHide', () => {
        requestAnimationFrame(() => {
          this.transformValue = '';
        });
      });
    });
  }
}
