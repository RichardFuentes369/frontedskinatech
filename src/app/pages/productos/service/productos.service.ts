import { Injectable } from '@angular/core';

import { environments } from '../../../../enviroments/enviroments';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) {}

  getAll(page:number, perPage:number, order:string, field:string, filtro_field: string, filtro_word: string){
    return this.http.get(`${this.baseUrl}/api/producto/listar-producto?page=${page}&perPage=${perPage}&order=${order}&field=${field}&filtro_field=${filtro_field}&filtro_word=${filtro_word}`);
  }

  delete(id: any){
    return this.http.delete(`${this.baseUrl}/api/producto/eliminar-producto/${id}`);
  }

  create(data: any) {
    return this.http.post(`${this.baseUrl}/api/producto/agregar-producto`, data);
  }

  // update(id: any, data: any): Observable<any> {
  //   return this.http.put(`${baseUrl}/${id}`, data);
  // }

  // delete(id: any): Observable<any> {
  //   return this.http.delete(`${baseUrl}/${id}`);
  // }

}
