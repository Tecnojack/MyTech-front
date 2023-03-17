import { Component, OnInit } from '@angular/core';
import {
  Storage,
  ref,
  listAll,
  getDownloadURL,
  getMetadata,
} from '@angular/fire/storage';
import { NgxIndexedDBService } from 'ngx-indexed-db';

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
