import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from '@angular/fire/firestore';
import {v4 as uuid} from 'uuid';
import { Home } from './home';
import { getStorage, ref, uploadBytes } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  getHomes() {
    const db = getFirestore();
    let res: Home[] = [];

    const ref = collection(db, 'homes');

    getDocs(ref).then((snapShot) => {
      console.log(snapShot);
      snapShot.forEach((doc) => {
        res.push(doc.data() as Home);
      });
    });

    return res;
  }

  async getHomeById(id: string) {
    const db = getFirestore();
    let res: Home = {} as Home;

    const docRef = doc(db, 'homes', id);

    await getDoc(docRef).then((doc) => {
      res = doc.data() as Home;
    });

    return res;
  }

  uploadFiles(file: FileList, folder: string) {
    const prefix = 'https://storage.googleapis.com/homes-app-ecc89.appspot.com/';
    
    const fileExtension =
      file[0].type === 'image/png'
        ? '.png'
        : file[0].type === 'image/jpeg'
        ? '.jpg'
        : '';

    const filePath = folder + '/' + uuid() + fileExtension
    const storage = getStorage();
    const storageRef = ref(storage, filePath);

    uploadBytes(storageRef, file[0]).then(snapShot => {
      console.log("file Uploaded", snapShot)
    })

    return prefix + filePath;
  }

  constructor() {}
}
