import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { HttpConfigService } from '../services/http-config.service';

@Component({
  selector: 'app-like-users',
  templateUrl: './like-users.component.html',
  styleUrls: ['./like-users.component.scss'],
})
export class LikeUsersComponent implements OnInit {
  currentModal = null;
  likeUsers = [];
  user:any={};
  constructor(
    private modalController: ModalController,
    private general: GeneralService,
    private router: Router,
    public service: HttpConfigService
  ) {
    let tempuser = this.service.getuser();
    this.user = tempuser.user;
  }

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

  async profileForUsers(param, indx) {
    this.modalController.dismiss({
      dismissed: true,
    });
    this.general.showLoader();
    // const url = 'users/details/' + param['_id'];
    const url = 'users/details/' + param['_id'];
    const data1: any = await this.service.getApi(url, {});
    if (data1.status && data1.data) {
      debugger;
      if(this.user._id.toString() == data1.data._id.toString()){
        this.router.navigate([
          '/tabs/profile'
        ]);
      }
      else{
        this.router.navigate([
          '/profileforusers',
          { data: JSON.stringify(data1.data) },
        ]);
      }
     
    } else {
      this.general.generalErrorMessage(data1.msg);
      console.log(data1.msg);
    }
    this.general.stopLoader();
  }

  ngOnInit() {
    debugger;
    this.getUsers();
  }
}
