import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserspagePage } from './userspage.page';

const routes: Routes = [
  {
    path: '',
    component: UserspagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserspagePageRoutingModule {}
