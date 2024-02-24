import { Component } from '@angular/core';

import { ProductosService } from '../../service/productos.service'

@Component({
  selector: 'app-component-productos-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {

  isAdmin:boolean = true;
  productos:any = [];

  page = 1
  perPage = 5
  order = 'asc'
  field = 'id'
  filtro_field = ''
  filtro_word = ''

  filtroelemento = ''
  filtropalabra = ''

  constructor(private servicio: ProductosService) { }

  ngOnInit(): void {
    this.obtenerProductos()
  }


  async obtenerProductos(){
    this.productos = []
    this.servicio
    .getAll(this.page, this.perPage, this.order, this.field, this.filtro_field, this.filtro_word)
    .subscribe((producto: any) => {
      this.productos = producto
    });
  }

  async aumentar(){
    this.page = this.page + 1
    await this.obtenerProductos()
  }

  async disminuir(){
    this.page = this.page - 1
    await this.obtenerProductos()
  }

  async cambiarPaginacion(){
    this.page = 1
    await this.obtenerProductos()
  }

  async cambiarSort(){
    await this.obtenerProductos()
  }

  async filtro(){
    this.page = 1
    this.filtro_field = this.filtroelemento
    this.filtro_word = this.filtropalabra
    this.obtenerProductos()
  }

  async eliminar(id: number){
    this.servicio
    .delete(id)
    .subscribe(() => {
      this.page = 1
      this.obtenerProductos()
    });
  }

}

