import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscribable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LoginService } from 'src/app/shared/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showValidationAlert: boolean = false;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {

      const email = this.loginForm.value.email;

      const password = this.loginForm.value.password;

      const observable: Subscribable<any> = this.loginService.login(email, password);

      const observer = {

        next: (response: any) => {
          const token = response['jwt']
          this.authService.setToken(token);
          this.router.navigateByUrl('/home');
        },
        error: () => {
          this.showValidationAlert = true;
        }
      };

      observable.subscribe(observer);

    } else {

      this.showValidationAlert = true;

    }
  }
  
}
