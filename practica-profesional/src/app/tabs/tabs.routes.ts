import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () => import('../pages/home/home.page').then( m => m.HomePage)
      },
      {
        path: 'login',
        loadComponent: () => import('../pages/login/login.page').then( m => m.LoginPage)
      },
      {
        path: 'signup',
        loadComponent: () => import('../pages/signup/signup.page').then( m => m.SignupPage)
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
