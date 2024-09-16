import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false;
  msjError: string = '';
  user: any;


  constructor(private auth: Auth) { }

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
      if (res.user.email !== null && res.user.uid !== null) {
        this.user = res.user.uid;
        this.isLoggedIn = true;
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
