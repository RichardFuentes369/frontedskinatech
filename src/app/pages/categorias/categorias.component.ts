import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ListaComponent as ListaComponentCategorias } from './components/lista/lista.component';
import { FormularioComponent as FormularioComponentCategorias } from './components/formulario/formulario.component';
import { CategoriaService } from './service/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent implements OnInit {

  user:any = [];

  constructor(private servicio: CategoriaService, private router: Router) { }

  async ngOnInit() {
    let token = localStorage.getItem('token')
    if(token){
      this.user = await this.servicio.userProfile(token).toPromise()
      .then(data => {
        this.router.navigate(['/categorias']);
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

  @ViewChild(ListaComponentCategorias) child:any;
  categoriaGuardada() {
    this.child.obtenerCategorias();
  }

  @ViewChild(FormularioComponentCategorias) child2:any;
  async editarModal(id:number) {
    await this.child2.openModel(id)
  }
}
