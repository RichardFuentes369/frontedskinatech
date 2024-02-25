import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from './service/navbar.service';
@Component({
  selector: 'app-globales-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  ruta:string = ''
  user:any = []


  constructor(private servicio: NavbarService, private router: Router) { }

  async ngOnInit() {
    await this.loginInicial()
  }

  xxx = 'collapse'

  openToogle(){
    this.xxx ===  (this.xxx = '') ? this.xxx = 'collapse' : this.xxx = ''
  }

  async loginInicial(){
    this.user = []
    let token: any = localStorage.getItem('token')
    if(token){
      this.user = await this.servicio.userProfile(token).toPromise()
    }

    if(this.user){
      this.ruta = 'categorias'
    }else{
      let ruta = window.location.pathname
      let partesRuta = ruta.split('/');
      this.ruta = partesRuta[1]
    }
  }

  salir(){
    this.user = []
    localStorage.removeItem('token')
    localStorage.removeItem('rol')
    this.router.navigate(['/login']);
  }


}

