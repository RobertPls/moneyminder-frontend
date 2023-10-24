import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartialObserver } from 'rxjs';
import { Account } from 'src/app/Core/models/Account';
import { Category } from 'src/app/Core/models/Category';
import { Profile } from 'src/app/Core/models/Profile';
import { Transaction } from 'src/app/Core/models/Transaction';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';
import { TransactionService } from 'src/app/shared/services/transaction/transaction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  profile : Profile | undefined;
  transactionList : Transaction[] | undefined;
  accountList : Account[] | undefined;
  categoryList : Category[] | undefined;
  selectedAccount: string | null = null;
  mostrarBalance: boolean = true;

  constructor(private transactionService: TransactionService, private categoryService: CategoryService, private profileService: ProfileService, private accountService: AccountService, private activatedRouter: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.obtenerPerfil();
    this.obtenerAccountList();
    this.obtenerCategoryList();
  }

  seleccionarCuenta(cuentaId: string): void {
    this.selectedAccount = cuentaId;
    this.obtenerTransactionListByAccount(cuentaId);
}
  obtenerTransactionListByAccount(cuentaId : string) {
    const observer: PartialObserver<any> = {
      next: (response) => {
        if (response.success) {
          this.transactionList = response.data;
          console.log(response.data)
        } else {
          console.error('Error al obtener el la lista de transacciones:', response.message);
        }
      },
      error: (error) => {
      }
    };

    this.transactionService.getTransactionByAccount(cuentaId).subscribe(observer);
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

  obtenerPerfil() {
    const observer: PartialObserver<any> = {
      next: (response) => {
        if (response.success) {
          this.profile = response.data;
        } else {
          console.error('Error al obtener el perfil:', response.message);
        }
      },
      error: (error) => {
      }
    };

    this.profileService.getProfile().subscribe(observer);
  }

  eliminarCuenta(cuentaId: string)
  {

    this.accountService.deleteAccount(cuentaId).subscribe(
      response => {
        this.obtenerAccountList();
      },
      error => {
      }
    );
  }

  eliminarCategoria(categoryId: string)
  {

    this.categoryService.deleteCategory(categoryId).subscribe(
      response => {
        this.obtenerCategoryList();
      },
      error => {
      }
    );
  }

  eliminarTransaccion(transaccionId: string)
  {

    this.transactionService.deleteTransaction(transaccionId).subscribe(
      response => {
        this.obtenerAccountList();
        this.obtenerPerfil();
        this.obtenerTransactionListByAccount(this.selectedAccount!!);
      },
      error => {
      }
    );
  }

  editarCuenta(id: string)
  {
    this.router.navigate(['/home/formulario-cuenta'], { queryParams: { accountId: id } });
  }

  editarCategoria(id: string)
  {
    this.router.navigate(['/home/formulario-categoria'], { queryParams: { categoryId: id } });
  }

  editarTransaccion(id: string)
  {
  }

  realizarTransaccion(){
    this.router.navigate(['/home/formulario-transaccion']);
  }

  realizarTransferencia()
  {
    this.router.navigate(['/home/formulario-transferencia']);
  }

  agregarCuenta()
  {
    this.router.navigate(['/home/formulario-cuenta']);
  }
  agregarCategoria()
  {
    this.router.navigate(['/home/formulario-categoria']);
  }

  
  mostrarBalancePorFechas() {
    this.mostrarBalance = true;
  }

  mostrarBienvenida() {
    this.mostrarBalance = false;
  }

}