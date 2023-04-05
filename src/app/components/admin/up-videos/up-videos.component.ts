import { ControllerService } from '../../../shared/services/controller.service';
import { Component, OnInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-up-videos',
  templateUrl: './up-videos.component.html',
  styleUrls: ['./up-videos.component.scss'],
})
export class UpVideosComponent implements OnInit {
  formLogin: FormGroup;
  constructor(
    private dbService: NgxIndexedDBService,
    private controllerSVC: ControllerService
  ) {
    this.formLogin = new FormGroup({
      title: new FormControl(),
      desc: new FormControl(),
      link: new FormControl(),
    });
  }

  ngOnInit(): void {
  }
  uploadVideo() {
    this.dbService
      .bulkAdd('Video', [
        {
          Video: {
            title: this.formLogin.value.title,
            desc: this.formLogin.value.desc,
            link: this.formLogin.value.link,
          },
        },
      ])
      .subscribe((key) => {
        console.log('key: ', key);
      });
  }
  getVideo() {
    this.dbService.getAll('Video').subscribe((videos) => {
      console.log('videos: ', videos);
    });
  }
}
