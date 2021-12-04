import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { GeneralService } from 'src/app/services/general.service';
import { HttpConfigService } from 'src/app/services/http-config.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  // @ViewChild('content') private content: any;
  @ViewChild(IonContent, {
    static: false
 }) content: IonContent;
  toggled: boolean = false;
  emojitext: string;
  messages: any = [];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  userto_id: any;
  chatid: any = '';
  usertoid: any = '';
  msg: any = '';
  user: any;
  timeinterval: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public service: HttpConfigService,
    public generalService: GeneralService
  ) {}

  // notifications() {
  //   this.router.navigate(['/notifications']);
  // }

  async getChats(flag) {
    // eslint-disable-next-line no-underscore-dangle
    const url = 'getchats/' + this.chatid;
    if (flag) {
      this.generalService.showLoader();
    }

    const data1: any = await this.service.getApi(url, {});
    if (data1.status && data1.data) {
      this.messages = data1.data;
      setTimeout(function(){
        this.content.scrollToBottom(1500);
      },500);
      // this.service.setVideo(data1.data);
      if (flag) {
        this.generalService.stopLoader();
      }
    } else {
      if (data1.status === false) {
        this.generalService.generalToast('No Record Found');
      }
      this.generalService.generalToast(data1.msg);
      console.log(data1.msg);
    }
    if (flag) {
      this.generalService.stopLoader();
    }
  }
  async sendMsg() {
    // eslint-disable-next-line no-underscore-dangle
    const url = 'chats/send/';
    this.generalService.showLoader();
    let params = {
      _id: this.chatid,
      userto_id: this.usertoid,
      msg: this.msg,
    };
    const data1: any = await this.service.postApi(url, params);
    if (data1.status) {
      this.messages = data1.data;
      // this.service.setVideo(data1.data);
      this.getChats(true);
      this.msg = '';
    } else {
      if (data1.status === false) {
        this.generalService.generalToast('No Record Found');
      }
      this.generalService.generalToast(data1.msg);
      console.log(data1.msg);
      this.msg = '';
    }
    this.generalService.stopLoader();
  }

  ngOnInit() {
    this.user = this.service.getuser();
    this.user = this.user.user;
    this.route.params.subscribe((params) => {
      this.chatid = JSON.parse(params.data)['_id'];
      this.usertoid = JSON.parse(params.data)['userto_id'];
    });
    this.getChats(true);
    // this.timeinterval = setInterval(() => {
    //   this.getChats(false); // Now the "this" still references the component
    // }, 10000);
  }
  ngOnDestroy() {
    clearInterval(this.timeinterval);
  }
  handleSelection(event) {
    this.emojitext = this.emojitext + ' ' + event.char;
  }
}
