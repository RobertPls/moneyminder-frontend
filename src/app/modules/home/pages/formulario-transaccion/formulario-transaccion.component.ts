import { Component, OnInit } from '@angular/core';
import { PartialObserver, Subscribable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TransactionService } from 'src/app/shared/services/transaction/transaction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from 'src/app/Core/models/Transaction';
import { Category } from 'src/app/Core/models/Category';
import { Account } from 'src/app/Core/models/Account';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-formulario-transaccion',
  templateUrl: './formulario-transaccion.component.html',
  styleUrls: ['./formulario-transaccion.component.css']
})
export class FormularioTransaccionComponent implements OnInit {
  transaccionForm!: FormGroup;
  showValidationAlert: boolean = false;
  categoryList: Category[] | undefined;
  accountList: Account[] | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private categoryService: CategoryService,
    private transaccionService: TransactionService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
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

  registrarTransaccion() {
    if (this.transaccionForm.valid) {
      const transaccion: Transaction = {
        amount: this.transaccionForm.value.amount,
        date: this.transaccionForm.value.date,
        type: +this.transaccionForm.value.type,
        description: this.transaccionForm.value.description,
        accountId: this.transaccionForm.value.accountId,
        categoryId: this.transaccionForm.value.categoryId, 
      };


        const observable: Subscribable<any> = this.transaccionService.registrerTransaction(transaccion);
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