import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ControllerService } from 'src/app/services/controller.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  showVideo = false;
  showImage = true;
  constructor(private controllerSVC: ControllerService, private router: Router) {
    this.controllerSVC.setInfoStatus(true);
    this.images = [];
  }
  images: string[];
  ngOnInit(): void {}
  onVideo() {
    this.showVideo = true;
    this.showImage = false;
  }
  onImage() {
    this.showVideo = false;
    this.showImage = true;
  }
}
