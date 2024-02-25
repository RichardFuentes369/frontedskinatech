import { Injectable } from '@angular/core';

import { environments } from '../../../../enviroments/enviroments';
import { HttpClient, HttpHeaders  } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) {}

  getAll(page:number, perPage:number, order:string, field:string, filtro_field: string, filtro_word: string, token:string){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    const options = { headers: headers };
    return this.http.get(`${this.baseUrl}/api/subcategoria/listar-subcategoria?page=${page}&perPage=${perPage}&order=${order}&field=${field}&filtro_field=${filtro_field}&filtro_word=${filtro_word}`, options);
  }

  getCategoriaAll(){
    return this.http.get(`${this.baseUrl}/api/categoria/getAll`);
  }

  getSubcategory(id: number, token: string){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    const options = { headers: headers };
    return this.http.get(`${this.baseUrl}/api/subcategoria/obtener-subcategoria/${id}`, options);
  }

  delete(id: any, token: string){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    const options = { headers: headers };
    return this.http.delete(`${this.baseUrl}/api/subcategoria/eliminar-subcategoria/${id}`, options);
  }

  create(data: any, token: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    const options = { headers: headers };
    return this.http.post(`${this.baseUrl}/api/subcategoria/agregar-subcategoria`, data, options);
  }

  update(data: any, token: string) {
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
    return this.http.put(`${this.baseUrl}/api/subcategoria/editar-subcategoria/${data.id}`, data, options);
  }

  userProfile(token: string){

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    const options = { headers: headers };

    return this.http.get(`${this.baseUrl}/api/auth/user-profile`, options);
  }

}
