import { UpVideosComponent } from './up-videos/up-videos.component';
import { UpImagesComponent } from './up-images/up-images.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { AddDetailsComponent } from './add-details/add-details.component';
import { LoginComponent } from './login/login.component';
const dbConfig: DBConfig = {
  name: 'MyTech',
  version: 6,
  objectStoresMeta: [
    {
      store: 'Video',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'Video', keypath: 'MyVideo', options: { unique: false } },
      ],
    },
  ],
};

@NgModule({
  declarations: [AdminComponent, UpImagesComponent, UpVideosComponent, AddDetailsComponent, LoginComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxIndexedDBModule.forRoot(dbConfig),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule {}
