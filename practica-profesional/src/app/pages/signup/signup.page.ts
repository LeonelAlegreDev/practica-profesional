import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonItem, IonButton, IonIcon, IonText, IonInput, IonCol, IonRow, IonGrid } from '@ionic/angular/standalone';
import { createUserWithEmailAndPassword } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';

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

  private auth: AuthService = inject(AuthService);

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
      const res = await this.auth.Signup(this.form.value.email, this.form.value.password);
      console.log("usuario creado con id: ", res);
    } catch (error: any) {
      // TODO: Manejar error
      console.log("Error al crear usuario: ", error.message);
    }
  }
}
