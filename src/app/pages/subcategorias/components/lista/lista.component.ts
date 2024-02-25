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
    let token = localStorage.getItem('token')
    if(token){
      this.obtenerSubcategoria()
    }else{
      this.router.navigate(['/login']);
    }
  }

  async obtenerSubcategoria(){
    this.subcategorias = []
    this.subcategorias = await this.servicio.getAll(this.page, this.perPage, this.order, this.field, this.filtro_field, this.filtro_word).toPromise()
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
    this.servicio
    .delete(id)
    .subscribe(() => {
      this.page = 1
      this.obtenerSubcategoria()
    });
  }

}
