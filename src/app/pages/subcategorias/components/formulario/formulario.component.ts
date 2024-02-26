import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SubcategoriaService } from '../../service/subcategoria.service';
declare var bootstrap: any;

@Component({
  selector: 'app-component-subcategorias-formulario',
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent  implements OnInit{

  @Output() subcategoriaGuardada: EventEmitter<void> = new EventEmitter<void>();

  myModal: any;
  dataEdit: any;
  isAdmin:boolean = true
  mostrarCrear = true

  @Input() categorias: any;

  model = {
    id : '',
    nombre : '',
    estado : 0,
    subcategoria: 0
  }

  limpiarModal(){
    this.model.id = ''
    this.model.estado = 0
    this.mostrarCrear=true
    this.model.nombre = ''
    this.model.subcategoria = 0
  }

  constructor(private servicio: SubcategoriaService, private router: Router) { }

  async ngOnInit() {
    if(localStorage.getItem('rol') == 'basico'){
      this.isAdmin = false
    }
    this.myModal = new bootstrap.Modal(document.getElementById('modalSubcategoria'));
  }

  async openModel(id: any){
    this.limpiarModal()
    if(id){
      let token = localStorage.getItem('token')
      if(token){
        this.dataEdit = await this.servicio.getSubcategory(id, token).toPromise()
        .then((response) => {
          this.mostrarCrear = false
          this.model.id = this.dataEdit.response.id
          this.model.nombre = this.dataEdit.response.name
          this.model.estado = (this.dataEdit.response.status == 'activo') ? 1 : 2
          this.model.subcategoria = this.dataEdit.response.categoria_id.toString()
          this.myModal.show();
        })
        .catch((error) => {
          if (error.status === 401) {
            this.closeModel()
            localStorage.removeItem('rol')
            localStorage.removeItem('token')
            this.router.navigate(['/login']);
          }
        });
      }else{
        this.closeModel()
        localStorage.removeItem('rol')
        localStorage.removeItem('token')
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

  async guardarSubategoria(){
    let token = localStorage.getItem('token')
    if(token){
      await this.servicio.create(this.model, token).toPromise()
      .then((response) => {
        this.closeModel()
        this.subcategoriaGuardada.emit();
      })
      .catch((error) => {
        if (error.status === 401) {
          this.closeModel()
          localStorage.removeItem('rol')
          localStorage.removeItem('token')
          this.router.navigate(['/login']);
        }
      });
    }else{
      this.closeModel()
      localStorage.removeItem('rol')
      localStorage.removeItem('token')
      this.router.navigate(['/login']);
    }
  }


  async editarSubcategoria(){

    let token = localStorage.getItem('token')
    if(token){
      await this.servicio.update(this.model, token).toPromise()
      .then((response) => {
        this.closeModel()
        this.subcategoriaGuardada.emit();
      })
      .catch((error) => {
        if (error.status === 401) {
          this.closeModel()
          localStorage.removeItem('rol')
          localStorage.removeItem('token')
          this.router.navigate(['/login']);
        }
      });
    }else{
      this.closeModel()
      localStorage.removeItem('rol')
      localStorage.removeItem('token')
      this.router.navigate(['/login']);
    }
  }
}
