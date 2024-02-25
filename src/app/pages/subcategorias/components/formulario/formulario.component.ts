import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  constructor(private servicio: SubcategoriaService) { }

  ngOnInit(): void {
    this.myModal = new bootstrap.Modal(document.getElementById('modalSubcategoria'));
  }

  async openModel(id: any){
    this.limpiarModal()
    if(id){
      await this.servicio.getSubcategory(id).subscribe((data) => {
        setTimeout(() => {
          this.dataEdit = data;
          this.mostrarCrear=false
          this.model.id = this.dataEdit.response.id
          this.model.nombre = this.dataEdit.response.name
          this.model.estado = (this.dataEdit.response.status == 'activo') ? 1 : 2
          this.myModal.show();
        }, 100);
      });
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
