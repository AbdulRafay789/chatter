import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { HttpConfigService } from 'src/app/services/http-config.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  chatCreation: any = [];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  userto_id: any;
  constructor(private router: Router, private route: ActivatedRoute, public service: HttpConfigService,
    public generalService: GeneralService,) { }

  // notifications() {
  //   this.router.navigate(['/notifications']);
  // }

  async getVideos(param?, index?) {
    // eslint-disable-next-line no-underscore-dangle
    this.userto_id = param._id;
    const url = 'chats/create';
    this.generalService.showLoader();
    const data1: any = await this.service.postApi(url, this.userto_id);
    if (data1.status && data1.data) {
      this.chatCreation = data1.data;
      // this.service.setVideo(data1.data);
      this.generalService.stopLoader();
    }
    else {
      if (data1.status === false) {
        this.generalService.generalErrorMessage('No Record Found');
      }
      this.generalService.generalErrorMessage(data1.msg);
      console.log(data1.msg);
    }
  }

  ngOnInit() {
  }

}
