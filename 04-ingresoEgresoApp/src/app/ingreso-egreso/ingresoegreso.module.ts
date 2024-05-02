import { NgModule, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { OrdenIngresoPipeTsPipe } from '../pipes/orden-ingreso.pipe.ts.pipe';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { dashboardRoutes } from '../dashboard/dashboard.routes';
import { DashbordroutesModule } from '../dashboard/dashbordroutes.module';
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoPipeTsPipe,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('ingresoEgreso', ingresoEgresoReducer),
    ReactiveFormsModule,
    SharedModule,
    DashbordroutesModule,
  ],
  providers: [BaseChartDirective, provideCharts(withDefaultRegisterables())],
})
export class IngresoegresoModule {}
