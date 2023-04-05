import { LoginComponent } from './login/login.component';
import { UpVideosComponent } from './up-videos/up-videos.component';
import { UpImagesComponent } from './up-images/up-images.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddDetailsComponent } from './add-details/add-details.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'images', component: UpImagesComponent },
      { path: 'videos', component: UpVideosComponent },
      { path: 'details', component: AddDetailsComponent },
    ],

  },
  { path: 'login', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
