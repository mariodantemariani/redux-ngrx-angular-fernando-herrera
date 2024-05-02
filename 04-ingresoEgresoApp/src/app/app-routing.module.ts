import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardRoutes } from './dashboard/dashboard.routes';
import { canMatch } from './services/auth.guard';
import { IngresoegresoModule } from './ingreso-egreso/ingresoegreso.module';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    canMatch: [canMatch],
    loadChildren: () =>
      import('./ingreso-egreso/ingresoegreso.module').then(
        (m) => m.IngresoegresoModule
      ),
  },
  //{ path: 'dashboard', redirectTo: '' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
