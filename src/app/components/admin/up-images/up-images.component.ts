import { ControllerService } from './../../../services/controller.service';
import { Component, OnInit } from '@angular/core';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';

@Component({
  selector: 'app-up-images',
  templateUrl: './up-images.component.html',
  styleUrls: ['./up-images.component.scss'],
})
export class UpImagesComponent implements OnInit {
  constructor(private storage: Storage, private controllerSVC: ControllerService) {}

  ngOnInit(): void {
    this.controllerSVC.setInfoStatus(false);
  }
  onLoad(e: any) {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    const imgRef = ref(this.storage, `images/${file.name}`);
    uploadBytes(imgRef, file)
      .then((snapshot) => {
        console.log('Uploaded a blob or file!', snapshot);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
