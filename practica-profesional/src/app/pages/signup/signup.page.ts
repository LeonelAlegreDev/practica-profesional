import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonText, IonInput, IonCol, IonRow, IonGrid } from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonGrid, IonRow, IonCol, IonInput, IonText, IonIcon, IonButton, IonItem, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class SignupPage implements OnInit {
  form!: FormGroup;
  isPwd = false;
  errorMessage = "";

  private authService: AuthService = inject(AuthService);
  private userService: UserService = inject(UserService);
  private router = inject(Router);


  constructor() {
    this.initForm();
  }

  ngOnInit() {}

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

    try {
      const res = await this.authService.Signup(this.form.value.email, this.form.value.password);
      
      if(res && typeof 'string'){
        const userProfile = {
          id: res,
          email: this.form.value.email,
          perfil: 'usuario',
          sexo: 'masculino',
        }   

        const user = await this.userService.CreateUser(userProfile);
        this.authService.user = user;

        console.log("Cuenta creada con exito: ", user);

        this.router.navigate(['/home']);
      }
    } catch (error: any) {
      this.errorMessage = error.message;
      console.log("Error al crear usuario: ", error.message);
    }
  }
}
