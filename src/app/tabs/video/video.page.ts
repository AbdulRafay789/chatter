import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';
import { GeneralService } from 'src/app/services/general.service';
import { HttpConfigService } from 'src/app/services/http-config.service';
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';

import { Chooser } from '@ionic-native/chooser/ngx';

import { FileChooser } from '@ionic-native/file-chooser/ngx';

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit {
  images = [];
  title = 'test';
  description = 'desc';
  constructor(
    public service: HttpConfigService,
    public plt: Platform,
    public generalService: GeneralService,
    private chooser: FileChooser,
    private chooserMultiple: Chooser
  ) {}

  // notifications() {
  //   this.router.navigate(['/notifications']);
  // }

  ngOnInit() {}
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
          title: 'Cancel',
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
  async showActionsVideo() {
    const result = await ActionSheet.showActions({
      title: 'Video Options',
      message: 'Select an option to perform',
      options: [
        {
          title: 'Capture Video',
        },
        {
          title: 'Choose From Gallery',
        },
        {
          title: 'Cancel',
          style: ActionSheetButtonStyle.Destructive,
        },
      ],
    });
    if (result.index == 0) {
      this.takeVideo();
    }
    if (result.index == 1) {
      this.getVideo();
    }

    console.log('Action Sheet result:', result);
  }
  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 50,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        webUseInput: true,
        source: CameraSource.Camera,
        saveToGallery: false,
      });
      if (this.images.length == 10) {
        this.generalService.generalToast('Maximum 10 Photos are allowed', 2000);
      }

      const contents: any = await this.readAsBase64(image);
      // console.log(contents);
      const response = await fetch(image.webPath);
      const blob = await response.blob();
      var imageUrl = blob;
      var imagenew = image;
      imagenew.path = new Date().getTime() + '.png';
      // this.saveImage(image);
      this.images.push({
        url: (await this.convertBlobToBase64(blob)) as string,
        imageUrl: imageUrl,
        video: false,
        name: imagenew.path.substring(
          imagenew.path.lastIndexOf('/') + 1,
          imagenew.path.length
        ),
      });
      // console.log(imageUrl);
    } catch (error) {
      debugger;
    }
  }
  async getPicture() {
    // const image = await Camera.getPhoto({
    //   quality: 50,
    //   allowEditing: true,
    //   resultType: CameraResultType.Uri,
    //   width: 1024,
    //   height: 768,
    //   webUseInput: true,
    // });
    const image = await Camera.pickImages({
      quality: 50,
      width: 1024,
      height: 768,
      limit: 10,
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    // const file = await Filesystem.readFile({
    //   path: image.path,
    // });
    // const contents: any = await this.readAsBase64(image);
    // console.log(contents);
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
      this.images.push({
        url: (await this.convertBlobToBase64(blob)) as string,
        imageUrl: imageUrl,
        video: false,
        name: imagenew['path'].substring(
          imagenew['path'].lastIndexOf('/') + 1,
          imagenew['path'].length
        ),
      });
    });

    // console.log(imageUrl);
  }
  async takeVideo() {
    // try {
    //   const options: VideoCapturePlusOptions = {
    //     limit: 10,
    //     highquality: false,
    //   };
    //   const image = this.videoCapturePlus.captureVideo(options);
    //   debugger;
    //   if (this.images.length == 10) {
    //     this.generalService.generalToast('Maximum 10 Videos are allowed', 2000);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   debugger;
    // }
  }
  async getVideo() {
    if (this.images.length == 10) {
      this.generalService.generalToast('Maximum 10 Photos are allowed', 2000);
    }
    try {
      // const file = await this.chooser.open();
      const file = await this.chooser.open({ mime: 'video/mp4' });
      // const file = await this.chooserMultiple.getFile('video/mp4');
      debugger;
      const fileread = await Filesystem.readFile({
        path: file,
        // path: file.uri,
      });
      var fileUrl = 'data:video/mp4;base64,' + fileread.data;
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      var imageUrl = blob;
      var imagenew = {};
      imagenew['path'] = new Date().getTime() + '.mp4';
      this.images.push({
        url: (await this.convertBlobToBase64(blob)) as string,
        video: true,
        imageUrl: imageUrl,
        name: imagenew['path'],
      });
    } catch (error) {
      console.log(error);
    }
  }
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
    this.images.forEach((element) => {
      formData.append('uploadedImages', element.imageUrl, element.name);
    });
    const data1: any = await this.service.postAttachmentApi('videos', formData);
    if (data1.status && data1.data) {
      this.generalService.generalToast(
        'Your Post Is Uploaded SuccessFully',
        2000
      );
    } else {
      this.generalService.generalToast(data1.msg);
      console.log(data1.msg);
    }
    this.generalService.stopLoader();
    // this.email = data1.email;
    // this.password = data1.password;
  }
  async saveImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);

    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: `downloads/${fileName}`,
      data: base64Data,
      directory: Directory.Data,
    });
    this.images.push(savedFile.uri);
    debugger;
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
}
