import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpConfigService {

  basepath = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) { }

  getListItems(params) {
    console.log(this.basepath + params);
    return this.http.get(this.basepath + params);
  }

}
