import { Component, OnInit } from '@angular/core';
declare var bootstrap: any;

@Component({
  selector: 'app-component-categoria-formulario',
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent  implements OnInit{

  isAdmin:boolean = true

  model = {
    nombre : '',
    activo : 0
  }

  limpiarModal(){
    this.model.activo = 0
    this.model.nombre = ''
  }

  ngOnInit(): void {
  }

  openModel(){
    this.limpiarModal()
    var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
    myModal.show();
  }

  guardarCategoria(){
    console.log('guardando categoria')
  }

}
