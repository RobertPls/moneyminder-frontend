import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../../../../Core/models/Account';
import { Subscribable } from 'rxjs';
import { AccountService } from '../../../../shared/services/account/account.service';

@Component({
  selector: 'app-formulario-cuenta',
  templateUrl: './formulario-cuenta.component.html',
  styleUrls: ['./formulario-cuenta.component.css']
})
export class FormularioCuentaComponent implements OnInit {
  cuentaForm!: FormGroup;
  showValidationAlert: boolean = false;
  accountId: string | null = null;


  constructor(private accountService: AccountService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.cuentaForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      if (params['accountId']) {
        this.accountId = params['accountId'];
      }
    });
  }

  registrarCuenta() {
    if (this.cuentaForm.valid) {
      const account: Account = {
        name: this.cuentaForm.value.name,
        description: this.cuentaForm.value.description,
      };

      if (this.accountId) {
        account.id = this.accountId;
        const observable: Subscribable<any> = this.accountService.editAccount(account.id, account.name, account.description);
        const observer = {
          next: () => {
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          error: (error: string) => {
            this.showValidationAlert = true;
            console.log(error);
          }
        };
        observable.subscribe(observer);
      } else {
        const observable: Subscribable<any> = this.accountService.registerAccount(account);
        const observer = {
          next: () => {
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          error: (error: any) => {
            console.log(error)
            this.showValidationAlert = true;
          }
        };
        observable.subscribe(observer);
      }

    } else {
      this.showValidationAlert = true;
    }
  }


  cancelarRegistro() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
