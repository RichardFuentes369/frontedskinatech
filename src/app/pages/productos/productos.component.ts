import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ListaComponent as ListaComponentProducto } from './components/lista/lista.component';
import { FormularioComponent as FormularioComponentProducto } from './components/formulario/formulario.component';
import { ProductosService } from './service/productos.service';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

  user:any = [];

  constructor(private servicio: ProductosService, private router: Router) { }

  async ngOnInit() {
    let token = localStorage.getItem('token')
    if(token){
      this.user = await this.servicio.userProfile(token).toPromise()
      .then(data => {
        this.router.navigate(['/productos']);
      })
      .catch(error => {
        localStorage.removeItem('rol')
        localStorage.removeItem('token')
        this.router.navigate(['/login']);
      });
    }else{
      this.router.navigate(['/login']);
    }
  }

  @ViewChild(ListaComponentProducto) child:any;
  productoGuardado() {
    this.child.obtenerProductos();
  }

  @ViewChild(FormularioComponentProducto) child2:any;
  async editarModal(id:number) {
    await this.child2.openModel(id)
  }
}
