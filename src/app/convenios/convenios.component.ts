import { Component, OnInit } from '@angular/core';
import { ExtratoService } from '../services/extrato/extrato.service';
import { Convenio } from '../Classes/Convenio';

@Component({
  selector: 'app-convenios',
  templateUrl: './convenios.component.html',
  styleUrls: ['./convenios.component.css']
})
export class ConveniosComponent implements OnInit {

  listaConvenios = new Array<Convenio>();

  constructor(private extratoService: ExtratoService) { }

  ngOnInit(): void {
    this.getConvenios();
  }

  getConvenios() {
    this.extratoService.buscarConvenios()
      .subscribe((data: any) => {

        console.log("convenios:");
        if (data.length > 0) {
          console.log(data);

          for (let i = 0; i < data.length; i++) {
            let convenio = new Convenio();
            convenio.codigo = data[i].codigo;
            convenio.nome = data[i].nome;
            this.listaConvenios.push(convenio);
          }


        }


      }, (erro) => {
        console.log(erro);
      });
  }

}
