import { Injectable, inject } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { DataService } from './data.service';
import { getFirestore, setDoc } from '@angular/fire/firestore';
import { doc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = inject(Auth);
  dataService = inject(DataService);

  // Auth Info (Observable)
  private authInfoSubject = new BehaviorSubject<object>({ isSignedIn: false });
  authInfo$ = this.authInfoSubject.asObservable();

  // Sign Up With Email and Password
  createNewUser(userInfo: any) {

    const db = getFirestore();

    createUserWithEmailAndPassword(getAuth(), userInfo.email, userInfo.password).then(userCredential => {
      if (userCredential.user !== null) {
        const profilePhoto = this.dataService.uploadFiles(userInfo.profile, 'profile')
        const user = {
          name: userInfo.name,
          age: userInfo.age,
          bio: userInfo.bio,
          email: userInfo.email,
          profile: profilePhoto
        }

        setDoc(doc(db, 'users', userCredential.user.uid), {
          ...user
        })
        .then(() => {
          console.log("Sign Up Successful")
        })
      }
    })
  }

  // Sign In With Email and Password
  signInWithEmailAndPassword(email: string, password: string) {
    if (email !== '' && password !== '') {
      
      return signInWithEmailAndPassword(getAuth(), email, password)
        .then((userCredential) => {
          this.authInfoSubject.next({
            isSignedIn: true,
            userEmail: userCredential.user.email,
          });
        })
        .catch((error) => {
          alert(
            'An Error Occurred While Signing In: Check Your Email and Password and Try Again.'
          );
          this.authInfoSubject.next({ isSignedIn: false });
        });
    }

    return;
  }

  // Sign in With Google
  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(getAuth(), provider)
      .then((x) => {
        this.authInfoSubject.next({
          isSignedIn: true,
          userEmail: x.user.email,
        });
      })
      .catch((error) => {
        alert(
          'An Error Occurred While Signing In: Check Your Email and Password and Try Again.'
        );
        this.authInfoSubject.next({ isSignedIn: false });
      });
  }

  // Sign Out
  signOut() {
    signOut(getAuth())
      .then(() => {
        this.authInfoSubject.next({
          isSignedIn: false,
        });
        alert('Signed Out Successfully.');
      })
      .catch((error) => {
        alert('An Error Occurred While Signing Out: Try Again.');
      });
  }

  // Constructor (Checks if User is Signed In)
  constructor() {
    getAuth()
      .setPersistence(browserLocalPersistence)
      .then(() => {
        if (getAuth().currentUser !== null) {
          this.authInfoSubject.next({
            isSignedIn: true,
            userEmail: getAuth().currentUser?.email,
          });
        }
      })
      .catch((e) => {
        console.log('error');
      });
  }
}
