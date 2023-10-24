import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormularioTransaccionComponent } from './pages/formulario-transaccion/formulario-transaccion.component';
import { FormularioCuentaComponent } from './pages/formulario-cuenta/formulario-cuenta.component';
import { FormularioCategoriaComponent } from './pages/formulario-categoria/formulario-categoria.component';
import { FormularioTransferenciaComponent } from './pages/formulario-transferencia/formulario-transferencia.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'formulario-transaccion',
        component: FormularioTransaccionComponent
      },
      {
        path: 'formulario-transferencia',
        component: FormularioTransferenciaComponent
      },

      {
        path: 'formulario-cuenta',
        component: FormularioCuentaComponent
      },
      {
        path: 'formulario-categoria',
        component: FormularioCategoriaComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }