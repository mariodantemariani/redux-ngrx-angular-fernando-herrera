import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: ``,
})
export class RegisterComponent implements OnInit, OnDestroy {
  registroForm!: FormGroup;

  cargando: boolean = false;
  uiSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.uiSubscription = this.store.select('ui').subscribe((ui) => {
      this.cargando = ui.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  crearUsuario() {
    if (this.registroForm.invalid) {
      return;
    }
    // Swal.fire({
    //   title: 'Creando Usuario',
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });

    this.store.dispatch(ui.isLoading());

    const { nombre, email, password } = this.registroForm.value;
    this.authService
      .crearUsuario(nombre, email, password)
      .then((resp) => {
        //Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['./']);
      })
      .catch((err) => {
        // Swal.close();
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        });
      });
  }
}
