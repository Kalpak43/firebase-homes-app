import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  authService = inject(AuthService)
  dataService = inject(DataService)

  signUpForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    age: new FormControl(13),
    bio: new FormControl(''),
    password: new FormControl('')
  })

  profilePhoto: any;

  onChange (e: any) {
    this.profilePhoto = e.target.files
  }

  onSubmit() {
    
    this.authService.createNewUser({...this.signUpForm.value, profile: this.profilePhoto})
  }
}
