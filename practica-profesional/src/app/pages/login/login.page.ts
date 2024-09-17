import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonItem, IonInput, IonText, IonButton, IonIcon, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol, IonFooter } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonFooter, IonCol, IonRow, IonGrid, IonCardTitle, IonCardHeader, IonIcon, IonButton, IonText, IonInput, IonItem, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  form!: FormGroup;
  isPwd = false;
  loggedUser = '';

  constructor(public auth: AuthService){
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
      await this.auth.Login(this.form.value.email, this.form.value.password);
      console.log("Usuario logeado con id: ", this.auth.user);
    } catch (error: any) {
      // Manejar error
      console.log("Error al iniciar sesion: ", error.message);
    }
  }
}
