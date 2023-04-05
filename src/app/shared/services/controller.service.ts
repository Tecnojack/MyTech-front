import { HostVideo, Videos } from './../interfaces/services';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Services, Teams } from '../interfaces/services';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ControllerService {
  api = 'https://strapi-76ms.onrender.com/api/';
  infoStatus: boolean = true;
  title = '';
  http = inject(HttpClient);
  
  setTitle(title: string) {
    this.title = title;
  }
  getTitle() {
    return this.title;
  }
  getServices() {
    return this.http.get<Services>(this.api + 'services?populate=*');
  }
  getTeam() {
    return this.http.get<Teams>(this.api + 'teams?populate=*');
  }
  getVideoHost() {
    return this.http.get<HostVideo>(this.api + 'host-videos?populate=*');
  }
  getVideos() {
    return this.http.get<Videos>(this.api + 'videos?populate=*');
  }
}
