import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from '../../service/productos.service'

@Component({
  selector: 'app-component-productos-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {

  @Output() editarProducto: EventEmitter<number> = new EventEmitter<number>();

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

  constructor(private servicio: ProductosService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerProductos()

    if(localStorage.getItem('rol') == 'basico'){
      this.isAdmin = false
    }
  }


  async obtenerProductos(){
    let token = localStorage.getItem('token')
    this.productos = []
    if(token){
      this.productos = await this.servicio.getAll(this.page, this.perPage, this.order, this.field, this.filtro_field, this.filtro_word, token).toPromise()
    }
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

  editar(id: number){
    this.editarProducto.emit(id);
  }

  async eliminar(id: number){
    let token = localStorage.getItem('token')
    if(token){
      await this.servicio.delete(id, token).toPromise()
      .then((response) => {
        this.page = 1
        this.obtenerProductos()
      })
      .catch((error) => {
        if (error.status === 401) {
          localStorage.removeItem('rol')
          localStorage.removeItem('token')
          this.router.navigate(['/login']);
        }
      });
    }else{
      localStorage.removeItem('rol')
      localStorage.removeItem('token')
      this.router.navigate(['/login']);
    }
  }


}

