import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartialObserver, Subscribable } from 'rxjs';
import { Account } from 'src/app/Core/models/Account';
import { CreateTransference } from 'src/app/Core/models/CreateTranserence';
import { Transaction } from 'src/app/Core/models/Transaction';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { TransactionService } from 'src/app/shared/services/transaction/transaction.service';

@Component({
  selector: 'app-formulario-transferencia',
  templateUrl: './formulario-transferencia.component.html',
  styleUrls: ['./formulario-transferencia.component.css']
})
export class FormularioTransferenciaComponent implements OnInit {
  transferenciaForm!: FormGroup;
  showValidationAlert: boolean = false;
  accountList: Account[] | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.transferenciaForm = this.formBuilder.group({
      originAccountId: ['', Validators.required],
      destinationAccountId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      date: ['', Validators.required],
    });

    this.obtenerAccountList();
  }

  obtenerAccountList() {
    const observer: PartialObserver<any> = {
      next: (response) => {
        if (response.success) {
          this.accountList = response.data;
        } else {
          console.error('Error al obtener la lista de cuentas:', response.message);
        }
      },
      error: (error) => {
        console.error('Error al obtener la lista de cuentas:', error);
      }
    };

    this.accountService.getAccounts().subscribe(observer);
  }

  registrarTransferencia() {

    const originAccountId = this.transferenciaForm.value.originAccountId;
    const destinationAccountId = this.transferenciaForm.value.destinationAccountId;

    if (originAccountId === destinationAccountId) {
      this.showValidationAlert = true;
      return;
    }


    if (this.transferenciaForm.valid) {
      const transferencia: CreateTransference = {
        originAccountId,
        destinationAccountId,
        amount: this.transferenciaForm.value.amount,
        date: this.transferenciaForm.value.date,
      };

        const observable: Subscribable<any> = this.transactionService.registrerTransference(transferencia);
        const observer = {
          next: () => {
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          error: (error: any) => {
            console.error('Error al registrar la transferencia:', error);
            this.showValidationAlert = true;
          }
        };
        observable.subscribe(observer);

    } else {
      this.showValidationAlert = true;
    }
  }

  cancelarRegistro() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  getMaxDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    let month: string | number = now.getMonth() + 1;
    let day: string | number = now.getDate();

    if (month < 10) {
        month = '0' + month;
    }

    if (day < 10) {
        day = '0' + day;
    }

    return `${year}-${month}-${day}`;
  }
}