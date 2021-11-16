import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private router: Router,
    public modalController: ModalController
  ) { }

  pisca() {
    this.router.navigate(['/folder/inbox']);
  }

  signup() {
    this.router.navigate(['/signup']);
  }

  home() {
    // this.router.navigate(['/folder/inbox']);
    this.router.navigate(['/tabs']);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ForgotpasswordComponent,
      cssClass: 'my-custom-class',
      backdropDismiss: true,
      mode: 'ios',
      showBackdrop: true,
    });
    return await modal.present();
  }

  ngOnInit() { }
}
