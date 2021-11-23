import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.page.html',
  styleUrls: ['./followers.page.scss'],
})
export class FollowersPage implements OnInit {
  view: boolean;
  constructor(private router: Router) { }

  // notifications() {
  //   this.router.navigate(['/notifications']);
  // }

  toggle() {
    if (this.view === true) {
      this.view = false;
    }
    // else {
    //   this.view = true;
    // }
  }

  ngOnInit() {
    this.view = true;
  }

}
