import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpConfigService {

  basepath = 'https://swapi.dev/api/people/';

  constructor(private http: HttpClient) { }

  getListItems(params) {
    console.log(this.basepath + params);
    return this.http.get(this.basepath);
  }

}
