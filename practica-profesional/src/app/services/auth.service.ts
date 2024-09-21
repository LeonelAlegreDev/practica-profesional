import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, Auth, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false;
  msjError: string = '';
  user: any;


  constructor(private auth: Auth, private userService: UserService) { }

  IsLoggedIn() {
    return this.isLoggedIn;
  }

  Logout() {
    console.log('Usuario deslogeado con exito');
    this.isLoggedIn = false;
  }

  async Signup(email: string, password: string) : Promise<boolean> {
    try {
      const res = await createUserWithEmailAndPassword(this.auth, email, password);
      const usr = await this.userService.CreateUser(res.user.uid, email, 'usuario', 'masculino',);

      if (usr !== null && usr.id !== null) {
        this.user = usr;
        return true;
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
        // busca en la coleccion de firestore el usuario que contenga el campo id 
        // igual al uid del usuario autenticado
        const user = await this.userService.GetUser(res.user.uid);
        
        console.log("usuario encontrado: ", user);
        console.log("tipo de dato: ", typeof user);

        // this.user = res.user.uid;
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
