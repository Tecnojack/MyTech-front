import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  setPersistence,
  onAuthStateChanged,
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  status: boolean = false;
  user: null | object = null;
  userData: null | object = null;
  header: boolean = false;
  constructor(private auth: Auth, private router: Router) {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    return signOut(this.auth);
  }
  setUserStatus(isLogged: boolean) {
    this.status = isLogged;
  }
  getUserStatus() {
    return this.status;
  }
  setUser(user: any) {
    this.userData = user;
  }
  getUser() {
    return this.userData;
  }
}
