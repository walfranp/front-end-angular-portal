import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  servidor = null;
  token = null;

  constructor(private utilService: UtilService, private httpClient: HttpClient) {

    this.servidor = utilService.getServidor();
    this.token = utilService.getToken();

  }


  recuperarSenha(email_informado) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    //  'Authorization': 'Bearer ' + 'abcdefghijklmnopqrstuvwxyz',
      'Accept': 'application/json'
    });

    let payload = {
      email: email_informado,
    }

    return this.httpClient.post(this.servidor + '/recupera/senha', payload, { headers: headers });

  }

  validarToken(token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    //  'Authorization': 'Bearer ' + 'abcdefghijklmnopqrstuvwxyz',
      'Accept': 'application/json'
    });

    let payload = {
      token: token,
    }

    return this.httpClient.post(this.servidor + '/validar/token', payload, { headers: headers });

  }

  alterarSenhaPorToken(token, senha) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    //  'Authorization': 'Bearer ' + 'abcdefghijklmnopqrstuvwxyz',
      'Accept': 'application/json'
    });

    let payload = {
      token: token,
      senha: senha
    }

    return this.httpClient.post(this.servidor + '/alterar/senha/token', payload, { headers: headers });

  }

  alterarSenha(senha_atual, nova_senha) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token,
      'Accept': 'application/json'
    });

    let payload = {
      old_password: senha_atual,
      new_password: nova_senha
    }

    return this.httpClient.post(this.servidor + '/user/changePassword', payload, { headers: headers });

  }








}
