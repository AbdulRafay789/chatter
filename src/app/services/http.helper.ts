// import { Http, HttpModule, RequestOptionsArgs, Headers } from '@angular/http';
import { HttpClient, } from '@angular/common/http';
import { Injectable, } from '@angular/core';

@Injectable()
export class HttpHelper {
  //  url = require('url').Url;
  // url = require('url').URL;
  constructor(private http: HttpClient) {
  }

  async get<T>(url: string, headers?): Promise<T> {
    return await this.request(url, 'Get', this.getHeaders(headers));
  }

  async post<T>(url: string, headers?, body?: any): Promise<T> {
    return await this.request(url, 'Post', this.getHeaders(headers), body);
  }

  async put<T>(url: string, headers?, body?: any): Promise<T> {
    return await this.request(url, 'Put', this.getHeaders(headers), body);
  }

  async delete<T>(url: string, headers?, body?: any): Promise<T> {
    return await this.request(url, 'Delete', this.getHeaders(headers), body);
  }

  private async request(url, method: string, headers?: Headers, body?): Promise<any> {
    let options: any;
    // const options: RequestOptionsArgs = RequestOptionsArgs{};
    // if (body) {
    //     options.body = body;
    // }

    // if (method) {
    //     options.method = method;
    // }

    // if (headers) {
    //     options.headers = headers;
    // }

    return await new Promise<any>((resolve, reject) => this.http.request(url, options)
      .subscribe(response => {
        resolve(this.handleResponse(response));
      }, error => {
        // const errmsg = JSON.parse(error.body);
        let errmsg: any;
        if (error.status === 500) {
          // reject(error.statusText);
          resolve(this.handleResponse(error));
          console.log(error.statusText);
        } else if (error.status === 401) {
          reject(JSON.stringify(error));
          throw new Error(JSON.stringify(error));

        }
        // else if (errmsg.Errors === 'Session Expired') {
        //   resolve(this.handleResponse(error));
        //   throw new Error('Session Expired');
        //   // this.events.publish('user:relogin');
        // }
        // else {
        //   resolve(this.handleResponse(error));
        // }
      }));
  }



  private handleResponse(response: any): any {
    let result;
    try {
      const body = response.json();

      result = body || {};
    } catch (e) {
      result = {};
    }

    return result;
  }

  private getHeaders(headers: any) {
    const result: Headers = new Headers();

    //SADIQ 12/4/18
    if (headers) {
      const keys = Object.keys(headers);

      keys.forEach(x => result.set(x, headers[x]));
    }


    return result;
  }
}
