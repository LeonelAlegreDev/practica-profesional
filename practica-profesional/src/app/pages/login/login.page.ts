import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonItem, IonInput, IonText, IonButton, IonIcon, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol, IonFooter } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonFooter, IonCol, IonRow, IonGrid, IonCardTitle, IonCardHeader, IonIcon, IonButton, IonText, IonInput, IonItem, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, RouterLink]
})
export class LoginPage implements OnInit {
  private userService = inject(UserService);
  public authService =  inject(AuthService);
  private router = inject(Router);

  form!: FormGroup;
  isPwd = false;

  errorMessage = "";

  constructor(){
    this.initForm();
  }

  ngOnInit() {
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  togglePwd() {
    this.isPwd = !this.isPwd;
  }

  async Submit(){
    // Valida si el formulario es inválido
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    try{
      const userId = await this.authService.Login(this.form.value.email, this.form.value.password);

      if(userId && typeof 'string'){
        const user = await this.userService.GetUserById(userId);

        if(user && typeof user.id === 'string'){
          this.authService.user = user;
          console.log("Usuario autenticado: ", this.authService.user);

          this.router.navigate(['/home']);
        }
        else throw new Error('No se encontro usuario');
      }
      else throw new Error('No se pudo iniciar sesión');
    } catch (error: any) {
      // Manejar error
      this.errorMessage = error.message;
      console.log("Error al iniciar sesion: ", error.message);
    }
  }
}
