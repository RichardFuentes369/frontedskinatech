import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SubasociadospService } from '../../service/subasociadosp.service'
@Component({
  selector: 'app-component-subasociadosp-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {

  @Output() editarSubAsociado: EventEmitter<number> = new EventEmitter<number>();

  isAdmin:boolean = true;
  subAsociados:any = [];

  page = 1
  perPage = 5
  order = 'asc'
  field = 'id'
  filtro_field = ''
  filtro_word = ''

  filtroelemento = ''
  filtropalabra = ''

  constructor(private servicio: SubasociadospService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerSubAsociados()
    if(localStorage.getItem('rol') == 'basico'){
      this.isAdmin = false
    }
  }

  async obtenerSubAsociados(){
    let token = localStorage.getItem('token')
    this.subAsociados = []
    if(token){
      this.subAsociados = await this.servicio.getAll(this.page, this.perPage, this.order, this.field, this.filtro_field, this.filtro_word, token).toPromise()
    }
  }

  async aumentar(){
    this.page = this.page + 1
    await this.obtenerSubAsociados()
  }

  async disminuir(){
    this.page = this.page - 1
    await this.obtenerSubAsociados()
  }

  async cambiarPaginacion(){
    this.page = 1
    await this.obtenerSubAsociados()
  }

  async cambiarSort(){
    await this.obtenerSubAsociados()
  }

  async filtro(){
    this.page = 1
    this.filtro_field = this.filtroelemento
    this.filtro_word = this.filtropalabra
    this.obtenerSubAsociados()
  }

  async eliminar(id: number){
    let token = localStorage.getItem('token')
    if(token){
      await this.servicio.delete(id, token).toPromise()
      .then((response) => {
        this.page = 1
        this.obtenerSubAsociados()
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
