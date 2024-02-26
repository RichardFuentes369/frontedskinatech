
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';


import { CategoriasComponent } from './categorias/categorias.component';
import { ProductosComponent } from './productos/productos.component';
import { SubcategoriasComponent } from './subcategorias/subcategorias.component';
import { SubasociadospComponent } from './subasociadosp/subasociadosp.component';

import { ListaComponent as CategoriaList} from './categorias/components/lista/lista.component';
import { FormularioComponent as CategoriaFormulario} from './categorias/components/formulario/formulario.component'
import { CategoriaService } from './categorias/service/categoria.service'

import { ListaComponent as ProductoList} from './productos/components/lista/lista.component'
import { FormularioComponent as ProductoFormulario} from './productos/components/formulario/formulario.component';

import { ListaComponent as SubcategoriaList} from './subcategorias/components/lista/lista.component';
import { FormularioComponent as SubcategoriaFormulario} from './subcategorias/components/formulario/formulario.component';

import { ListaComponent as  AsociadosList} from './subasociadosp/components/lista/lista.component';
import { FormularioComponent as  SubasociadosFormulario} from './subasociadosp/components/formulario/formulario.component';
import { SubasociadospService } from './subasociadosp/service/subasociadosp.service';


@NgModule({
  declarations: [
    CategoriasComponent,
    ProductosComponent,
    SubcategoriasComponent,
    SubasociadospComponent,

    CategoriaList,
    CategoriaFormulario,
    ProductoList,
    ProductoFormulario,
    SubcategoriaList,
    SubcategoriaFormulario,
    AsociadosList,
    SubasociadosFormulario,
  ],
  exports: [
    CategoriasComponent,
    ProductosComponent,
    SubcategoriasComponent,
    SubasociadospComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    CategoriaService
  ]
})
export class PagesModule { }
