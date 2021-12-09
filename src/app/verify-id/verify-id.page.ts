import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { GeneralService } from '../services/general.service';
import { HttpConfigService } from '../services/http-config.service';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
@Component({
  selector: 'app-verify-id',
  templateUrl: './verify-id.page.html',
  styleUrls: ['./verify-id.page.scss'],
})
export class VerifyIdPage implements OnInit {
  user_dp = { path: '../../assets/images/Group 8262-1.png' };
  images = { imageUrl: null, name: '', url: '' };
  images1 = { imageUrl: null, name: '', url: '' };
  title = '';
  description = '';
  user = {
    user_dp: { path: '../../assets/images/Group 8262-1.png' },
    front: { path: '../../assets/images/Group 8262-1.png', created_at: '' },
    back: { path: '../../assets/images/Group 8262-1.png' },
    active_status: false,
  };
  constructor(
    public generalService: GeneralService,
    private router: Router,
    public service: HttpConfigService,
    public plt: Platform,
    private alertCtrl: AlertController
  ) {}

  // notifications() {
  //   this.router.navigate(['/notifications']);
  // }

  async takePicture(flag) {
    const image = await Camera.getPhoto({
      quality: 50,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      width: 1024,
      height: 768,
      webUseInput: true,
    });

    const response = await fetch(image.webPath);
    const blob = await response.blob();
    var imageUrl = blob;
    var imagenew = image;
    imagenew.path = new Date().getTime() + '.png';
    // this.saveImage(image);
    if (flag) {
      this.images = {
        url: (await this.convertBlobToBase64(blob)) as string,
        imageUrl: imageUrl,
        name: imagenew.path.substring(
          imagenew.path.lastIndexOf('/') + 1,
          imagenew.path.length
        ),
      };
    } else {
      this.images1 = {
        url: (await this.convertBlobToBase64(blob)) as string,
        imageUrl: imageUrl,
        name: imagenew.path.substring(
          imagenew.path.lastIndexOf('/') + 1,
          imagenew.path.length
        ),
      };
    }

    // console.log(imageUrl);
    // this.presentAlertMultipleButtons();
  }

  async presentAlertMultipleButtons() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Confirm',
      mode: 'ios',
      // subHeader: 'Subtitle',
      message: 'Are You Sure You Want To Update Your Profile Picture?',
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
          text: 'Update',
          role: 'submit',
          cssClass: 'primary',
          handler: (blah) => {
            this.SavePost();
          },
        },
      ],
    });

    await alert.present();
  }

  private async readAsBase64(photo: Photo) {
    if (this.plt.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path,
      });

      return file.data;
    } else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      return (await this.convertBlobToBase64(blob)) as string;
      // return blob;
    }
  }

  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  async SavePost() {
    if (this.images.name == '') {
      this.generalService.generalToast('Please Select Front Image', 2000);
      return false;
    }
    if (this.images1.name == '') {
      this.generalService.generalToast('Please Select Back Image', 2000);
      return false;
    }
    this.generalService.showLoader();
    // const params = {
    //   title: this.title,
    //   description: this.description,
    //   uploadedImages: this.images
    // };
    let formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('uploadedImages', this.images.imageUrl, this.images.name);
    formData.append('uploadedImages', this.images1.imageUrl, this.images1.name);
    const data1: any = await this.service.postAttachmentApi(
      'users/verify',
      formData
    );
    if (data1.status && data1.data) {
      this.service.setuser({ user: data1.data });
      // this.user_dp = data1.data.user_dp;
      // this.front = data1.data.front.path;
      // this.back = data1.data.back.path;
      // this.generalService.generalToast(
      //   'Your Verification Is Under Process & will Take 2-3 Business Days To Take Effect',
      //   2000
      // );
      this.generalService.generalToast(
        'Your Verification Is Under Process',
        2000
      );
    } else {
      this.generalService.generalToast(data1.msg, 2000);
      console.log(data1.msg);
    }
    this.generalService.stopLoader();
    // this.email = data1.email;
    // this.password = data1.password;
  }

  ngOnInit() {
    let tempuser = this.service.getuser();

    this.user = tempuser.user;
  }
}
