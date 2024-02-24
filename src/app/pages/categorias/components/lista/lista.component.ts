import { Component, Input, OnInit } from '@angular/core';

import { CategoriaService } from '../../service/categoria.service'

@Component({
  selector: 'app-component-categoria-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent implements OnInit {

  isAdmin:boolean = true;
  categorias:any = [];

  page = 1
  perPage = 5
  order = 'asc'
  field = 'id'
  filtro_field = ''
  filtro_word = ''

  filtroelemento = ''
  filtropalabra = ''

  constructor(private servicio: CategoriaService) { }

  ngOnInit(): void {
    this.obtenerCategorias()
  }

  async obtenerCategorias(){
    this.categorias = []
    this.servicio
    .getAll(this.page, this.perPage, this.order, this.field, this.filtro_field, this.filtro_word)
    .subscribe((categoria: any) => {
      this.categorias = categoria
    });
  }

  async aumentar(){
    this.page = this.page + 1
    await this.obtenerCategorias()
  }

  async disminuir(){
    this.page = this.page - 1
    await this.obtenerCategorias()
  }

  async cambiarPaginacion(){
    this.page = 1
    await this.obtenerCategorias()
  }

  async cambiarSort(){
    await this.obtenerCategorias()
  }

  async filtro(){
    this.filtro_field = this.filtroelemento
    this.filtro_word = this.filtropalabra
    this.obtenerCategorias()
  }

  async eliminar(id: number){
    this.servicio
    .delete(id)
    .subscribe(() => {
      this.page = 1
      this.obtenerCategorias()
    });
  }

}
