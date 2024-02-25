import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SubcategoriaService } from '../../service/subcategoria.service'
@Component({
  selector: 'app-component-subcategorias-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent implements OnInit {

  @Output() editarSubcategoria: EventEmitter<number> = new EventEmitter<number>();

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

  constructor(private servicio: SubcategoriaService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerSubcategoria()
    if(localStorage.getItem('rol') == 'basico'){
      this.isAdmin = false
    }
  }

  async obtenerSubcategoria(){
    let token = localStorage.getItem('token')
    this.subcategorias = []
    if(token){
      this.subcategorias = await this.servicio.getAll(this.page, this.perPage, this.order, this.field, this.filtro_field, this.filtro_word, token).toPromise()
    }
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


  editar(id: number){
    this.editarSubcategoria.emit(id);
  }

  async eliminar(id: number){
    let token = localStorage.getItem('token')
    if(token){
      await this.servicio.delete(id, token).toPromise()
      this.page = 1
      this.obtenerSubcategoria()
    }else{

      this.router.navigate(['/login']);
    }
  }

}
