import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'homes-app-ecc89',
          appId: '1:81101121516:web:48fc480da4eb83bad6c2c9',
          storageBucket: 'homes-app-ecc89.appspot.com',
          apiKey: 'AIzaSyBzGQRSIxKlymn892C5vAcvv3dro88rSPA',
          authDomain: 'homes-app-ecc89.firebaseapp.com',
          messagingSenderId: '81101121516',
          measurementId: 'G-SYVTWJ6VWB',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideStorage(() => getStorage())),
  ],
};
