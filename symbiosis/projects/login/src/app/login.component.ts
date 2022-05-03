import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "./services/authentication.service";

@Component({
  selector: 'login-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  IsValid: boolean = true;
  errorMessage: string = "";

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private authentication: AuthenticationService) { }

  ngOnInit(): void {
  }

  login() {
    this.authentication.login(this.loginForm.value.email, this.loginForm.value.password);
    this.loginForm.get("email").setValue("");
    this.loginForm.get("password").setValue("");
  }
}
