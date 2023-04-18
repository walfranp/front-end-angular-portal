import { Component, OnInit } from '@angular/core';
import { ExtratoService } from '../services/extrato/extrato.service';
declare let Chart: any;

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {

  arquivo: any = null;
  spinner = false;
  ano_corrente: any = null;
  meses = new Array<any>();
  valores = new Array<any>();

  top5convenio = new Array<any>();
  top5valores = new Array<any>();

  constructor(private extratoService: ExtratoService) {
    let data = new Date();
    this.ano_corrente = data.getFullYear();
  }

  ngOnInit(): void {
    this.getDadosGastosMensais();

    this.montaGraficoPizza();
  }

  getDadosGastosMensais() {
    this.extratoService.buscarValoresMeses(this.ano_corrente)
      .subscribe((data: any) => {

        console.log("dados do gráfico:");
        if (data.length > 0) {
          console.log(data);

          for (let i = 0; i < data.length; i++) {
            this.meses.push(data[i].mes);
            this.valores.push(data[i].total);
          }
          this.valores.push(0);
        }

        this.montaGraficoBarras();
        this.getDadosTop5Convenios();

      }, (erro) => {
        this.spinner = false;
        console.log(erro);
      });
  }

  getDadosTop5Convenios() {
    this.extratoService.buscarConveniosTop5(this.ano_corrente)
      .subscribe((data: any) => {

        console.log("Top 5:");
        if (data.length > 0) {
          console.log(data);

          for (let i = 0; i < data.length; i++) {
            this.top5convenio.push(data[i].nome);
            this.top5valores.push(data[i].total);
          }
          this.valores.push(0);
        }

        this.montaGraficoPizza();

      }, (erro) => {
        this.spinner = false;
        console.log(erro);
      });
  }

  montaGraficoBarras() {
    const ctx = document.getElementById('myChartBar');

    console.log("Valores gráfico");
    console.log(this.valores);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.meses,
        datasets: [{
          label: 'Gráfico de gastos mensais',
          data: this.valores,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          },
          x: {
            grid: {
              offset: true
            }
          }
        }
      }
    });
  }

  montaGraficoPizza() {
    const ctx = document.getElementById('myChartPizza');

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.top5convenio,
        datasets: [{
          label: 'Top 5 convênios',
          data: this.top5valores,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  buscaArquivo() {
    this.spinner = true;
    this.extratoService.buscaPDF()
      .subscribe((data: Blob) => {

        this.spinner = false;
        console.log(data);

        var file = new Blob([data], { type: 'application/pdf' });
        var fileURL = window.URL.createObjectURL(file);
        window.open(fileURL, '_blank');

      }, (erro) => {
        this.spinner = false;
        console.log(erro);
      });
  }

}
