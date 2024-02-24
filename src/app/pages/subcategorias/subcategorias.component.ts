import { Component, OnInit, ViewChild } from '@angular/core';
import { ListaComponent as ListaComponentSubcategorias } from './components/lista/lista.component';

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
}
