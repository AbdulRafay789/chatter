import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
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
  constructor(public router: Router, public menu: MenuController, public nav: NavController) { }

  home() {
    // this.router.navigate(['/tabs']);
    this.nav.navigateRoot('/tabs');
    setTimeout(() => {
      this.menu.close();
    }, 1000);
  }

  chat() {
    // this.router.navigate(['/tabs/chat']);
    this.nav.navigateRoot('/tabs/chat');
    setTimeout(() => {
      this.menu.close();
    }, 1000);
  }

  profile() {
    // this.router.navigate(['/tabs/profile']);
    this.nav.navigateRoot('/tabs/profile');
    setTimeout(() => {
      this.menu.close();
    }, 1000);
  }

}
