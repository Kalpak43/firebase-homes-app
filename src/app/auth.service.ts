import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, browserLocalPersistence, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  auth = inject(Auth)

  private authInfoSubject = new BehaviorSubject<object>({ isSignedIn: false });
  authInfo$ = this.authInfoSubject.asObservable();

  // Sign In With Email and Password
  signInWithEmailAndPassword(email: string, password: string) {
    
    if(email !== "" && password !== "") {
      return signInWithEmailAndPassword(getAuth(), email, password)
      .then((userCredential) => {
        this.authInfoSubject.next({
          isSignedIn: true,
          userEmail: userCredential.user.email
        })
      })
      .catch((error) => {
        alert("An Error Occurred While Signing In: Check Your Email and Password and Try Again.")
        this.authInfoSubject.next({ isSignedIn: false });
      });
    }

    return;
  }

  // Sign in With Google
  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(getAuth(), provider).then((x) => {
      this.authInfoSubject.next({
        isSignedIn: true,
        userEmail: x.user.email,
      });
    })
    .catch((error) => {
      alert("An Error Occurred While Signing In: Check Your Email and Password and Try Again.")
      this.authInfoSubject.next({ isSignedIn: false });
    })

    
  }

  // Sign Out
  signOut() {
    signOut(getAuth()).then(() => {
      this.authInfoSubject.next({
        isSignedIn: false,
      })
      alert("Signed Out Successfully.")
    })
    .catch((error) => {
      alert("An Error Occurred While Signing Out: Try Again.")
    })
  }

  constructor() {
    getAuth().setPersistence(browserLocalPersistence).then(() => {
      if(getAuth().currentUser !== null) {
        this.authInfoSubject.next({
          isSignedIn: true,
          userEmail: getAuth().currentUser?.email,
        })
      }
    })
    .catch (e => {
      console.log("error")
    })
  }
}
