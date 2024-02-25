import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from '../../service/categoria.service';
declare var bootstrap: any;

@Component({
  selector: 'app-component-categoria-formulario',
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent  implements OnInit{

  @Output() categoriaGuardada: EventEmitter<void> = new EventEmitter<void>();

  myModal: any;
  dataEdit: any;
  isAdmin:boolean = true
  mostrarCrear = true

  model = {
    id : '',
    nombre : '',
    estado : 0
  }

  limpiarModal(){
    this.model.id = ''
    this.model.estado = 0
    this.mostrarCrear=true
    this.model.nombre = ''
  }

  constructor(private servicio: CategoriaService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('rol') == 'basico'){
      this.isAdmin = false
    }
    this.myModal = new bootstrap.Modal(document.getElementById('modalCategoria'));
  }

  async openModel(id: any){
    this.limpiarModal()
    if(id){
      let token = localStorage.getItem('token')
      if(token){
        this.dataEdit = await this.servicio.getCategory(id, token).toPromise()
        this.mostrarCrear=false
        this.model.id = this.dataEdit.response.id
        this.model.nombre = this.dataEdit.response.name
        this.model.estado = (this.dataEdit.response.status == 'activo') ? 1 : 2
        this.myModal.show();
      }else{
        this.closeModel()
        this.router.navigate(['/login']);
      }
    }else{
      this.limpiarModal()
      this.myModal.show();
    }
  }

  closeModel(){
    this.myModal.hide();
  }

  async guardarCategoria(){
    let token = localStorage.getItem('token')
    if(token){
      await this.servicio.create(this.model, token).toPromise()
      this.closeModel()
      this.categoriaGuardada.emit();
    }else{
      this.closeModel()
      this.router.navigate(['/login']);
    }
  }

  async editarCategoria(){
    let token = localStorage.getItem('token')
    if(token){
      await this.servicio.update(this.model, token).toPromise()
      this.closeModel()
      this.categoriaGuardada.emit();
    }else{
      this.closeModel()
      this.router.navigate(['/login']);
    }
  }
}
