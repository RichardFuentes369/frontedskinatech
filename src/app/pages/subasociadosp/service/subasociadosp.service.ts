import { Injectable } from '@angular/core';

import { environments } from '../../../../enviroments/enviroments';
import { HttpClient, HttpHeaders  } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SubasociadospService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) {}

  getAll(page:number, perPage:number, order:string, field:string, filtro_field: string, filtro_word: string, token:string){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    const options = { headers: headers };
    return this.http.get(`${this.baseUrl}/api/subcategorias-productos/listar-subcategorias-productos?page=${page}&perPage=${perPage}&order=${order}&field=${field}&filtro_field=${filtro_field}&filtro_word=${filtro_word}`, options);
  }

  getCategoriaAll(){
    return this.http.get(`${this.baseUrl}/api/categoria/getAll`);
  }

  getSubCategoriaAll(){
    return this.http.get(`${this.baseUrl}/api/subcategoria/getAll`);
  }

  getProductosAll(){
    return this.http.get(`${this.baseUrl}/api/producto/getAll`);
  }

  delete(id: any, token: string){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    const options = { headers: headers };
    return this.http.delete(`${this.baseUrl}/api/subcategorias-productos/eliminar-subcategorias-productos/${id}`, options);
  }

  userProfile(token: string){

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    const options = { headers: headers };

    return this.http.get(`${this.baseUrl}/api/auth/user-profile`, options);
  }
}
