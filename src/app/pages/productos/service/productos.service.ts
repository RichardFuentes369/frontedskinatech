import { Injectable } from '@angular/core';

import { environments } from '../../../../enviroments/enviroments';
import { HttpClient, HttpHeaders  } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) {}

  getAll(page:number, perPage:number, order:string, field:string, filtro_field: string, filtro_word: string, token: string){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    const options = { headers: headers };
    return this.http.get(`${this.baseUrl}/api/producto/listar-producto?page=${page}&perPage=${perPage}&order=${order}&field=${field}&filtro_field=${filtro_field}&filtro_word=${filtro_word}`, options);
  }

  getProducto(id: number, token: string){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    const options = { headers: headers };
    return this.http.get(`${this.baseUrl}/api/producto/obtener-producto/${id}`, options);
  }

  delete(id: any, token: string){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    const options = { headers: headers };
    return this.http.delete(`${this.baseUrl}/api/producto/eliminar-producto/${id}`, options);
  }

  create(data: any, token:string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    const options = { headers: headers };

    return this.http.post(`${this.baseUrl}/api/producto/agregar-producto`, data, options);
  }

  update(data: any, token:string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    const options = { headers: headers };

    if(data.estado == 1 || data.estado == '1'){
      data.estado = 'activo'
    }
    if(data.estado == 2 || data.estado == '2'){
      data.estado = 'inactivo'
    }

    return this.http.put(`${this.baseUrl}/api/producto/editar-producto/${data.id}`, data, options);
  }

  userProfile(token: string){

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    const options = { headers: headers };

    return this.http.get(`${this.baseUrl}/api/auth/user-profile`, options);
  }


}
