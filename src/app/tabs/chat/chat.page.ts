import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  constructor(private router: Router) { }

  messages() {
    this.router.navigate(['/tabs/chat/messages']);
  }
  // notifications() {
  //   this.router.navigate(['/notifications']);
  // }

  ngOnInit() {
  }

}
