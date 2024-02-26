import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from '../../service/categoria.service'

@Component({
  selector: 'app-component-categoria-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent implements OnInit {

  @Output() editarCategoria: EventEmitter<number> = new EventEmitter<number>();

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

  constructor(private servicio: CategoriaService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerCategorias()

    if(localStorage.getItem('rol') == 'basico'){
      this.isAdmin = false
    }
  }

  async obtenerCategorias(){
    let token = localStorage.getItem('token')
    this.categorias = []
    if(token){
      this.categorias = await this.servicio.getAll(this.page, this.perPage, this.order, this.field, this.filtro_field, this.filtro_word, token).toPromise()
    }
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
    this.page = 1
    this.filtro_field = this.filtroelemento
    this.filtro_word = this.filtropalabra
    this.obtenerCategorias()
  }

  editar(id: number){
    this.editarCategoria.emit(id);
  }

  async eliminar(id: number){
    let token = localStorage.getItem('token')
    if(token){
      await this.servicio.delete(id, token).toPromise()
      .then((response) => {
        this.page = 1
        this.obtenerCategorias()
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
