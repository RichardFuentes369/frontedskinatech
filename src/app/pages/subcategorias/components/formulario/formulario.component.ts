import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  constructor(private servicio: SubcategoriaService) { }

  async ngOnInit() {
    if(localStorage.getItem('rol') == 'basico'){
      this.isAdmin = false
    }
    this.myModal = new bootstrap.Modal(document.getElementById('modalSubcategoria'));
  }

  async openModel(id: any){
    this.limpiarModal()
    if(id){
      this.dataEdit = await this.servicio.getSubcategory(id).toPromise()
      this.mostrarCrear = false
      this.model.id = this.dataEdit.response.id
      this.model.nombre = this.dataEdit.response.name
      this.model.estado = (this.dataEdit.response.status == 'activo') ? 1 : 2
      this.model.subcategoria = this.dataEdit.response.categoria_id
      this.myModal.show();
    }else{
      this.limpiarModal()
      this.myModal.show();
    }
  }

  closeModel(){
    this.myModal.hide();
  }

  guardarSubategoria(){
    this.servicio
    .create(this.model)
    .subscribe(() => {
      this.closeModel()
      this.subcategoriaGuardada.emit();
    });
  }

  editarSubcategoria(){
    this.servicio
    .update(this.model)
    .subscribe(() => {
      this.closeModel()
      this.subcategoriaGuardada.emit();
    });
  }
}
