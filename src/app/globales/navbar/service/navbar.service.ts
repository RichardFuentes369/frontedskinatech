import { Injectable } from '@angular/core';

import { environments } from '../../../../enviroments/enviroments';
import { HttpClient, HttpHeaders  } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) {}

  userProfile(token: string){

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    const options = { headers: headers };

    return this.http.get(`${this.baseUrl}/api/auth/user-profile`, options);
  }

  refresh(token: string){
    return this.http.get(`${this.baseUrl}/api/auth/refresh`);
  }
}
