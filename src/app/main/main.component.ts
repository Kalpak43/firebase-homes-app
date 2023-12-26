import { Component } from '@angular/core';
import { HomeCardComponent } from '../home-card/home-card.component';
import { Home } from '../home';
import { homesData } from '../homesData';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HomeCardComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

  homesData: Home[] = homesData;

  filteredData: Home[] = homesData;

  filterData (filter: string) {
    if (!filter) {
      this.filteredData = this.homesData;
      return;
    }

    this.filteredData = this.filteredData.filter(home => home.city.toLowerCase().includes(filter.toLowerCase()))
  }
}
