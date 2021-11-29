import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileforusersPage } from './profileforusers.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileforusersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileforusersPageRoutingModule {}
