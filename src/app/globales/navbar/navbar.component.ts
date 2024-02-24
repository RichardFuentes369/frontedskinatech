import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-globales-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  ruta:string = ''

  ngOnInit(): void {
    let ruta = window.location.pathname
    let partesRuta = ruta.split('/');
    this.ruta = partesRuta[1]
  }

  xxx = 'collapse'

  openToogle(){
    this.xxx ===  (this.xxx = '') ? this.xxx = 'collapse' : this.xxx = ''
  }


}
