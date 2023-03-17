import { LoginComponent } from './login/login.component';
import { UpVideosComponent } from './up-videos/up-videos.component';
import { UpImagesComponent } from './up-images/up-images.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddDetailsComponent } from './add-details/add-details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'images', component: UpImagesComponent },
  { path: 'videos', component: UpVideosComponent },
  { path: 'details', component: AddDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
