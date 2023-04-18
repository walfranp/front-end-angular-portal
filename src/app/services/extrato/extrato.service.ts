import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class ExtratoService {

  servidor = null;
  token = null;

  constructor(private utilService: UtilService, private httpClient: HttpClient) {

    this.servidor = utilService.getServidor();
    this.token = utilService.getToken();
  }


  buscarValores(mes, ano) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token,
      'Accept': 'application/json'
    });

    let payload = {
      mes_ref: mes,
      ano_ref: ano,
    }

    return this.httpClient.post(this.servidor + '/gastos/user/get', payload, { headers: headers });

  }

  buscarValoresMeses(ano) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token,
      'Accept': 'application/json'
    });

    let payload = {
      ano_ref: ano
    }

    return this.httpClient.post(this.servidor + '/gastos/user/gastosMensais', payload, { headers: headers });

  }

  buscarConveniosTop5(ano) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token,
      'Accept': 'application/json'
    });

    let payload = {
      ano_ref: ano
    }

    return this.httpClient.post(this.servidor + '/gastos/user/top5Convenios', payload, { headers: headers });

  }

  buscarConvenios() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token,
      'Accept': 'application/json'
    });

    // let payload = {
    //   ano_ref: ano
    // }

    return this.httpClient.get(this.servidor + '/convenio/get', { headers: headers });

  }

  buscaGastosSaude(ano) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token,
      'Accept': 'application/json'
    });

    let payload = {
      ano_ref: ano,
    }

    return this.httpClient.post(this.servidor + '/gastosSaude/user/get', payload, { headers: headers });

  }


  buscaUltimosGastos(mes, ano) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token,
      'Accept': 'application/json'
    });

    let payload = {
      mes_ref: mes,
      ano_ref: ano,
    }

    return this.httpClient.post(this.servidor + '/gastos/get/ultimos', payload, { headers: headers });

  }

  buscaPDF() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //    'Authorization': 'Bearer ' + this.token,
      'Accept': 'application/json'
    });

    return this.httpClient.get(this.servidor + '/rel/filiados', { responseType: 'blob' });

  }


}
