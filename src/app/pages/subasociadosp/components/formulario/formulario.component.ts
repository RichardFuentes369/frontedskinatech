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

  myModal: any;
  dataEdit: any;
  isAdmin:boolean = true
  mostrarCrear = true

  @Input() categorias: any;
  @Input() subcategoria: any;
  @Input() productos: any;

  model = {
    id : '',
    categoria: '',
    subcategoria: '',
    productos: ''
  }

  limpiarModal(){
    this.model.id = ''
    this.mostrarCrear=true
    this.model.categoria = ''
    this.model.subcategoria = ''
    this.model.productos = ''
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
    if(id){
      let token = localStorage.getItem('token')
      if(token){
        this.myModal.show();
        // await this.servicio.getSubcategory(id, token).toPromise()
        // .then((response) => {
        //   this.dataEdit = response
        //   this.mostrarCrear = false
        //   this.model.id = this.dataEdit.response.id
        //   this.model.nombre = this.dataEdit.response.name
        //   this.model.estado = (this.dataEdit.response.status == 'activo') ? 1 : 2
        //   this.model.subcategoria = this.dataEdit.response.categoria_id.toString()
        //   this.myModal.show();
        // })
        // .catch((error) => {
        //   if (error.status === 401) {
        //     localStorage.removeItem('rol')
        //     localStorage.removeItem('token')
        //     this.closeModel()
        //     this.router.navigate(['/login']);
        //   }
        // });
      }else{
        localStorage.removeItem('rol')
        localStorage.removeItem('token')
        this.closeModel()
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

  async guardarSubCategoriaAsociado(){
    let token = localStorage.getItem('token')
    if(token){
    //   await this.servicio.create(this.model, token).toPromise()
    //   .then((response) => {
    //     this.closeModel()
    //     this.subcategoriaGuardada.emit();
    //   })
    //   .catch((error) => {
    //     if (error.status === 401) {
    //       this.closeModel()
    //       localStorage.removeItem('rol')
    //       localStorage.removeItem('token')
    //       this.router.navigate(['/login']);
    //     }
    //   });
    // }else{
    //   this.closeModel()
    //   localStorage.removeItem('rol')
    //   localStorage.removeItem('token')
    //   this.router.navigate(['/login']);
    }
  }
}
