import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  isAdmin:boolean = true

  model = {
    nombre : '',
    estado : 0
  }

  limpiarModal(){
    this.model.estado = 0
    this.model.nombre = ''
  }

  constructor(private servicio: CategoriaService) { }

  ngOnInit(): void {
    this.myModal = new bootstrap.Modal(document.getElementById('modalCategoria'));
  }

  openModel(){
    this.limpiarModal()
    this.myModal.show();
  }

  closeModel(){
    this.myModal.hide();
  }

  guardarCategoria(){
    this.servicio
    .create(this.model)
    .subscribe(() => {
      this.closeModel()
      this.categoriaGuardada.emit();
    });
  }

}
