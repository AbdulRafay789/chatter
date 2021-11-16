import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Create Post', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Video', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Chat', url: '/folder/Archived', icon: 'archive' },
    { title: 'Profile', url: '/folder/Trash', icon: 'trash' },
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(public router: Router) { }

  home() {
    this.router.navigate(['/tabs']);
  }

  chat() {
    this.router.navigate(['/tabs/chat']);
  }

  profile() {
    this.router.navigate(['/tabs/profile']);
  }

}
