import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signUpForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    age: new FormControl(13),
    bio: new FormControl(''),
    password: new FormControl('')
  })

  onSubmit() {
    console.log(this.signUpForm.value)
  }
}
