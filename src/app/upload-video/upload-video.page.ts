import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.page.html',
  styleUrls: ['./upload-video.page.scss'],
})
export class UploadVideoPage implements OnInit {

  constructor(private router: Router) { }

  notifications() {
    this.router.navigate(['/notifications']);
  }

  ngOnInit() {
  }

}
