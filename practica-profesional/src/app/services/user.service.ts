import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, setDoc, getDoc, DocumentReference, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserProfile } from '../interfaces/user-profile';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: Firestore) { 

  }

  async CreateUser(user: UserProfile) {
    try {      
      // TODO: validar los campos del usuario
      const usersCollection = collection(this.firestore, 'user_app_1');
      const userRef = doc(usersCollection, user.id);
      await setDoc(userRef, user);

      console.log("Usuario creado con Firestore");

      return user;
    }
    catch (error) {
      // TODO: manejar error
      throw error;
    }
  }

  GetUsers(): Observable<UserProfile[]> {
    try {      
      const usersCollection = collection(this.firestore, 'user_app_1');
      return collectionData(usersCollection, { idField: 'id' }) as Observable<UserProfile[]>;

    } catch (error) {
      throw error;
    }
  }

  async GetUserById(id: string): Promise<UserProfile | null> {
    try {
      const usersCollection = collection(this.firestore, 'user_app_1');
      const userRef = doc(usersCollection, id);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        return userDoc.data() as UserProfile;
      }
      else throw new Error("Usuario no encontrado");
    } catch (error) {
      console.error("Error getting document: ", error);
      throw error;
    }
  }
}
