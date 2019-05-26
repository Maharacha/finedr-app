import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'loading-app',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'map', loadChildren: './map/map.module#MapPageModule' },
  { path: 'camera', loadChildren: './camera/camera.module#CameraPageModule' },
  { path: 'fine-form', loadChildren: './fine-form/fine-form.module#FineFormPageModule' },
  { path: 'fine-sent-success', loadChildren: './fine-sent-success/fine-sent-success.module#FineSentSuccessPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'loading-app', loadChildren: './loading-app/loading-app.module#LoadingAppPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
