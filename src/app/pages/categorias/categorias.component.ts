import { Component, OnInit, ViewChild } from '@angular/core';
import { ListaComponent as ListaComponentCategorias } from './components/lista/lista.component';
import { FormularioComponent as FormularioComponentCategorias } from './components/formulario/formulario.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent implements OnInit {

  ngOnInit(): void {
  }

  @ViewChild(ListaComponentCategorias) child:any;
  categoriaGuardada() {
    this.child.obtenerCategorias();
  }

  @ViewChild(FormularioComponentCategorias) child2:any;
  async editarModal(id:number) {
    await this.child2.openModel(id)
  }
}
