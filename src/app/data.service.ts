import { Injectable } from '@angular/core';
import { collection, doc, getDoc, getDocs, getFirestore } from '@angular/fire/firestore';
import { Home } from './home';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getHomes() {
    const db = getFirestore();
    let res: Home[] = [];

    const ref = collection(db, 'homes');

    getDocs(ref).then(snapShot => {
      console.log(snapShot);
      snapShot.forEach(doc => {
        res.push(doc.data() as Home);
      })
    })

    return res;
  }

  async getHomeById(id: string) {
    const db = getFirestore();
    let res: Home = {} as Home;

    const docRef = doc(db, 'homes', id);

    await getDoc(docRef).then(doc => {
      res = doc.data() as Home;
    })

    return res;
  }

  constructor() { }
}
