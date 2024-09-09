import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  // imports: [IonHeader, IonToolbar, IonTitle, IonContent],
  imports: [IonicModule, FormsModule],
})
export class HomePage {
  title: string = 'Home Page';
  email: string = 'usuario1@email.com';
  password: string = '1234';

  input_email: string = '';
  input_password: string = '';

  alert = {
    title: 'Alert',
    message: 'Sesión iniciada con exito!',
    buttons: ['Aceptar'],
  };

  constructor() {}

  login() {
    if (this.input_email === this.email && this.input_password === this.password) {
      this.alert.message = "Sesion iniciada con exito!";
    } else {
      this.alert.message = "Datos incorrectos!";
    }
    console.log(this.alert.message);
  }

  autocompletar() {
    this.input_email = this.email;
    this.input_password = this.password;

    this.login();
  }
}