import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit {

  constructor(private camera: Camera) { }

  // notifications() {
  //   this.router.navigate(['/notifications']);
  // }

  ngOnInit() {
  }
  GalleryImages() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth:1024,
      targetHeight:768
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        debugger;
        console.log("Camera issue: ");
        console.log(imageData);
        // Do something with the new photo
      },
      (err) => {
        // Handle error
        console.log("Camera issue: " + err);
      }
    );
  }

}
