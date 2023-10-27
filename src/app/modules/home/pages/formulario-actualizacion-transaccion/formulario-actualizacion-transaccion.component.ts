import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartialObserver, Subscribable } from 'rxjs';
import { Account } from 'src/app/Core/models/Account';
import { Category } from 'src/app/Core/models/Category';
import { Transaction } from 'src/app/Core/models/Transaction';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { TransactionService } from 'src/app/shared/services/transaction/transaction.service';

@Component({
  selector: 'app-formulario-actualizacion-transaccion',
  templateUrl: './formulario-actualizacion-transaccion.component.html',
  styleUrls: ['./formulario-actualizacion-transaccion.component.css']
})
export class FormularioActualizacionTransaccionComponent implements OnInit {
  transactionId: string | null = null;
  esTransaccion: boolean = true;
  showValidationAlert: boolean = false;
  transferenciaForm!: FormGroup;
  transaccionForm!: FormGroup;
  categoryList: Category[] | undefined;
  accountList: Account[] | undefined;


  constructor(
    private formTransferenceBuilder: FormBuilder,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private categoryService: CategoryService,
    private transaccionService: TransactionService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['transactionId']) {
        this.transactionId = params['transactionId'];
      }else{
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });

    this.transferenciaForm = this.formTransferenceBuilder.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      date: ['', Validators.required],
      originAccountId: ['', Validators.required], 
      destinationAccountId: ['', Validators.required],
    });

    this.transaccionForm = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      date: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      accountId: ['', Validators.required], 
      categoryId: ['', Validators.required],
    });

    this.obtenerAccountList();
    this.obtenerCategoryList();

  }

  obtenerAccountList() {
    const observer: PartialObserver<any> = {
      next: (response) => {
        if (response.success) {
          this.accountList = response.data;
        } else {
          console.error('Error al obtener el la lista de cuentas:', response.message);
        }
      },
      error: (error) => {
      }
    };

    this.accountService.getAccounts().subscribe(observer);
  }

  obtenerCategoryList() {
    const observer: PartialObserver<any> = {
      next: (response) => {
        if (response.success) {
          this.categoryList = response.data;
        } else {
          console.error('Error al obtener el la lista de categorias:', response.message);
        }
      },
      error: (error) => {
      }
    };

    this.categoryService.getCategories().subscribe(observer);
  }


  actualizarTransaccion() {
    if (this.transaccionForm.valid) {
      const transaccion: Transaction = {
        id: this.transactionId!,
        amount: this.transaccionForm.value.amount,
        date: this.transaccionForm.value.date,
        type: +this.transaccionForm.value.type,
        description: this.transaccionForm.value.description,
        accountId: this.transaccionForm.value.accountId,
        categoryId: this.transaccionForm.value.categoryId, 
      };


        const observable: Subscribable<any> = this.transaccionService.editTransaction(
          transaccion.id!,
          transaccion.accountId,
          transaccion.categoryId!,
          transaccion.date,
          transaccion.amount,
          transaccion.description,
          transaccion.type!
          );
        const observer = {
          next: () => {
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          error: (error: any) => {
            this.showValidationAlert = true;
          }
        };
        observable.subscribe(observer);
      

    } else {
      this.showValidationAlert = true;
    }
  }

  actualizarTransferencia() {
    if (this.transferenciaForm.valid) {
      const transferencia: Transaction = {
        id: this.transactionId!,
        amount: this.transferenciaForm.value.amount,
        date: this.transferenciaForm.value.date,
        description: this.transferenciaForm.value.description,
        accountId: this.transferenciaForm.value.originAccountId,
        destinationAccountId: this.transferenciaForm.value.destinationAccountId,
      };


        const observable: Subscribable<any> = this.transaccionService.editTransference(
          transferencia.id!,
          transferencia.accountId,
          transferencia.destinationAccountId!,
          transferencia.date,
          transferencia.amount,
          );
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
