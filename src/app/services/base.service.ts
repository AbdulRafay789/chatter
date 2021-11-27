import { Injectable, Injector, ReflectiveInjector } from '@angular/core';
import { ConfigurationProvider } from './configuration';

import { DtoResult } from './DtoResult';
import { HttpHelper } from './http.helper';
import { LocalStorage } from './local.storage';
import { globalConfig } from './global.config';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export abstract class BaseService<T extends any> {
  public static headers: any;
  // static headers: HttpHeaders;
  pisca: any;
  controller: '';
  public httpHelper: HttpHelper;
  public localStorage: LocalStorage;
  public conf: ConfigurationProvider;
  headers = new HttpHeaders();
  // constructor(private injector: Injector) {
  constructor() {
    // this.httpHelper = this.injector.get(globalConfig.injector);
    // const headers = new HttpHeaders().set('Content-Type','application/json');
    this.httpHelper = globalConfig.injector.get(HttpHelper);
    this.localStorage = globalConfig.injector.get(LocalStorage);
    this.conf = globalConfig.injector.get(ConfigurationProvider);
    const token = this.localStorage.get('token');
    BaseService.headers.append('Content-Type', 'application/json; charset=utf-8');
    // headers.append('Accept', 'application/json');
    BaseService.headers.append('Access-Control-Allow-Origin', '*');
    BaseService.headers.append('Access-Control-Allow-Credentials', 'true');
    // BaseService.headers.Authorization = token;
    if (token && token !== '') {
      BaseService.headers['Access-Control-Allow-Origin'] = '*';
    }

  }

  public static clear() {
    // BaseService.headers['Authorization'] = null;
    BaseService.headers.Authorization = null;
  }
  public static fill(token: string) {
    // BaseService.headers['Authorization'] = token;
    BaseService.headers.Authorization = token;
  }

  public static clearToken() {
    BaseService.headers.Authorization = '';
  }
  public static updateToken(token: string) {
    BaseService.headers.Authorization = token;
  }

  public getHeaders(headers: any) {
    const result: Headers = new Headers();
    const keys = Object.keys(headers);

    keys.forEach(x => result.set(x, headers[x]));

    return result;
  }

  async getNext(nextOf: any) {
    const dto = await this.get('next', nextOf);

    return dto;
  }

  async getPrevious(previousOf: any) {
    const dto = await this.get('previous', previousOf);

    return dto;
  }

  async getLast() {
    const dto = await this.get('last');

    return dto;
  }

  async getFirst() {
    const dto = await this.get('first');

    return dto;
  }

  // async Get(key: any) {
  //     const dto = await this.get('', key);

  //     return dto;
  // }

  async getAll() {
    const dto = await this.get();

    return dto;
  }
  /* SADIQ 4/23/18 */

  async getByPrimaryKey(id: any): Promise<DtoResult<T>> {
    const dto = await this.get('getbyprimaykey/'.concat(id));

    return dto;
  }

  /* END SADIQ 4/23/18 */

  /* OLD */
  // async save(dto: DtoResult<T>) {
  //     let result;
  //     if (dto.KeyValue) {
  //         result = await this.put('', dto.Data);
  //     } else {
  //         result = await this.post('', dto.Data);
  //     }

  //     return result;
  // }
  /* END OLD */


  /* New */
  async save(data: any, primaryKey?: number): Promise<DtoResult<any>> {
    let result;
    if (primaryKey) {
      result = await this.put('Put/'.concat('' + primaryKey), data);
    } else {
      result = await this.post('Post', data);
    }

    return result;
  }
  /* End New */

  //SADIQ 7/27/18 START :: COMMENTING AND MAKING NEW DEL METHOD


  // async delete(Id: any) {
  //     const dto = <DtoResult<T>>{
  //         KeyValue: Id
  //     };

  //     const result = await this.del('', dto);

  //     return result;
  // }

  async delete(id: any) {

    const dto = await this.del('delete/' + id);
    // const result = await this.del('', undefined, );

    return dto;
  }

  //SADIQ 7/27/18 END :: COMMENTING AND MAKING NEW DEL METHOD

  // HTTP Method
  async get(method?: string, params?: any[]): Promise<DtoResult<T>> {

    return await this.httpHelper.get<DtoResult<T>>(this.getUrl(method, params), BaseService.headers);
  }

  async post(method: string, body?: T, params?: any[]): Promise<DtoResult<T>> {
    return await this.httpHelper.post<DtoResult<T>>(this.getUrl(method, params), BaseService.headers, body);
  }

  async put(method: string, body?: T, params?: any[]): Promise<DtoResult<T>> {
    return await this.httpHelper.put<DtoResult<T>>(this.getUrl(method, params), BaseService.headers, body);
  }

  async del(method: string, body?: DtoResult<T>, params?: any[]): Promise<DtoResult<T>> {
    return await this.httpHelper.delete<DtoResult<T>>(this.getUrl(method, params), BaseService.headers, body);
  }

  public getUrl(method: string, parameters?: { name: string; value: any }[]): string {
    // let result = this.conf.getServerUrl().concat('users/').concat(this.controller).concat('/').concat(method || '');
    let result = this.conf.getServerUrl().concat('users/').concat(method || '');
    // let result = this.conf.getServerUrl();

    // if (parameters && Array.isArray(parameters)) {
    //   result = result.concat(parameters.reduce((prev, cur) => {

    //     return (cur.value != null && cur.value !== '') ?
    //       prev.concat(cur.name.concat('=').concat(encodeURIComponent(cur.value)).concat('&')) : prev.concat('');
    //   }, '?'));
    //   if (result.lastIndexOf('&') === (result.length - 1)) {
    //     result = result.substring(0, result.lastIndexOf('&'));
    //   }
    // }
    if (parameters && Array.isArray(parameters)) {
      result = result.concat(parameters.reduce((prev, cur) => (cur.value != null && cur.value !== '') ?
        prev.concat(cur.name.concat('=').concat(encodeURIComponent(cur.value)).concat('&')) : prev.concat(''), '?'));
      if (result.lastIndexOf('&') === (result.length - 1)) {
        result = result.substring(0, result.lastIndexOf('&'));
      }
    }

    return result;
  }


  //NEW
}
