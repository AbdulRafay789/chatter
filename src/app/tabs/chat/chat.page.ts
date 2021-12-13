import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { HttpConfigService } from 'src/app/services/http-config.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  filterTerm: string;
  chatCreation: any = [];
  users: any = [];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  userto_id: any;
  constructor(
    public service: HttpConfigService,
    public generalService: GeneralService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.getUsers();
  }

  messages() {
    this.router.navigate(['/tabs/chat/messages']);
  }

  async getVideos(param, index) {
    // eslint-disable-next-line no-underscore-dangle
    this.userto_id = param._id;
    const url = 'chats/create';
    this.generalService.showLoader();
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const data1: any = await this.service.postApi(url, {
      userto_id: this.userto_id,
    });
    if (data1.status && data1.data) {
      this.router.navigate([
        '/tabs/chat/messages',
        { data: JSON.stringify(data1.data) },
      ]);
    } else {
      this.generalService.generalToast(data1.msg, 2000);
      console.log(data1.msg);
    }
    this.generalService.stopLoader();
  }

  async getUsers() {
    const url = 'users/connectUsers';
    this.generalService.showLoader();
    const data1: any = await this.service.getApi(url, {});
    if (data1.status && data1.data) {
      this.users = data1.data;
      // this.service.setVideo(data1.data);
    } else {
      this.generalService.generalToast(data1.msg, 2000);
      console.log(data1.msg);
    }
    this.generalService.stopLoader();
  }

  ngOnInit() {
    // this.getUsers();
  }
  checkInside(item, term) {
    const toCompare = term.toLowerCase();
    for (let property in item) {
        if (item[property] === null || item[property] == undefined) {
            continue;
        }
        if (typeof item[property] === 'object') {
            if (this.checkInside(item[property], term)) {
                return true;
            }
        }
        if (item[property].toString().toLowerCase().includes(toCompare)) {
            return true;
        }
    }
    return false;
}
  SearchFilrer() {
    return this.users.filter(function (item) {
        return this.checkInside(item, this.filterTerm);
    });
  }
}
