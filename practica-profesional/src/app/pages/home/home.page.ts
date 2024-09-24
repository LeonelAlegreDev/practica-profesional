import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, RouterLink]
})
export class HomePage implements OnInit {
  bienvenida: string = 'Bienvenido a Práctica Profesional';
  authService: AuthService = inject(AuthService);
  appName = "Aplicación N°1";
  appSlogan = "Mí slogan";

  constructor() { }

  ngOnInit() {
  }

}
