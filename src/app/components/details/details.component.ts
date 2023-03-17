import { Component, OnInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  id: number = 0;
  service: any[];

  constructor(private dbService: NgxIndexedDBService) {
    this.service = [];
  }

  ngOnInit(): void {
    this.getService();
  }
  getService() {
    this.dbService.getAll('Service').subscribe((services: any) => {
      console.log('Services: ', this.service);  });
    this.dbService
      .bulkGet('Service', [3, 4, 5, 6, 7, 8, 9, 10, 11,12,13])
      .subscribe((services: any) => {
        console.log('Services: ', this.service);
        this.service = [];
        for (let item of services) {
          let data = item.Service;
          this.service.push(data);
          console.log('Services: ', this.service);
        }
      });
  }
}
