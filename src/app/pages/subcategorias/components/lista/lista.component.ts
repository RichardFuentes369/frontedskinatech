import { Component, Input, OnInit } from '@angular/core';

import { SubcategoriaService } from '../../service/subcategoria.service'
@Component({
  selector: 'app-component-subcategorias-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {

  isAdmin:boolean = true;
  subcategorias:any = [];

  page = 1
  perPage = 5
  order = 'asc'
  field = 'id'
  filtro_field = ''
  filtro_word = ''

  filtroelemento = ''
  filtropalabra = ''

  constructor(private servicio: SubcategoriaService) { }

  ngOnInit(): void {
    this.obtenerSubcategoria()
  }

  async obtenerSubcategoria(){
    this.subcategorias = []
    this.servicio
    .getAll(this.page, this.perPage, this.order, this.field, this.filtro_field, this.filtro_word)
    .subscribe((subcategoria: any) => {
      this.subcategorias = subcategoria
    });
  }

  async aumentar(){
    this.page = this.page + 1
    await this.obtenerSubcategoria()
  }

  async disminuir(){
    this.page = this.page - 1
    await this.obtenerSubcategoria()
  }

  async cambiarPaginacion(){
    this.page = 1
    await this.obtenerSubcategoria()
  }

  async cambiarSort(){
    await this.obtenerSubcategoria()
  }

  async filtro(){
    this.page = 1
    this.filtro_field = this.filtroelemento
    this.filtro_word = this.filtropalabra
    this.obtenerSubcategoria()
  }

  async eliminar(id: number){
    this.servicio
    .delete(id)
    .subscribe(() => {
      this.page = 1
      this.obtenerSubcategoria()
    });
  }

}
