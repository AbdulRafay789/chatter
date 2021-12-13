import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar, Style } from '@capacitor/status-bar';
import { MenuController, NavController, Platform } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { LoginPage } from './components/login/login.page';
import { GeneralService } from './services/general.service';
import { globalConfig } from './services/global.config';
import { HttpConfigService } from './services/http-config.service';
import { SubjectsService } from './services/subjects.service';
import { TabsPage } from './tabs/tabs.page';
import { SplashScreen, SplashScreenPlugin } from '@capacitor/splash-screen';
import { Keyboard } from '@capacitor/keyboard';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  rootPage: any = LoginPage;
  username = '';
  user = {
    username: 'JohnDoe',
    user_dp: {
      path: '../assets/images/menu-icon-5.png',
    },
    fname: 'John',
    lname: 'Doe',
  };
  public appPages = [
    { title: 'Home', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Create Post', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Video', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Chat', url: '/folder/Archived', icon: 'archive' },
    { title: 'Profile', url: '/folder/Trash', icon: 'trash' },
  ];
  userDetails: Subscription;
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    public router: Router,
    public menu: MenuController,
    public nav: NavController,
    private injector: Injector,
    public platform: Platform,
    public service: HttpConfigService,
    public generalService: GeneralService,
    private subjectService: SubjectsService // public SplashScreen: SplashScreenPlugin
  ) {
    globalConfig.injector = injector;
    // this.username = this.service.getuser()['user']['user'];
    this.initializeApp();
    const token = localStorage.getItem('token');
    if (token && token.indexOf('bearer ') > -1) {
      this.rootPage = TabsPage;
    }
  }

  ngOnInit() {
    this.userDetails = this.subjectService.userDetails.subscribe(
      (res) => {
        console.log(res);
        this.user = res;
      },
      (err) => {
        console.log('error : ', err);
      }
    );
  }

  ngOnDestroy() {
    this.userDetails.unsubscribe();
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
    this.router.navigate(['/userspage', { data: "Connect" }]);
    // this.nav.navigateRoot('/followers');
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

  async logout() {
    const url = 'users/logoutAll';
    this.generalService.showLoader();
    const data1: any = await this.service.postApi(url, {});
    if (data1.status && data1.data) {
      // this.videos = data1.data;
      this.service.setVideo(data1.data);
      this.nav.navigateRoot('/login');
      setTimeout(() => {
        this.menu.close();
      }, 100);
      this.generalService.generalToast(data1.msg, 2000);
    } else {
      if (data1.status === false) {
        this.generalService.generalToast(data1.msg, 2000);
      }
      // this.generalService.generalToast(data1.msg);
      // console.log(data1.msg);
    }
    this.generalService.stopLoader();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // Keyboard.addListener("keyboardWillShow", ({ keyboardHeight }) => {
        // alert(keyboardHeight);
        // requestAnimationFrame(() => {
        //   document.body.style.transform = `translateY(-${keyboardHeight-value}px)`;
        //   document.activeElement.scrollIntoView(true);
        // });
      // });
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000);
    });
  }
}
