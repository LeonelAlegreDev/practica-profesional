import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, DocumentReference, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserProfile } from '../interfaces/user-profile';
import { user } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users$: Observable<UserProfile[]>;
  usersCollection: CollectionReference;
  
  constructor(private firestore: Firestore) { 
    // get a reference to the user-profile collection
    this.usersCollection = collection(this.firestore, 'users');

    // get documents (data) from the collection using collectionData
    this.users$ = collectionData(this.usersCollection) as Observable<UserProfile[]>;
  }

  async CreateUser(id: string, email: string, perfil: string, sexo: string) {
    try {
      const result = await addDoc(this.usersCollection, <UserProfile> { id, email, perfil, sexo });
      // TODO: Crear documento con id custom


      if (result instanceof DocumentReference && result.id) { 
        return {
          id: result.id,
          email: email,
          perfil: perfil,
          sexo: sexo
        };
      }
      else throw new Error('Error al crear usuario');
    }
    catch (error) {
      // TODO: manejar error
      throw error;
    }
  }

  async GetUser(id: string) {
    try {      
      // const usuario = await this.users$.subscribe(users => {
      //   let userFound: any = null;

      //   users.forEach((user: UserProfile) => {
      //     if(user.id === id) {
      //       userFound =  user;
      //       return;
      //     }
      //   });

      //   if(userFound) {
      //     return userFound;
      //   }
      //   throw new Error('Usuario no encontrado');
      // });

      // TODO: Rehacer metodo

      const result = await this.users$.pipe(
        map(users => users.find(user => user.id === id))
      );

      console.log('Result:', result);

      
      const user = await result.subscribe(user => {
        if (user) {
          console.log('Found user:', user);

          // You can use the user object here for further actions
          return user;
        } else {
          console.log('User with ID', id, 'not found.');
          throw new Error('User not found');
        }
      });
      console.log('User:', user);
    } catch (error) {
      throw error;
    }
  }
}
