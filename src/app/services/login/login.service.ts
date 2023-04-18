import { Injectable } from '@angular/core';
import { UtilService } from '../util/util.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  servidor = null;

  constructor(private utilService: UtilService, private httpClient: HttpClient) {

    this.servidor = utilService.getServidor();

  }


  fazerLogin(login, senha){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + 'abcdefghijklmnopqrstuvwxyz',
      'Accept': 'application/json'
    });

    let payload= {
      email: login,
      password: senha
    }

    return this.httpClient.post(this.servidor+'/login', payload, { headers: headers });

  }

  fazerLogoff(){
    this.utilService.setaNome("");
    this.utilService.setaToken("");
    this.utilService.setaStatusUser("false");
  }




}
