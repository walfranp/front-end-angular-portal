import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  servidor = "http://127.0.0.1:8000/api";

  constructor() { }



  getServidor() {
    return this.servidor;
  }

  setaNome(nome) {
    sessionStorage.setItem("nome_associado", nome);
  }

  getNome() {
    return sessionStorage.getItem("nome_associado");
  }

  setaToken(tkn) {
    sessionStorage.setItem("tkn_associado", tkn);
  }

  getToken() {
    return sessionStorage.getItem("tkn_associado");
  }

  setaStatusUser(status) {
    sessionStorage.setItem("usr_logado", status);
  }

  getStatusUser() {
    if (sessionStorage.getItem("usr_logado") == "true") {
      return true;
    } else {
      return false;
    }

  }

}
