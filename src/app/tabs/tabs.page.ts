import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpConfigService } from '../services/http-config.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  items = [];
  items1 = {};
  numTimesLeft = 5;

  constructor(private router: Router, private httpConfigService: HttpConfigService) {
    this.addMoreItems();
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      this.addMoreItems();
      this.numTimesLeft -= 1;
      event.target.complete();
    }, 500);
  }
  addMoreItems() {
    for (let i = 0; i < 15; i++) {
      this.items.push(i);
    }
  }

  notifications() {
    this.router.navigate(['/notifications']);
  }

  detail() {
    this.router.navigate(['/tabs/home/detail']);
  }

  pisca() {
    this.httpConfigService.getListItems(this.items).subscribe(response => {
      console.log(response);
      this.items1 = response;
    }, error => { console.log(error); });
    console.log(this.items1);
  }

  ngOnInit() {
    this.pisca();
  }

}
