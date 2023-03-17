import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { UserService } from 'src/app/shared/services/user.service';
// import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  authToken: string = '';
  isLogged: boolean = false;
  formLogin: FormGroup;
  userResponse: any;
  index: number = 0;
  constructor(
    private userService: UserService,
    private router: Router,
    private indexedDB: NgxIndexedDBService
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.userService.setUserStatus(false);
  }

  onSubmit() {
    this.userService
      .login(this.formLogin.value)
      .then((response: any) => {
        console.log('Response: ', response);
        this.userResponse = response.user;
        console.log('Token: ', this.userResponse);
        if (this.userResponse.accessToken) {
          this.userService.setUser(this.userResponse.accessToken);
          this.userService.setUserStatus(true);
          this.router.navigate(['/admin']);
          console.log('status: ', this.userService.getUserStatus());
        } else this.router.navigate(['/login']);
      })
      .catch((error: any) => console.log(error));
  }

  onClick() {
    this.router.navigate(['/home']);
  }
}
