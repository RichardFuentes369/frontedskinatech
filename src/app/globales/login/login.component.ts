import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-globales-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{


  user:any = [];

  username = 'admin1@gmail.com'
  password = 'Qwerty9601'


  constructor(private servicio: LoginService, private router: Router) { }

  async ngOnInit(){
    let token = localStorage.getItem('token')
    if(token){
      this.user = await this.servicio.userProfile(token).toPromise()
      if(this.user){
        this.router.navigate(['/categorias']);
      }else{
        this.router.navigate(['/login']);
      }
    }
  }

  async ingresar(){
    let model = {
      email: this.username,
      password: this.password,
    }

    this.user = []
    this.servicio
    .login(model)
    .subscribe((user: any) => {
      this.user = user
      localStorage.setItem('token', this.user.access_token)
      localStorage.setItem('rol', this.user.user.rol)
      window.location.href = window.location.origin+'/categorias'
    });
  }

}
