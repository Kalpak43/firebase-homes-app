import { Component, Input } from '@angular/core';
import { Home } from '../home';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home-card.component.html',
  styleUrl: './home-card.component.css'
})
export class HomeCardComponent {
  @Input() home!: Home;
}
