import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxIndexedDBService, ObjectStoreMeta } from 'ngx-indexed-db';
import { ControllerService } from 'src/app/shared/services/controller.service';

@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.component.html',
  styleUrls: ['./add-details.component.scss'],
})
export class AddDetailsComponent implements OnInit {
  formLogin: FormGroup;
  constructor(
    private dbService: NgxIndexedDBService,
    private controllerSVC: ControllerService
  ) {
    this.formLogin = new FormGroup({
      title: new FormControl(),
      desc: new FormControl(),
      url: new FormControl(),
      price: new FormControl(),
      svc1: new FormControl(),
      svc2: new FormControl(),
      svc3: new FormControl(),
      svc4: new FormControl(),
      svc5: new FormControl(),
      svc6: new FormControl(),
    });
  }

  ngOnInit(): void {
  }
  newDB() {
    const storeSchema: ObjectStoreMeta = {
      store: 'Service',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'Service', keypath: 'MySVC', options: { unique: false } },
      ],
    };

    this.dbService.createObjectStore(storeSchema);
  }
  uploadService() {
    console.log('uploadService', this.newDB());
    if (this.dbService.getAll('Service') == undefined) {
      this.newDB();
    }
    this.dbService
      .bulkAdd('Service', [
        {
          Service: {
            title: this.formLogin.value.title,
            desc: this.formLogin.value.desc,
            url: this.formLogin.value.url,
            price: this.formLogin.value.price,
            svc1: this.formLogin.value.svc1,
            svc2: this.formLogin.value.svc2,
            svc3: this.formLogin.value.svc3,
            svc4: this.formLogin.value.svc4,
            svc5: this.formLogin.value.svc5,
            svc6: this.formLogin.value.svc6,
          },
        },
      ])
      .subscribe((key) => {
        console.log('key: ', key);
      });
  }
}
