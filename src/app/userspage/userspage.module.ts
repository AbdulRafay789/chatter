import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserspagePageRoutingModule } from './userspage-routing.module';

import { UserspagePage } from './userspage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserspagePageRoutingModule
  ],
  declarations: [UserspagePage]
})
export class UserspagePageModule {}
