import { Injectable } from '@angular/core';

import { environments } from '../../../../enviroments/enviroments';
import { HttpClient, HttpHeaders  } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) {}

  getAll(page:number, perPage:number, order:string, field:string, filtro_field: string, filtro_word: string, token: string){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    const options = { headers: headers };
    return this.http.get(`${this.baseUrl}/api/categoria/listar-categoria?page=${page}&perPage=${perPage}&order=${order}&field=${field}&filtro_field=${filtro_field}&filtro_word=${filtro_word}`, options);
  }

  getCategory(id: number, token: string){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    const options = { headers: headers };
    return this.http.get(`${this.baseUrl}/api/categoria/obtener-categoria/${id}`, options);
  }

  delete(id: any, token: string){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    const options = { headers: headers };
    return this.http.delete(`${this.baseUrl}/api/categoria/eliminar-categoria/${id}`, options);
  }

  create(data: any, token:string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    const options = { headers: headers };

    return this.http.post(`${this.baseUrl}/api/categoria/agregar-categoria`, data, options);
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

    return this.http.put(`${this.baseUrl}/api/categoria/editar-categoria/${data.id}`, data, options);
  }

  userProfile(token: string){

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    const options = { headers: headers };

    return this.http.get(`${this.baseUrl}/api/auth/user-profile`, options);
  }

}
