import { Router } from '@angular/router';
import { ControllerService } from '../../shared/services/controller.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { AppModule } from 'src/app/app.module';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  dataContactMSJ: any;
  phoneMsj = '';
  constructor(
    private myData: AppModule,
    private userSvc: UserService,
    private router: Router
  ) {}
  showComments = false;
  showRequest = true;
  ngOnInit(): void {
    this.sendData();
  }
  onLogout() {
    this.userSvc.logout().then(() => {
      this.router.navigate(['/home']);
    });
  }

  sendData() {
    this.myData.forms.toArray().then((forms) => {
      console.log('forms: ', forms);
      this.dataContactMSJ = forms;
    });
  }
  sendWhatsApp(nameU: string, num: number, message: string) {
    const mensaje = `Hola, ${nameU}, nos dijiste en la página web que estas interesado en  "${message}" y queremos ver de qué manera te podemos ayudar.`;
    window.open(`https://api.whatsapp.com/send?phone=+${num}&text=${mensaje} `);
  }
  onComments() {
    this.showComments = true;
    this.showRequest = false;
  }
  onRequest() {
    this.showComments = false;
    this.showRequest = true;
  }
}
