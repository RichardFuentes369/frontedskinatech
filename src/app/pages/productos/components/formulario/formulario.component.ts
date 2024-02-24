import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductosService } from '../../service/productos.service';
declare var bootstrap: any;


@Component({
  selector: 'app-component-productos-formulario',
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

  @Output() productoGuardado: EventEmitter<void> = new EventEmitter<void>();

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

  constructor(private servicio: ProductosService) { }

  ngOnInit(): void {
    this.myModal = new bootstrap.Modal(document.getElementById('modalProducto'));
  }

  openModel(){
    this.limpiarModal()
    this.myModal.show();
  }

  closeModel(){
    this.myModal.hide();
  }

  guardarProducto(){
    this.servicio
    .create(this.model)
    .subscribe(() => {
      this.closeModel()
      this.productoGuardado.emit();
    });
  }
}
