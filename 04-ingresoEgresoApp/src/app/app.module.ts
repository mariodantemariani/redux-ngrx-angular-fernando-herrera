import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { EstadisticaComponent } from './ingreso-egreso/estadistica/estadistica.component';
import { DetalleComponent } from './ingreso-egreso/detalle/detalle.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

//angular firebase
import { ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { appReducers } from './app.reducer';

//ngrx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment.development';
import { OrdenIngresoPipeTsPipe } from './pipes/orden-ingreso.pipe.ts.pipe';

//firebase
//import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BaseChartDirective } from 'ng2-charts';

import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    OrdenIngresoPipeTsPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'ingreso-egreso-app-7e11c',
        appId: '1:276907960263:web:b9248c9cac7066971e5be2',
        storageBucket: 'ingreso-egreso-app-7e11c.appspot.com',
        apiKey: 'AIzaSyCZ-YrXhPYQjRqJ_bO0nerZtMuoyTLZkTU',
        authDomain: 'ingreso-egreso-app-7e11c.firebaseapp.com',
        messagingSenderId: '276907960263',
        measurementId: 'G-Y5TQG3XDLJ',
      })
    ),

    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BaseChartDirective,
  ],
  providers: [provideCharts(withDefaultRegisterables())],
  bootstrap: [AppComponent],
})
export class AppModule {}
