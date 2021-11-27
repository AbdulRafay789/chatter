import { apiUrl } from '../../../config';
import { InjectionToken, Injector } from '@angular/core';
export const globalConfig = {
  // injector: Injector,
  // injector: <Injector>{},
  injector: Injector.create({providers: []}),
  urls: {
    api: apiUrl
  }
};
