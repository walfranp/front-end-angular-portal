import { Component, OnInit } from '@angular/core';
import { UtilService } from '../services/util/util.service';
import { ExtratoService } from '../services/extrato/extrato.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nome_associado: any = null;
  ano_corrente: any = null;
  mes_corrente: any = null;
  saudacao: any = null;
  dizeres_desconto: any = null;

  mes_ref_valor: any = null;
  ano_ref_valor: any = null;
  valor: any = null;


  constructor(private utilService: UtilService, private extratoService: ExtratoService) {

    this.nome_associado = utilService.getNome();

    let data = new Date();
    this.ano_corrente = data.getFullYear();
    this.mes_corrente = data.getMonth() + 1;
  }

  ngOnInit(): void {

    this.buscaUltimosGastos(this.mes_corrente, this.ano_corrente);
    this.montaCumprimento();
  }

  montaCumprimento() {

    let data = new Date();
    let hora = data.getHours();

    if (hora >= 1 && hora <= 11) {
      this.saudacao = "Bom dia ";
    }

    if (hora >= 12 && hora <= 18) {
      this.saudacao = "Boa tarde ";
    }

    if (hora >= 19 && hora <= 23) {
      this.saudacao = "Boa noite ";
    }

    if (hora == 0) {
      this.saudacao = "Boa noite ";
    }

  }

  buscaUltimosGastos(mes, ano) {
    this.extratoService.buscaUltimosGastos(mes, ano)
      .subscribe((data: any) => {

         console.log("Ultimos Gastos:");
         console.log(data);
        this.mes_ref_valor = data.mes;
        this.ano_ref_valor = data.ano;
        this.valor = data.total;

        console.log(this.valor);

        //  if (data.total == 0) {
        //    this.dizeres_desconto = "Não foram encontrados descontos recentes.";
        //  }else{

        //  }

      }, (erro) => {
        console.log(erro);
      });

  }

}
