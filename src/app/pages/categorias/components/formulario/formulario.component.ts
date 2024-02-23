import { Component, OnInit } from '@angular/core';
declare var bootstrap: any;

@Component({
  selector: 'app-component-categoria-formulario',
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent  implements OnInit{

  isAdmin:boolean = true

  ngOnInit(): void {
  }

  openModel(){
    var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
    myModal.show();
  }

}
