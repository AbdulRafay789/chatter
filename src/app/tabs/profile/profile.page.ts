import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { HttpConfigService } from 'src/app/services/http-config.service';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Platform, AlertController } from '@ionic/angular';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user_dp = { path: '../../../assets/images/Oval.png' };
  max = new Date().toISOString().split('T')[0];
  // user_dp = {};
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
  images = { imageUrl: null, name: '', url: '' };
  title = '';
  description = '';
  constructor(
    public generalService: GeneralService,
    private router: Router,
    public service: HttpConfigService,
    public plt: Platform,
    private alertCtrl: AlertController
  ) {
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

  // usersPage() {
  //   this.router.navigate(['/userspage', { data: this.value }]);
  // }

  segmentChanged(ev: any) {
    // this.value = 'Posts';
    this.value = ev.detail.value;
    if (this.segment === 'Posts') {
      this.router.navigate(['/uservideos', { data: this.segment }]);
    } else {
      this.router.navigate(['/userspage', { data: this.segment }]);
    }
  }

  async getUsers() {
    // const url = 'users/me/' + param['_id'];
    this.generalService.showLoader();
    const url = 'users/me';
    const data1: any = await this.service.getApi(url, {});
    if (data1.status && data1.data) {
      this.profileData = data1.data;
      this.username = this.profileData.username;
      this.fname = this.profileData.fname;
      this.lname = this.profileData.lname;
      this.mobile = this.profileData.mobile;
      this.email = this.profileData.email;
      this.age = this.profileData.dob;
      this.bio = this.profileData.bio;
      this.location = this.profileData.location;
      this.user_dp = data1.data.user_dp;
      this.generalService.stopLoader();
      // this.router.navigate(['/profileforusers', { data: JSON.stringify(data1.data[0]) }]);
    } else {
      if (data1.status === false) {
        this.generalService.generalToast('No Record Found', 2000);
      }
      this.generalService.generalErrorMessage(data1.msg);
      console.log(data1.msg);
    }
  }

  async patchVideos() {
    this.profileData = [];
    if (this.username == '') {
      this.generalService.generalToast('Username Is Required', 2000);
      return false;
    }
    if (this.fname == '') {
      this.generalService.generalToast('First Name Is Required', 2000);
      return false;
    }
    if (this.lname == '') {
      this.generalService.generalToast('Last Name Is Required', 2000);
      return false;
    }
    if (this.mobile == '') {
      this.generalService.generalToast('Mobile# Is Required', 2000);
      return false;
    }
    if (this.email == '') {
      this.generalService.generalToast('Email Is Required', 2000);
      return false;
    }
    if (this.age == '') {
      this.generalService.generalToast('Age Is Required', 2000);
      return false;
    }
    if (this.bio == '') {
      this.generalService.generalToast('Bio Is Required', 2000);
      return false;
    }
    if (this.location == '') {
      this.generalService.generalToast('Location Is Required', 2000);
      return false;
    }
    this.profileData.username = this.username;
    this.profileData.fname = this.fname;
    this.profileData.lname = this.lname;
    this.profileData.mobile = this.mobile;
    this.profileData.email = this.email;
    this.profileData.dob = this.age;
    this.profileData.bio = this.bio;
    this.profileData.location = this.location;
    let param = {
      username: this.username,
      fname: this.fname,
      lname: this.lname,
      bio: this.bio,
      mobile: this.mobile,
      location: this.location,
      dob: this.age,
    };

    this.generalService.showLoader();
    const url = 'users/update';
    const data1: any = await this.service.postApi(url, param);
    if (data1.status && data1.data) {
      this.profileData = data1.data;
      this.generalService.stopLoader();
    } else {
      this.generalService.generalErrorMessage(data1.msg);
      console.log(data1.msg);
    }

    // this.email = data1.email;
    // this.password = data1.password;
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 50,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      width: 1024,
      height: 768,
      webUseInput: true,
      source: CameraSource.Camera,
      saveToGallery: false,
    });

    const response = await fetch(image.webPath);
    const blob = await response.blob();
    var imageUrl = blob;
    var imagenew = image;
    imagenew.path = new Date().getTime() + '.png';
    // this.saveImage(image);
    this.images = {
      url: (await this.convertBlobToBase64(blob)) as string,
      imageUrl: imageUrl,
      name: imagenew.path.substring(
        imagenew.path.lastIndexOf('/') + 1,
        imagenew.path.length
      ),
    };
    // console.log(imageUrl);
    this.presentAlertMultipleButtons();
  }

  async showActions() {
    const result = await ActionSheet.showActions({
      title: 'Photo Options',
      message: 'Select an option to perform',
      options: [
        {
          title: 'Take Picture',
        },
        {
          title: 'Choose From Gallery',
        },
        {
          title: 'Back',
          style: ActionSheetButtonStyle.Destructive,
        },
      ],
    });
    if (result.index == 0) {
      this.takePicture();
    }
    if (result.index == 1) {
      this.getPicture();
    }

    console.log('Action Sheet result:', result);
  }

  async getPicture() {
    const image = await Camera.pickImages({
      quality: 50,
      width: 1024,
      height: 768,
      limit: 10,
    });

    
    if (image.photos.length > 10) {
      this.generalService.generalToast('Maximum 10 Photos are allowed', 2000);
    }
    image.photos.forEach(async (element) => {
      const response = await fetch(element.webPath);
      const blob = await response.blob();
      var imageUrl = blob;
      var imagenew = image;
      imagenew['path'] = new Date().getTime() + '.png';
      // this.saveImage(image);
      this.images = {
        url: (await this.convertBlobToBase64(blob)) as string,
        imageUrl: imageUrl,
        name: imagenew['path'].substring(
          imagenew['path'].lastIndexOf('/') + 1,
          imagenew['path'].length
        ),
      };
    });
    this.presentAlertMultipleButtons();
    // console.log(imageUrl);
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
    const data1: any = await this.service.postAttachmentApi(
      'users/image',
      formData
    );
    if (data1.status && data1.data) {
      debugger;
      this.user_dp = data1.data.user_dp;
      this.generalService.generalToast(
        'Profile Picture Is Updated SuccessFully',
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
    this.view = true;
    this.getUsers();
  }
}
