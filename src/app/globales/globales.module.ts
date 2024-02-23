import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';

import { CategoriasComponent } from '../pages/categorias/categorias.component';
import { ProductosComponent } from '../pages/productos/productos.component';
import { SubcategoriasComponent } from '../pages/subcategorias/subcategorias.component';
import { UsersComponent } from '../pages/users/users.component';
import { NoexisteComponent } from '../pages/noexiste/noexiste.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'subcategorias', component: SubcategoriasComponent },
  { path: 'users', component: UsersComponent },
  { path: '**', component: NoexisteComponent, }
];

@NgModule({
  exports: [
    RouterModule,
    NavbarComponent,
    LoginComponent,
    FooterComponent,
  ],
  declarations: [
    NavbarComponent,
    LoginComponent,
    FooterComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class GlobalesModule { }
