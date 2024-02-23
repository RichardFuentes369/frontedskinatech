import { Component } from '@angular/core';
declare var bootstrap: any;

@Component({
  selector: 'app-component-subcategorias-formulario',
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  ngOnInit(): void {
  }

  openModel(){
    var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
    myModal.show();
  }
}
