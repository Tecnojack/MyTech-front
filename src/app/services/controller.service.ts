import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ControllerService {
  infoStatus: boolean = true;
  constructor() {

  }
  setInfoStatus(status: boolean) {
    this.infoStatus = status;
  }
  getInfoStatus() {
    return this.infoStatus;
  }
}
