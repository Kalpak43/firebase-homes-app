import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Home } from '../home';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-home-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-details.component.html',
  styleUrl: './home-details.component.css'
})
export class HomeDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  homeService = inject(HomeService)

  homeId = -1
  homeData : Home | undefined;

  constructor () {
    this.homeId = Number(this.route.snapshot.params['id']);
    this.homeData = this.homeService.getHomeById(this.homeId)
  }

}
