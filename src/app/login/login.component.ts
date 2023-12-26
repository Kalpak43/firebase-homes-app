import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  router: Router = inject(Router);
  authService = inject(AuthService)

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  submitLoginForm () {
    this.authService.signInWithEmailAndPassword(this.loginForm.value.email ?? "", this.loginForm.value.password ?? "")?.then(() => {
      this.router.navigate([''])
    })
  }

  signInWithGoogle () {
    this.authService.signInWithGoogle().then(() => {
      this.router.navigate([''])
    })
  }

  constructor () {
  }
}
