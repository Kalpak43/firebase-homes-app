import { Component, inject } from '@angular/core';
import { HomeCardComponent } from '../home-card/home-card.component';
import { Home } from '../home';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HomeCardComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';
  dataService = inject(DataService)

  homesData: Home[] = this.dataService.getHomes();

  filteredData: Home[] = this.homesData;

  filterData (filter: string) {
    if (!filter) {
      this.filteredData = this.homesData;
      return;
    }

    this.filteredData = this.filteredData.filter(home => home.city.toLowerCase().includes(filter.toLowerCase()))
  }

  constructor () {

  }
}
