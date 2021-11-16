import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./components/login/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'followers',
    loadChildren: () => import('./followers/followers.module').then( m => m.FollowersPageModule)
  },
  {
    path: 'search-results',
    loadChildren: () => import('./search-results/search-results.module').then( m => m.SearchResultsPageModule)
  },
  {
    path: 'verify-id',
    loadChildren: () => import('./verify-id/verify-id.module').then( m => m.VerifyIdPageModule)
  },
  {
    path: 'comments',
    loadChildren: () => import('./comments/comments.module').then( m => m.CommentsPageModule)
  },
  {
    path: 'upload-video',
    loadChildren: () => import('./upload-video/upload-video.module').then( m => m.UploadVideoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
