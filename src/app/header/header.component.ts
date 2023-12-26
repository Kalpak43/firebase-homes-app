import { Component, effect, inject, signal } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  authService = inject(AuthService)

  authInfo: any = signal({ isSignedIn: false });

  signOut () {
    this.authService.signOut()
  }

  constructor () {
      this.authService.authInfo$.subscribe((authInfo) => (this.authInfo.set(authInfo)))

      effect(() => {
        console.log(this.authInfo())
      })
  }
}
