import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  userResponse: any;
  constructor(private userService: UserService, private router: Router) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.userService
      .login(this.formLogin.value)
      .then((response: any) => {
        this.userResponse = response.user;
        if (this.userResponse.accessToken) {
          this.router.navigate(['/admin']);
        } else this.router.navigate(['/login']);
      })
      .catch((error: any) => console.log(error));
  }

  onClick() {
    this.router.navigate(['/home']);
  }
}
