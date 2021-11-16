import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.page.html',
  styleUrls: ['./search-results.page.scss'],
})
export class SearchResultsPage implements OnInit {

  constructor(private router: Router) { }

  notifications() {
    this.router.navigate(['/notifications']);
  }

  ngOnInit() {
  }

}
