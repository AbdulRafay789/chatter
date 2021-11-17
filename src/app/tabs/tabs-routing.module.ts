import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home/home.page';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    // redirectTo: 'home',
    // pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'post',
    loadChildren: () => import('./post/post.module').then( m => m.PostPageModule)
  },
  {
    path: 'video',
    loadChildren: () => import('./video/video.module').then( m => m.VideoPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  // {
  //   path: 'tabs/post/home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  // {
  //   path: 'tabs/post/post',
  //   loadChildren: () => import('./post/post.module').then( m => m.PostPageModule)
  // },
  // {
  //   path: 'tabs/post/video',
  //   loadChildren: () => import('./video/video.module').then( m => m.VideoPageModule)
  // },
  // {
  //   path: 'tabs/post/chat',
  //   loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  // },
  // {
  //   path: 'tabs/post/profile',
  //   loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  // }
];

// const routes: Routes = [
//   {
//     path: '',
//     component: TabsPage,
//     children:[
//       {
//         path: 'home',
//         children: [
//           {
//             path: '',
//             loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
//           }
//         ]
//       },
//       {
//         path: 'post',
//         children: [
//           {
//             path: '',
//             loadChildren: () => import('./post/post.module').then( m => m.PostPageModule)
//           }
//         ]
//       },
//       {
//         path: 'video',
//         children: [
//           {
//             path: '',
//             loadChildren: () => import('./video/video.module').then( m => m.VideoPageModule)
//           }
//         ]
//       },
//       {
//         path: 'chat',
//         children: [
//           {
//             path: '',
//             loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
//           }
//         ]
//       },
//       {
//         path: 'profile',
//         children: [
//           {
//             path: '',
//             loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
//           }
//         ]
//       },
//     ]
//   },
//   {
//     path: '',
//     redirectTo: '/home',
//     pathMatch: 'full'
//   }
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
