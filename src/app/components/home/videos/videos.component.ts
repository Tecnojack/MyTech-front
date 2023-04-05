import { Component, inject, OnInit } from '@angular/core';

import { NgxIndexedDBService } from 'ngx-indexed-db';
import { map, pluck } from 'rxjs/operators';
import { ControllerService } from 'src/app/shared/services/controller.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class VideosComponent implements OnInit {
  constructor(private dbService: NgxIndexedDBService) {
    this.video = [];
  }
  video: any[];

  link = 'https://www.youtube.com/embed/q9x722cps0Q';
  id = 0;
  ngOnInit(): void {
    this.getVideo();
  }
  private controllerService = inject(ControllerService);

  hostVideosVM$ = this.controllerService.getVideoHost().pipe(
    pluck('data'),
    map((hostVideos) => {
      return hostVideos.map(({ id, attributes }) => ({
        id,
        title: attributes.title,
        description: attributes.desc,
        link: attributes.url,
      }));
    })
  );
  VideosVM$ = this.controllerService.getVideos().pipe(
    pluck('data'),
    map((hostVideos) => {
      return hostVideos.map(({ id, attributes }) => ({
        id,
        title: attributes.title,
        description: attributes.desc,
        link: attributes.url,
      }));
    })
  );
  getVideo() {
    for (let index = 0; index < 20; index++) {
      this.id = index;
    }
    this.dbService
      .bulkGet('Video', [2, 3, 4, 5, 6, 7, 8, 9])
      .subscribe((videos: any) => {
        console.log('Videos: ', this.video);
        this.video = [];
        for (let item of videos) {
          let data = item.Video;
          this.video.push(data);
          console.log('Videos: ', this.video);
        }
      });
  }
  deleteVideo(id: number) {
    this.dbService.delete('Video', id).subscribe((key) => {
      console.log('key: ', key);
    });
  }
}
