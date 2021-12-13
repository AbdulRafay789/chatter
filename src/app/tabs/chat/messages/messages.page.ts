import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Keyboard } from '@capacitor/keyboard';
import { IonContent, Platform } from '@ionic/angular';
import { GeneralService } from 'src/app/services/general.service';
import { HttpConfigService } from 'src/app/services/http-config.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  @ViewChild(IonContent, { static: true }) content: IonContent;
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
  transformValue = "";
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public service: HttpConfigService,
    public platform: Platform,
    public generalService: GeneralService
  ) {}

  inputTrigger() {
    // requestAnimationFrame(() => {
    //   this.transformValue = 'translateY(-245px)';
    //   document.activeElement.scrollIntoView(true);
    // });
  }
  inputBlur(){
    // requestAnimationFrame(() => {
    //   this.transformValue = "";
    // });
  }

  async getChats(flag) {
    // eslint-disable-next-line no-underscore-dangle
    const url = 'getchats/' + this.chatid;
    if (flag) {
      this.generalService.showLoader();
    }

    const data1: any = await this.service.getApi(url, {});
    if (data1.status && data1.data) {
      this.messages = data1.data;
      // setTimeout(function () {
      //   this.content.scrollToBottom(1500);
      // }, 500);
      // this.service.setVideo(data1.data);
      this.scrollToBottomOnInit();
      if (flag) {
        this.generalService.stopLoader();
      }
    } else {
      if (data1.status === false) {
        this.generalService.generalToast('No Record Found', 2000);
      }
      this.generalService.generalToast(data1.msg, 2000);
      console.log(data1.msg);
    }
    if (flag) {
      this.generalService.stopLoader();
    }
  }
  async sendMsg() {
    // eslint-disable-next-line no-underscore-dangle
    const url = 'chats/send/';
    // this.generalService.showLoader();
    let params = {
      _id: this.chatid,
      userto_id: this.usertoid,
      msg: this.msg,
    };
    if (params.msg == '') {
      this.generalService.generalToast('Message Is Required', 2000);
      return false;
    }
    const data1: any = await this.service.postApi(url, params);
    if (data1.status) {
      this.messages = data1.data;
      // this.service.setVideo(data1.data);
      this.getChats(false);
      this.msg = '';
    } else {
      if (data1.status === false) {
        this.generalService.generalToast('No Record Found', 2000);
      }
      this.generalService.generalToast(data1.msg, 2000);
      console.log(data1.msg);
      this.msg = '';
    }
    // this.generalService.stopLoader();
  }

  scrollToBottomOnInit() {
    setTimeout(() => {
      this.content.scrollToBottom(800);
    }, 2000);
  }

  ngOnInit() {
    this.scrollToBottomOnInit();
    this.user = this.service.getuser();
    this.user = this.user.user;
    this.route.params.subscribe((params) => {
      this.chatid = JSON.parse(params.data)['_id'];
      this.usertoid = JSON.parse(params.data)['userto_id'];
    });
    this.getChats(true);
    this.timeinterval = setInterval(() => {
      this.getChats(false); // Now the "this" still references the component
    }, 10000);
    this.platform.ready().then(() => {
      Keyboard.addListener("keyboardWillShow", () => {
        requestAnimationFrame(() => {
          this.transformValue = 'translateY(-250px)';
          document.activeElement.scrollIntoView(true);
        });
      });
      Keyboard.addListener('keyboardWillHide', () => {
        requestAnimationFrame(() => {
          this.transformValue = '';
        });
      });
      Keyboard.addListener("keyboardDidHide", () => {
        requestAnimationFrame(() => {
          this.transformValue = "";
        });
      });
    });
  }
  ngOnDestroy() {
    clearInterval(this.timeinterval);
  }
  handleSelection(event) {
    this.emojitext = this.emojitext + ' ' + event.char;
  }
  ionViewDidEnter() {
    this.scrollToBottomOnInit;
  }
}
