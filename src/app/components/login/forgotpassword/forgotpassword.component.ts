import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
})
export class ForgotpasswordComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  dismiss() {
    this.modalController.dismiss({
    });
  }

  ngOnInit() {}

}
