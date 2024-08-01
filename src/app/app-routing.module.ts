import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //definimos las rutas
  {
    path: 'reactive', //path '' (vacío)
    loadChildren: () => import('./reactive/reactive.module').then( m => m.ReactiveModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule),
  },
  //ponemos el comodin
  {
    path: '**',
    redirectTo: 'reactive',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
