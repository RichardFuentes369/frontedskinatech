import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SubasociadospService } from '../../service/subasociadosp.service';
declare var bootstrap: any;

@Component({
  selector: 'app-component-subasociadosp-formulario',
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

  @Output() asignacionGuardada: EventEmitter<void> = new EventEmitter<void>();

  myModal: any;
  dataEdit: any;
  isAdmin:boolean = true
  mostrarCrear = true

  @Input() categorias: any;
  @Input() subcategoria: any;
  @Input() productos: any;

  model = {
    categoria: null,
    subcategoria: null,
    productos: null
  }

  limpiarModal(){
    this.mostrarCrear = true
    this.model.categoria = null
    this.model.subcategoria = null
    this.model.productos = null
  }

  constructor(private servicio: SubasociadospService, private router: Router) { }

  async ngOnInit() {
    if(localStorage.getItem('rol') == 'basico'){
      this.isAdmin = false
    }
    this.myModal = new bootstrap.Modal(document.getElementById('modalSubcategoria'));
  }

  async openModel(id: any){
    this.limpiarModal()
    this.limpiarModal()
    this.myModal.show();
  }

  closeModel(){
    this.myModal.hide();
  }

  async guardarSubCategoriaAsociado(){
    let token = localStorage.getItem('token')
    if(token){
      await this.servicio.create(this.model, token).toPromise()
      .then((response) => {
        this.closeModel()
        this.asignacionGuardada.emit();
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
