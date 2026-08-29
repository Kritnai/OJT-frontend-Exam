import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'main', canActivate: [authGuard], loadComponent: () => import('./pages/main/main.component').then(m => m.MainComponent) },
  { path: 'add-edit', canActivate: [authGuard], loadComponent: () => import('./pages/add-edit/add-edit.component').then(m => m.AddEdit) },
  { path: 'view', canActivate: [authGuard], loadComponent: () => import('./pages/view/view.component').then(m => m.View) }
];
