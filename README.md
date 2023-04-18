
<p align="center">
  <img src="src/assets/angular.png" alt="angular-logo" width="120px" height="120px"/>
</p>

# Front-end Angular - Portal para sindicatos, associações...

## O que é este projeto?
O projeto tem como objetivo disponibilizar extrato de gastos detalhado por associado e possibilitando a impressão. Grafico de gastos, gráfico de convênios mais utilizados, relatório de gasto com saúde e links úteis.

## Pré-requisitos
- Node.js
- npm
- Angular-cli
- Requer o backend-end feito em laravel que se comunica com esse front-end. Link: https://github.com/walfranp/backend-laravel-portal 

## Para rodar este projeto
```bash
$ npm install
$ ng serve #lembre-se de startar o backend para a aplicação se comunicar com o banco
```
Acesssar pela url: http://localhost:4200

## Anotações/Extras
Caso apresente algum erro ao rodar o projeto, pode ser que a sua versão do angular é mais nova. Então será preciso executar:
```bash
$ export NODE_OPTIONS=--openssl-legacy-provider
```
Então após isso execute novamente o comando para subir a plicação:
```bash
$ ng serve
```
