import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileforusersPageRoutingModule } from './profileforusers-routing.module';

import { ProfileforusersPage } from './profileforusers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileforusersPageRoutingModule
  ],
  declarations: [ProfileforusersPage]
})
export class ProfileforusersPageModule {}
