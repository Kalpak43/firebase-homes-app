import { Injectable } from '@angular/core';
import { Home } from './home';
import { homesData } from './homesData';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  getHomeById(id: number): Home | undefined {
    return homesData.find(home => home.id === id);
  }

  constructor() { }
}
