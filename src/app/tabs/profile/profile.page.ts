import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  // view: boolean;
  constructor(private router: Router) { }

  // toggle() {
  //   this.view = !this.view;
  // }

  notifications() {
    this.router.navigate(['/notifications']);
  }

  ngOnInit() {
  }

}
