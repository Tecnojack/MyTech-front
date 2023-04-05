import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  showVideo = false;
  showImage = true;
  constructor() {
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
