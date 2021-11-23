import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  view: boolean;
  value: 'Posts';
  segment: any;
  constructor(private router: Router) {
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

  // notifications() {
  //   this.router.navigate(['/notifications']);
  // }

  segmentChanged(ev: any) {
    this.value = 'Posts';
    this.value = ev.detail.value;
  }

  ngOnInit() {
    this.view = true;
  }

}
