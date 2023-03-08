import { ControllerService } from './services/controller.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  infoStatus = false;
  constructor() {}
  ngOnInit(): void {

  }

  title = 'MyTech';
}
