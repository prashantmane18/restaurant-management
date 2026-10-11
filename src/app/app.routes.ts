import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register').then(m => m.Register)
  },
  {
    path: 'restaurants',
    loadComponent: () =>
      import('./pages/restaurant-list/restaurant-list').then(
        m => m.RestaurantList
      )
  },
  {
    path: 'restaurants/add',
    loadComponent: () =>
      import('./pages/restaurant-form/restaurant-form').then(
        m => m.RestaurantForm
      )
  },
  {
    path: 'restaurants/edit/:id',
    loadComponent: () =>
      import('./pages/restaurant-form/restaurant-form').then(
        m => m.RestaurantForm
      )
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];