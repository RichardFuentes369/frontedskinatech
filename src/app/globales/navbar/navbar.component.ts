import { Component } from '@angular/core';

@Component({
  selector: 'app-globales-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  xxx = 'collapse'

  openToogle(){
    this.xxx ===  (this.xxx = '') ? this.xxx = 'collapse' : this.xxx = ''
  }

}
