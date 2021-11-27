import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar } from '@capacitor/status-bar';
import { MenuController, NavController, Platform } from '@ionic/angular';
import { LoginPage } from './components/login/login.page';
import { globalConfig } from './services/global.config';
import { TabsPage } from './tabs/tabs.page';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  rootPage: any = LoginPage;
  public appPages = [
    { title: 'Home', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Create Post', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Video', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Chat', url: '/folder/Archived', icon: 'archive' },
    { title: 'Profile', url: '/folder/Trash', icon: 'trash' },
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(public router: Router, public menu: MenuController, public nav: NavController, private injector: Injector,
    public platform: Platform,) {
    globalConfig.injector = injector;
    this.initializeApp();
    const token = localStorage.getItem('token');
    if (token && token.indexOf('bearer ') > -1) {
      this.rootPage = TabsPage;
    }
  }

  home() {
    // this.router.navigate(['/tabs']);
    this.nav.navigateRoot('/tabs');
    setTimeout(() => {
      this.menu.close();
    }, 100);
  }

  chat() {
    // this.router.navigate(['/tabs/chat']);
    this.nav.navigateRoot('/tabs/chat');
    setTimeout(() => {
      this.menu.close();
    }, 100);
  }

  profile() {
    // this.router.navigate(['/tabs/profile']);
    this.nav.navigateRoot('/tabs/profile');
    setTimeout(() => {
      this.menu.close();
    }, 100);
  }

  verifyid() {
    // this.router.navigate(['/tabs/profile']);
    this.nav.navigateRoot('/verify-id');
    setTimeout(() => {
      this.menu.close();
    }, 100);
  }

  connections() {
    // this.router.navigate(['/tabs/profile']);
    this.nav.navigateRoot('/followers');
    setTimeout(() => {
      this.menu.close();
    }, 100);
  }

  createvideo() {
    // this.router.navigate(['/tabs/profile']);
    this.nav.navigateRoot('/tabs/video');
    setTimeout(() => {
      this.menu.close();
    }, 100);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
    });
  }

}
