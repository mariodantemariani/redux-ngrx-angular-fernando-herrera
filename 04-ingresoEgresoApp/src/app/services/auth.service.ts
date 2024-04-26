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
import { collection, doc, setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public auth: Auth, private firestore: Firestore) {}
  //private firestore: Firestore;

  initAuthListener() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
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
