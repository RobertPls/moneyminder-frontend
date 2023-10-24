import { Component, OnInit } from '@angular/core';
import { Subscribable } from 'rxjs';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { RegisterService } from 'src/app/shared/services/register/register.service';
import { Router } from '@angular/router';

function containsNumber(control: AbstractControl): { [key: string]: boolean } | null {
  const value: string = control.value;
  const hasNumber = /\d/.test(value); // Comprueba si la cadena contiene al menos un número

  return hasNumber ? null : { 'noNumber': true };
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  showValidationAlert: boolean = false;
  message: String = "";

  constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), containsNumber]]
    });
  }

  onSubmit(): void {
    console.log(this.registerForm.get('password'));

    if (this.registerForm.valid) {
      const { username, firstName, lastName, email, password } = this.registerForm.value;
      console.log(this.registerForm.value)
      const observable: Subscribable<any> = this.registerService.register(username, firstName, lastName, password, email);

      const observer = {
        next: (response: any) => {
          this.router.navigateByUrl('/login');
        },
        error: (response: any) => {
          this.message = response.message;
          this.showValidationAlert = true;
        }
      };

      observable.subscribe(observer);
    } else {
      this.showValidationAlert = true;
    }
  }

  
}