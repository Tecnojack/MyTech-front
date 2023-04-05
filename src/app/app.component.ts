import { Component, OnInit, inject } from '@angular/core';
import { ControllerService } from './shared/services/controller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = '';
constructor(private controllerService: ControllerService) {

}
  ngOnInit(): void {
    this.controllerService.setTitle('HOME');
    this.title = this.controllerService.getTitle();
  }

}
