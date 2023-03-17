import { ControllerService } from '../../shared/services/controller.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private controllerSVC: ControllerService) { }

  ngOnInit(): void {
    this.controllerSVC.setInfoStatus(false);
  }

}
