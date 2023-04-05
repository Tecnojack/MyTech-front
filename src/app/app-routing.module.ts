import { ContactComponent } from './components/about/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { ErrorsComponent } from './components/errors/errors.component';
import { DetailsComponent } from './components/details/details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'services', component: DetailsComponent },
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  {
    path: 'admin',
    loadChildren: () =>
      import('./components/admin/admin.module').then((m) => m.AdminModule), canActivate: [AuthGuard] 
  },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },

  { path: '**', component: ErrorsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
