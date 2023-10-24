import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PartialObserver, Subscribable } from 'rxjs';
import { Account } from 'src/app/Core/models/Account';
import { Balance } from 'src/app/Core/models/Balance';
import { Category } from 'src/app/Core/models/Category';
import { Transaction } from 'src/app/Core/models/Transaction';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { TransactionService } from 'src/app/shared/services/transaction/transaction.service';

@Component({
  selector: 'app-filtro-transaccion',
  templateUrl: './filtro-transaccion.component.html',
  styleUrls: ['./filtro-transaccion.component.css']
})
export class FiltroTransaccionComponent {
  categoryList : Category[] | undefined;
  accountList : Account[] | undefined;
  transactionList : Transaction[] | undefined;
  balanceFechaForm: FormGroup;
  alert: boolean = false;

  constructor(private formBuilder: FormBuilder, private transactionService: TransactionService, private accountService: AccountService, private categoryService: CategoryService) {
    this.balanceFechaForm = this.formBuilder.group({
      fechaDesde: [''],
      fechaHasta: [''],
      accountId: [''], 
      categoryId: [''],
    });
  }

  ngOnInit() {
    this.obtenerAccountList();
    this.obtenerCategoryList();
    this.transactionList = [];
  }

  consultarBalancePorFechas() {
    const fechaDesde = this.balanceFechaForm.value.fechaDesde;
    const fechaHasta = this.balanceFechaForm.value.fechaHasta;
    const accountId = this.balanceFechaForm.value.accountId;
    const categoryId = this.balanceFechaForm.value.categoryId;

    if (new Date(fechaDesde) >= new Date(fechaHasta)) {
      this.alert = true;
    } else {
      const observable: Subscribable<any> = this.transactionService.searchTransaction(accountId, categoryId,fechaDesde, fechaHasta);
        const observer = {
          next: (response: any) => {
            if (response.success) {
              this.alert = false;
              this.transactionList = response.data;
            } else {
              console.error('Error al obtener la lista de transacciones filtradas:', response.message);
            }
          },
          error: () => {
          }
        };
        observable.subscribe(observer);
    }
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
}