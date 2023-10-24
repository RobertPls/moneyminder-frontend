import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscribable } from 'rxjs';
import { Balance } from 'src/app/Core/models/Balance';
import { TransactionService } from 'src/app/shared/services/transaction/transaction.service';

@Component({
  selector: 'app-balance-fecha',
  templateUrl: './balance-fecha.component.html',
  styleUrls: ['./balance-fecha.component.css']
})
export class BalanceFechaComponent {
  balanceFechaForm: FormGroup;
  alert: boolean = false;
  balance: Balance | undefined;

  constructor(private formBuilder: FormBuilder, private transactionService: TransactionService) {
    this.balanceFechaForm = this.formBuilder.group({
      fechaDesde: ['', Validators.required],
      fechaHasta: ['', [Validators.required]],
    });
  }

  consultarBalancePorFechas() {
    const fechaDesde = this.balanceFechaForm.value.fechaDesde;
    const fechaHasta = this.balanceFechaForm.value.fechaHasta;

    if (new Date(fechaDesde) >= new Date(fechaHasta)) {
      this.alert = true;
    } else {
      const observable: Subscribable<any> = this.transactionService.getTransactionBalance(fechaDesde, fechaHasta);
        const observer = {
          next: (response: any) => {
            if (response.success) {
              this.alert = false;
              this.balance = response.data;
            } else {
              console.error('Error al obtener el balance filtrado por fechas:', response.message);
            }
          },
          error: () => {
          }
        };
        observable.subscribe(observer);
    }
  }
}