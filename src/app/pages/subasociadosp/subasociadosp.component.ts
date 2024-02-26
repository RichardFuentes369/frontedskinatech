import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { Router } from '@angular/router';
import { ListaComponent as ListaComponentSubAsociadosP } from './components/lista/lista.component';
import { FormularioComponent as FormularioComponentSubAsociadosP } from './components/formulario/formulario.component';
import { SubasociadospService } from './service/subasociadosp.service';

@Component({
  selector: 'app-subasociadosp',
  templateUrl: './subasociadosp.component.html',
  styleUrl: './subasociadosp.component.css'
})
export class SubasociadospComponent {

  user:any = [];
  categoria: any;
  subcategoria: any;
  productos: any;

  constructor(private servicio: SubasociadospService, private router: Router) {}

  async ngOnInit() {
    let token = localStorage.getItem('token')
    if(token){
      this.user = await this.servicio.userProfile(token).toPromise()
      this.categoria = await this.servicio.getCategoriaAll().toPromise()
      this.subcategoria = await this.servicio.getSubCategoriaAll().toPromise()
      this.productos = await this.servicio.getProductosAll().toPromise()
      if(this.user){
        this.router.navigate(['/asociar']);
      }else{
        localStorage.removeItem('rol')
        localStorage.removeItem('token')
        this.router.navigate(['/login']);
      }
    }else{
      this.router.navigate(['/login']);
    }
  }

  @ViewChild(ListaComponentSubAsociadosP) child:any;
  asignacionGuardada() {
    this.child.obtenerSubAsociados();
  }

}
