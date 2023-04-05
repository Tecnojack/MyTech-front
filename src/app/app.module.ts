import { HttpClientModule } from '@angular/common/http';
import { SafePipe } from './safe.pipe';
import { AdminModule } from './components/admin/admin.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ErrorsComponent } from './components/errors/errors.component';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/footer/footer.component';
import { DetailsComponent } from './components/details/details.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';

import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { VideosComponent } from './components/home/videos/videos.component';
import { ImagesComponent } from './components/home/images/images.component';
import { ContactComponent } from './components/about/contact/contact.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { BannerComponent } from './components/banner/banner.component';
import Dexie from 'dexie';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Form } from './shared/interfaces/forms';
import { DexieService } from './shared/data/dexie.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ErrorsComponent,
    AboutComponent,
    FooterComponent,
    DetailsComponent,
    VideosComponent,
    ImagesComponent,
    SafePipe,
    ContactComponent,
    SpinnerComponent,
    BannerComponent,
  ],
  imports: [
    AdminModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DexieService],
  bootstrap: [AppComponent],
})
export class AppModule  extends Dexie {
  forms: Dexie.Table<Form, number>;

  constructor() {
    super('my-data');
    this.version(1).stores({
      forms: '++id, name, email, data, message',
    });
    this.forms = this.table('forms');
  }
}



