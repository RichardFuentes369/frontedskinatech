import { Component, OnInit, ViewChild } from '@angular/core';
import { ListaComponent as ListaComponentSubcategorias } from './components/lista/lista.component';
import { FormularioComponent as FormularioComponentSubcategorias } from './components/formulario/formulario.component';

@Component({
  selector: 'app-subcategorias',
  templateUrl: './subcategorias.component.html',
  styleUrl: './subcategorias.component.css'
})
export class SubcategoriasComponent implements OnInit {
  ngOnInit(): void {
  }

  @ViewChild(ListaComponentSubcategorias) child:any;
  subcategoriaGuardada() {
    this.child.obtenerSubcategoria();
  }

  @ViewChild(FormularioComponentSubcategorias) child2:any;
  async editarModal(id:number) {
    await this.child2.openModel(id)
  }
}
