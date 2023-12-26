import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Home } from '../home';
import { HomeService } from '../home.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-details.component.html',
  styleUrl: './home-details.component.css'
})
export class HomeDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  dataService = inject(DataService)
  homeService = inject(HomeService)

  homeId: string;
  homeData : Home | undefined;

  constructor () {
    this.homeId = this.route.snapshot.params['id'];
    this.dataService.getHomeById(this.homeId).then(homeData => {
      this.homeData = homeData;
    })
  }

}
