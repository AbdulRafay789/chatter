import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';
import { GeneralService } from 'src/app/services/general.service';
import { HttpConfigService } from 'src/app/services/http-config.service';

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
    public generalService: GeneralService
  ) {}

  // notifications() {
  //   this.router.navigate(['/notifications']);
  // }

  ngOnInit() {}
  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 50,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      width: 1024,
      height: 768,
      webUseInput: true,
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
    const response = await fetch(image.webPath);
    const blob = await response.blob();
    var imageUrl = blob;
    // this.saveImage(image);
    this.images.push({
      imageUrl: imageUrl,
      name: image.path.substring(
        image.path.lastIndexOf('/') + 1,
        image.path.length
      ),
    });
    // console.log(imageUrl);
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

    debugger;
    const data1: any = await this.service.postAttachmentApi('videos', formData);
    if (data1.status && data1.data) {
      this.generalService.generalToast(
        'Your Post In Uploaded SuccessFully',
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
    debugger;
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
