import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { UsuarioService } from '../services/usuario/usuario.service';
import { UtilService } from '../services/util/util.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {

  usuarioLogado = "";
  senhas_nao_conferem = false;
  senha_alterada = false;
  senha_atual = "";
  new_password = "";
  new_password2 = "";
  spinner = false;
  msg_senha_atual_nao_confere = false;
  msg_erro_server = false;

  constructor(private loginService: LoginService, private utilService: UtilService, private usuarioService: UsuarioService) {
    this.usuarioLogado = utilService.getNome();
  }

  ngOnInit(): void {

  }

  sair() {
    this.loginService.fazerLogoff();
    location.href = location.origin;
  }

  alterarSenha(){

    if(this.new_password != this.new_password2){
      this.senhas_nao_conferem = true;
    }else{

      this.spinner = true;
      this.usuarioService.alterarSenha(this.senha_atual, this.new_password)
        .subscribe((data: any) => {

          this.spinner = false;
        //  console.log(data);

        this.senhas_nao_conferem = false;
        this.msg_senha_atual_nao_confere = false;
        this.msg_erro_server = false;
        this.senha_alterada = true;


        }, (erro) => {
          this.spinner = false;
        //  console.log(erro);
          if (erro.status == 403) {
            this.msg_senha_atual_nao_confere = true;
          } else {
            this.msg_erro_server = true;
          }
        });



    }
  }

}
