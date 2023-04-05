import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  onAuthStateChanged,
  Auth,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  authState,
  user,
  User,
} from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  status: boolean = false;
  user: null | object = null;
  user$: Observable<User | null>;
  private loggedIn = new BehaviorSubject<boolean>(false);
  header: boolean = false;
  constructor(private auth: Auth, private router: Router) {
    setPersistence(this.auth, { type: 'SESSION' });
    this.user$ = authState(this.auth);
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    this.router.navigate(['/login']);
    this.loggedIn.next(false);
    return signOut(this.auth);
  }

}
