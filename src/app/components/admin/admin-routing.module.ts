import { UpVideosComponent } from './up-videos/up-videos.component';
import { UpImagesComponent } from './up-images/up-images.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'images', component: UpImagesComponent },
  { path: 'videos', component: UpVideosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
