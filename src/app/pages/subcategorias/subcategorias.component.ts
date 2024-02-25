import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { Router } from '@angular/router';
import { ListaComponent as ListaComponentSubcategorias } from './components/lista/lista.component';
import { FormularioComponent as FormularioComponentSubcategorias } from './components/formulario/formulario.component';
import { SubcategoriaService } from './service/subcategoria.service';

@Component({
  selector: 'app-subcategorias',
  templateUrl: './subcategorias.component.html',
  styleUrl: './subcategorias.component.css'
})
export class SubcategoriasComponent implements OnInit   {

  user:any = [];
  categoria: any;

  constructor(private servicio: SubcategoriaService, private router: Router) {}

  async ngOnInit() {
    let token = localStorage.getItem('token')
    if(token){
      this.user = await this.servicio.userProfile(token).toPromise()
      if(this.user){
        this.router.navigate(['/subcategorias']);
        this.categoria = await this.servicio.getCategoriaAll().toPromise()
      }else{
        localStorage.removeItem('rol')
        localStorage.removeItem('token')
        this.router.navigate(['/login']);
      }
    }else{
      this.router.navigate(['/login']);
    }
  }

  @ViewChild(ListaComponentSubcategorias) child:any;
  subcategoriaGuardada() {
    this.child.obtenerSubcategoria();
  }

  @ViewChild(FormularioComponentSubcategorias) child2:any;
  async editarModal(id:number) {
    await this.child2.openModel(id)
  }

}
