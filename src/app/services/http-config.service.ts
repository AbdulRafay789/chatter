import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpConfigService {

  constructor(private http: HttpClient) { }

  getListItems(params) {
    console.log(environment.baseUrl + params);
    return this.http.get(environment.baseUrl);
  }

}
