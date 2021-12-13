import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPageRoutingModule } from './chat-routing.module';

import { ChatPage } from './chat.page';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myfilter',
    pure: false
})
export class MyFilterPipe implements PipeTransform {
    transform(items: any[], filter): any {
        let text:any = filter || "";
        if(text){
          text = text.toLocaleLowerCase();
        }
       
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => {
          let fname = item.fname.toLocaleLowerCase();
          let lname = item.lname.toLocaleLowerCase();
          let username = item.username.toLocaleLowerCase();
          return fname.indexOf(text) !== -1 || lname.indexOf(text) !== -1 || username.indexOf(text) !== -1
        });
    }
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [ChatPage,MyFilterPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatPageModule {}
