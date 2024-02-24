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
  isAdmin:boolean = true

  model = {
    nombre : '',
    estado : 0
  }

  limpiarModal(){
    this.model.estado = 0
    this.model.nombre = ''
  }

  constructor(private servicio: SubcategoriaService) { }

  ngOnInit(): void {
    this.myModal = new bootstrap.Modal(document.getElementById('modalSubcategoria'));
  }

  openModel(){
    this.limpiarModal()
    this.myModal.show();
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
}
