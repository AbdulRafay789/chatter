import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../services/general.service';
import { HttpConfigService } from '../services/http-config.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.page.html',
  styleUrls: ['./search-results.page.scss'],
})
export class SearchResultsPage implements OnInit {
  galleryType = "videos";
  videosUsers = {
    "users":[],
    "videos":[]
  };
  search ="";
  videos = [];
  userData: any = {};
  constructor(private router: Router, public service: HttpConfigService, public generalService: GeneralService) {
    let tempuser = this.service.getuser();
    this.userData = tempuser.user;
   }

  notifications() {
    this.router.navigate(['/notifications']);
  }
  setVideos(elem){
    this.videos = [];
    elem.forEach(element => {
      let obj = {};
      element.videos.forEach(vid => {
        if(vid.path){
          obj = vid;
          obj["_id"] = element["_id"];
          if(vid.path.indexOf('.mp4') == -1){
            obj['isvideo'] = false;
          }
          else{
            obj['isvideo'] = true;;
          }
        }
      });
      this.videos.push(obj);
    });
  }
  async searchall() {
    // this.generalService.showLoader();
    const data1: any = await this.service.postApi('searchuserandvideos', {"searchvalue":this.search});
    if (data1.status && data1.data) {
      this.videosUsers = data1.data;
      this.setVideos(this.videosUsers.videos);
    }
    else {
      if (data1.status === false) {
        this.generalService.generalErrorMessage('No Record Found');
      }
      this.generalService.generalErrorMessage(data1.msg);
      console.log(data1.msg);
    }
    // this.generalService.stopLoader();
  }
  UpdateSegment(segment){
    this.galleryType = segment;
  }
  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.videosUsers.videos.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }
  async gotoUser(param) {
    this.generalService.showLoader();
    const url = 'users/details/' + param['_id'];
    const data1: any = await this.service.getApi(url, {});
    if (data1.status && data1.data) {
      this.router.navigate([
        '/profileforusers',
        { data: JSON.stringify(data1.data) },
      ]);
    } else {
      this.generalService.generalErrorMessage(data1.msg);
      console.log(data1.msg);
    }
    this.generalService.stopLoader();
  }
  async viewVideo(param) {
    let obj = {};
    let indx = 0 ;
    this.videosUsers.videos.forEach((element,i) => {
      if(param["_id"].toString() == element["_id"].toString()){
        obj = element;
        indx = i;
      }
    });
    this.router.navigate(['/tabs/home/detail', { data: JSON.stringify(obj), index: indx }]);
  }
  ngOnInit() {
    this.searchall();
  }

}
