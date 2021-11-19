import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpConfigService } from 'src/app/services/http-config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  items = [];
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

  // notifications() {
  //   this.router.navigate(['/notifications']);
  // }

  detail() {
    this.router.navigate(['/tabs/home/detail']);
  }

  ngOnInit() {
  }

}
