import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, Auth, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { UserService } from './user.service';
import { UserProfile } from '../interfaces/user-profile';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false;
  msjError: string = '';
  user: UserProfile | null = null;

  constructor(private auth: Auth, private userService: UserService) { }

  IsLoggedIn() {
    return this.isLoggedIn;
  }

  Logout() {
    console.log('Usuario deslogeado con exito');
    this.isLoggedIn = false;
  }

  async Signup(email: string, password: string) : Promise<string> {
    try {
      const res = await createUserWithEmailAndPassword(this.auth, email, password);

      if (res.user.email !== null && res.user.uid !== null) {
        console.log("Usuario creado con Fire Auth");
        return res.user.uid;
      }
      else{
        throw new Error("Error al crear usuario");
      }
    } catch (e: any) {
      switch (e.code) {
        case "auth/invalid-email":
          this.msjError = "Email invalido";
          break;
        case "auth/email-already-in-use":
          this.msjError = "Email ya en uso";
          break;
        default:
          this.msjError = e.code
          break;
      }
      throw new Error(this.msjError);
    }
  }

  async Login(email: string, password: string) {
    try{
      const res = await signInWithEmailAndPassword(this.auth, email, password);

      // Valida si el usuario autenticado tiene un email y un uid
      if (res.user.email !== null && res.user.uid !== null) {

        // this.user = res.user.uid;
        this.isLoggedIn = true;

        return res.user.uid;
      }
      else throw new Error("Error al iniciar sesion");      
    } catch(e: any){
      let msjError = '';
      
      if(e.code === "auth/invalid-credential"){
        msjError = "Credenciales invalidas";
      }
      else msjError = "Error al iniciar sesion";

      throw new Error(msjError);
    } 
  }
}
