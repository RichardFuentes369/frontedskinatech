import { Component, OnInit, ViewChild } from '@angular/core';
import { ListaComponent as ListaComponentProducto } from './components/lista/lista.component';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

  ngOnInit(): void {
  }

  @ViewChild(ListaComponentProducto) child:any;
  productoGuardado() {
    this.child.obtenerProductos();
  }
}
