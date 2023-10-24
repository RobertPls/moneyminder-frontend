import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormularioTransaccionComponent } from './pages/formulario-transaccion/formulario-transaccion.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FormularioCategoriaComponent } from './pages/formulario-categoria/formulario-categoria.component';
import { FormularioCuentaComponent } from './pages/formulario-cuenta/formulario-cuenta.component';
import { FormularioTransferenciaComponent } from './pages/formulario-transferencia/formulario-transferencia.component';
import { BalanceFechaComponent } from './components/balance-fecha/balance-fecha.component';
import { FiltroTransaccionComponent } from './components/filtro-transaccion/filtro-transaccion.component';



@NgModule({
  declarations: [
    DashboardComponent,
    FormularioTransaccionComponent,
    FormularioCategoriaComponent,
    FormularioCuentaComponent,
    FormularioTransferenciaComponent,
    BalanceFechaComponent,
    FiltroTransaccionComponent,
  ],
  imports: [
    MatIconModule,
    MatMenuModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
