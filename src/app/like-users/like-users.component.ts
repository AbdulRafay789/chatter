import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-like-users',
  templateUrl: './like-users.component.html',
  styleUrls: ['./like-users.component.scss'],
})
export class LikeUsersComponent implements OnInit {
  currentModal = null;
  likeUsers = [];
  constructor(
    private modalController: ModalController,
    private general: GeneralService,
    private router: Router
  ) {}

  getUsers() {
    debugger;
    this.likeUsers = this.general.likeUsers;
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  profileForUsers(param, indx) {
    this.modalController.dismiss({
      dismissed: true,
    });
    this.router.navigate([
      '/profileforusers',
      { data: JSON.stringify(param), index: indx },
    ]);
  }

  ngOnInit() {
    debugger;
    this.getUsers();
  }
}
