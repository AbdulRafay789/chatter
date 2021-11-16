import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyIdPageRoutingModule } from './verify-id-routing.module';

import { VerifyIdPage } from './verify-id.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifyIdPageRoutingModule
  ],
  declarations: [VerifyIdPage]
})
export class VerifyIdPageModule {}
