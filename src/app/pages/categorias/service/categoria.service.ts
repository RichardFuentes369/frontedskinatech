import { Injectable } from '@angular/core';

import { environments } from '../../../../enviroments/enviroments';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) {}

  getAll(page:number, perPage:number, order:string, field:string, filtro_field: string, filtro_word: string){
    return this.http.get(`${this.baseUrl}/api/categoria/listar-categoria?page=${page}&perPage=${perPage}&order=${order}&field=${field}&filtro_field=${filtro_field}&filtro_word=${filtro_word}`);
  }

  getCategory(id: number){
    return this.http.get(`${this.baseUrl}/api/categoria/obtener-categoria/${id}`);
  }

  delete(id: any){
    return this.http.delete(`${this.baseUrl}/api/categoria/eliminar-categoria/${id}`);
  }

  create(data: any) {
    return this.http.post(`${this.baseUrl}/api/categoria/agregar-categoria`, data);
  }

  update(data: any) {
    if(data.status == 1){
      data.estado = 'activo'
    }
    if(data.status == 2){
      data.estado = 'inactivo'
    }
    return this.http.put(`${this.baseUrl}/api/categoria/editar-categoria/${data.id}`, data);
  }

}
