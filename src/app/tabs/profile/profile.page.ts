import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  view: boolean;
  constructor(private router: Router) {

  }

  toggle() {
    if (this.view === true) {
      this.view = false;
    }
    else {
      this.view = true;
    }
    console.log(this.view);
  }

  // notifications() {
  //   this.router.navigate(['/notifications']);
  // }

  ngOnInit() {
    this.view = true;
  }

}
