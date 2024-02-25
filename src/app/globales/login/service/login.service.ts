import { Injectable } from '@angular/core';

import { environments } from '../../../../enviroments/enviroments';
import { HttpClient, HttpHeaders  } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) {}

  login(model: any){
    return this.http.post(`${this.baseUrl}/api/auth/login`, model);
  }

  userProfile(token: string){

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    const options = { headers: headers };

    return this.http.get(`${this.baseUrl}/api/auth/user-profile`, options);
  }

}
