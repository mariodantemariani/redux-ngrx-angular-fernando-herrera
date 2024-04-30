import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  authState,
} from '@angular/fire/auth';
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';

import { getDatabase, ref, set } from 'firebase/database';

import { Firestore } from '@angular/fire/firestore';
import {
  collection,
  doc,
  setDoc,
  Unsubscribe,
  onSnapshot,
} from 'firebase/firestore';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userUnsubscribe!: Unsubscribe;
  constructor(
    public auth: Auth,
    private firestore: Firestore,
    private store: Store<AppState>
  ) {}

  initAuthListener() {
    this.auth.onAuthStateChanged((fUser) => {
      if (fUser) {
        this.userUnsubscribe = onSnapshot(
          doc(this.firestore, `${fUser.uid}/user`),
          (docUser: any) => {
            let data: any = docUser.data();
            let user = Usuario.fromFirebase(data);
            this.store.dispatch(authActions.setUser({ user }));
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        this.userUnsubscribe ? this.userUnsubscribe() : null;
        this.store.dispatch(authActions.unSetUser());
      }
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password).then(
      ({ user }) => {
        const newUser: Usuario = {
          nombre: nombre,
          email: user.email!,
          uid: user.uid,
        };
        const collectionRef = collection(this.firestore, `${user.uid}`);
        const documentRef = doc(collectionRef, 'user');
        setDoc(documentRef, newUser);

        return user;
      }
    );
  }

  loginUsuario(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return authState(this.auth).pipe(map((fuser) => fuser != null));
  }
}
