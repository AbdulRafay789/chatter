import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  constructor(private router: Router) { }

  notifications() {
    this.router.navigate(['/notifications']);
  }

  ngOnInit() {
  }

}
