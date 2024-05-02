import { Injectable } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

import { Firestore } from '@angular/fire/firestore';
import {
  collection,
  doc,
  setDoc,
  Unsubscribe,
  onSnapshot,
  deleteDoc,
} from 'firebase/firestore';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {
  constructor(
    private authService: AuthService,
    private firestore: Firestore,
    private store: Store<AppState>
  ) {}

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const uid = this.authService.user?.uid;

    /*
    Esta insercion se diferencia de la del auth service
    En el auth serivce creabamos a partir del id la colección, para luego añador un documento a esta
    Es decir idColeccion/user donde idColeccion es la colección y user es el documento
 
    Aquí lo que queremos hacer es difente, queremos crear un documento ingreso-egreso, y a este añadirle una colección
    es decir idColeccion/ingreso-egreso/items donde idColeccion es la colección y ingreso-egreso es el documento e items es la colección final a la que añadiremos el nuevo documento
 
    Se deja comentada la forma larga para entender el pasó a pasó de lo ocurrido
 
    // Teniendo una referencia a la coleccion de usuarios por id
    const colectionIngresoEgreso = collection(this.firestore, `${uid}`);
 
    // se crea referencia al documento, es decir dentro del mismo uid quiero adicional el documento ingreso-egreso
    const documentRef = doc(colectionIngresoEgreso, 'ingreso-egreso');
 
    //se crea la coleccion items dentro del documento ingreso-egreso
    const coleccionItems = collection(documentRef, 'items');
 
    //se crean los documentos pero no se asinan por un nombre sino por un id genérico de firebase
    const docItems = doc(coleccionItems);
 
    setDoc(docItems, {...ingresoEgreso}).then(()=> console.log('documento insertado con exito', documentRef.id))
    */

    //Forma corta
    //Como sabemos que items es una colección que queremos tener en el documento ingreso-egreso, asignamos el path directamante
    const collectionIngresoEgreso = collection(
      this.firestore,
      `${uid}/ingreso-egreso/items`
    );

    //se crean los documentos dentro de la coleccion items pero no se asinan por un nombre sino por un id genérico de firebase
    const documentRef = doc(collectionIngresoEgreso);

    //se setea el documento a la coleccion definida por id generico
    //Nota Importante:
    /*
    Como comentamos el uid del modelo no es necesario pasarlo explicitamente, es decir, si fuera parte del modelo, debemos enviar { ...ingresoEgreso, uid }, es decir
    setDoc(documentRef, { ...ingresoEgreso, uid })
 
    No es necesario hacer un then para setDoc porque este devuelve un Promise<void>, en caso de requerir informacion se puede hacer de la siguiente manera
    setDoc(documentRef, { ...ingresoEgreso }).then(()=> console.log('documento insertado con exito', documentRef))
    */

    return setDoc(documentRef, { ...ingresoEgreso });
  }

  initIngresosEgresosListener(uid: string) {
    console.log('initIngresosEgresosListener', uid);
    //mockup
    const collectionIngresoEgreso: IngresoEgreso[] = [
      {
        uid: '123',
        description: 'salario',
        monto: 3000,
        tipo: 'ingreso',
      },
      {
        uid: '124',
        description: 'salario2',
        monto: 4000,
        tipo: 'egreso',
      },
    ];

    const ingresoEgresoObservable = of(collectionIngresoEgreso);

    onSnapshot(doc(this.firestore, `${uid}/ingreso-egreso`), (snapshot) => {
      console.log('snapshot', snapshot.data());
    });

    return ingresoEgresoObservable;

    // return onSnapshot(
    //     doc(this.firestore, `${uid}/ingreso-egreso/items`),

    //   collection(
    //   (snapshot) => {
    //     let data: any = snapshot.data();
    //     return snapshot;
    //   }
    // );

    //   const collectionIngresoEgreso = collection(
    //     this.firestore,
    //     `${uid}/ingreso-egreso/items`
    //   );

    //   const dos = onSnapshot(collectionIngresoEgreso, (snapshot) => {
    //     console.log('snapshot', snapshot);
    //   });

    // return collectionIngresoEgreso.firestore
    //   .snapshotChanges()
    //   .pipe(
    //     map((snapshot) =>
    //       snapshot.map((doc) => ({
    //         uid: doc.payload.doc.id,
    //         ...(doc.payload.doc.data() as any),
    //       }))
    //     )
    //   );
  }

  borrarIngresoEgreso(uid: string) {
    return deleteDoc(doc(this.firestore, `${uid}/ingreso-egreso`));
  }
}
