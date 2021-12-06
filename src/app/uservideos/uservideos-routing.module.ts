import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UservideosPage } from './uservideos.page';

const routes: Routes = [
  {
    path: '',
    component: UservideosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UservideosPageRoutingModule {}
