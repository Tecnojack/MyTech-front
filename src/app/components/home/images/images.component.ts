import { Component, OnInit } from '@angular/core';
import {
  Storage,
  ref,
  listAll,
  getDownloadURL,
  getMetadata,
} from '@angular/fire/storage';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit {
  constructor(private storage: Storage) {
    this.images = [];
    this.detailsImg = '';
  }
  images: any[];
  detailsImg;
  showGalery = true;
  ngOnInit(): void {
    this.getImages();
  }

  getImages() {
    const imgRef = ref(this.storage, 'images');
    listAll(imgRef).then(async (res) => {
      console.log(res);
      this.images = [];
      for (let item of res.items) {
        const url = await getDownloadURL(item);
        // const id = res.items.indexOf(item);

        // const img = res.items[id];
        // const imgFinal = await getDownloadURL(img);
        // this.detailsImg = imgFinal;
        // console.log('ID: ', id, 'ImagenFianl', imgFinal);
        this.images.push(url);
        console.log('Images: ', this.images);
      }
    });
    console.log(imgRef);
  }
  details(img: string) {
    this.showGalery = !this.showGalery;
    this.detailsImg = img;
  }
}
