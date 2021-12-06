import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UservideosPageRoutingModule } from './uservideos-routing.module';

import { UservideosPage } from './uservideos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UservideosPageRoutingModule
  ],
  declarations: [UservideosPage]
})
export class UservideosPageModule {}
