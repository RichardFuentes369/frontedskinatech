import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private servicio: ProductosService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('rol') == 'basico'){
      this.isAdmin = false
    }
    this.myModal = new bootstrap.Modal(document.getElementById('modalProducto'));
  }

  async openModel(id: any){
    this.limpiarModal()
    if(id){
      let token = localStorage.getItem('token')
      if(token){
        this.dataEdit = await this.servicio.getProducto(id, token).toPromise()
        .then((response) => {
          this.dataEdit = response
          this.mostrarCrear=false
          this.model.id = this.dataEdit.response.id
          this.model.nombre = this.dataEdit.response.name
          this.model.estado = (this.dataEdit.response.status == 'activo') ? 1 : 2
          this.myModal.show();
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
    }else{
      this.limpiarModal()
      this.myModal.show();
    }
  }

  closeModel(){
    this.myModal.hide();
  }

  async guardarProducto(){
    let token = localStorage.getItem('token')
    if(token){
      await this.servicio.create(this.model, token).toPromise()
      .then((response) => {
        this.closeModel()
        this.productoGuardado.emit();
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

  async editarProducto(){
    let token = localStorage.getItem('token')
    if(token){
      await this.servicio.update(this.model, token).toPromise()
      .then((response) => {
        this.closeModel()
        this.productoGuardado.emit();
      })
      .catch((error) => {
        if (error.status === 401) {
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
