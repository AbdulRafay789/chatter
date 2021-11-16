import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private router: Router,public modalController: ModalController) { }

  backtologin(){
    this.router.navigate(['/login']);
  }

  // async presentModal() {
  //   const modal = await this.modalController.create({
  //     component: ForgotpasswordComponent,
  //     cssClass: 'my-custom-class',
  //     backdropDismiss:true,
  //     mode: 'ios',
  //     showBackdrop: true
  //   });
  //   return await modal.present();
  // }


  ngOnInit() {
  }

}
