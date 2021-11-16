import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.page.html',
  styleUrls: ['./followers.page.scss'],
})
export class FollowersPage implements OnInit {

  constructor(private router: Router) { }

  notifications() {
    this.router.navigate(['/notifications']);
  }

  ngOnInit() {
  }

}
