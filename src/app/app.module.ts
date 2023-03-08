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
import { GaleryComponent } from './components/galery/galery.component';
import { UserComponent } from './services/user/user.component';
import { DetailsComponent } from './components/details/details.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { VideosComponent } from './components/home/videos/videos.component';
import { ImagesComponent } from './components/home/images/images.component';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';

// const dbConfig: DBConfig  = {
//   name: 'MyTech',
//   version: 1,
//   objectStoresMeta: [{
//     store: 'Video',
//     storeConfig: { keyPath: 'id', autoIncrement: true },
//     storeSchema: [
//       { name: 'Video', keypath: 'MyVideo', options: { unique: false } },

//     ]
//   }]
// };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ErrorsComponent,
    AboutComponent,
    GaleryComponent,
    UserComponent,
    DetailsComponent,
    VideosComponent,
    ImagesComponent,
    SafePipe
  ],
  imports: [
    AdminModule,
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
