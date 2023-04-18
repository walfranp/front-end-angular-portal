import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { UtilService } from '../services/util/util.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  msg_erro_login = false;
  msg_erro_server = false;
  msg_erro_server_envio_link = false;
  spinner = false;
  spinnerLink = false;

  email_nao_confere = false;
  link_enviado = false;
  ocultarDizeres = false;

  usuario_informado = "";
  senha_informada = "";
  email_cad = "";

  passwordType: string = 'password';
  passwordVisivel: boolean = false;

  constructor(private loginService: LoginService, private utilService: UtilService, private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit(): void {

  }



  visualizaOcultaSenha() {

    if (this.passwordVisivel) {
      this.passwordVisivel = false;
      this.passwordType = 'password';
    } else {
      this.passwordVisivel = true;
      this.passwordType = 'text';
    }

  }


  fazerLogin() {
    this.spinner = true;
    this.loginService.fazerLogin(this.usuario_informado, this.senha_informada)
      .subscribe((data: any) => {

        this.spinner = false;
        //  console.log(data);
        this.utilService.setaNome(data.usuario.name);
        this.utilService.setaToken(data.token);
        this.utilService.setaStatusUser("true");
        location.href = location.origin;

      }, (erro) => {
        this.spinner = false;
        //  console.log(erro);
        if (erro.status == 401) {
          this.msg_erro_login = true;
        } else {
          this.msg_erro_server = true;
        }
      });

  }

  enviarLinkAlteracaoSenha() {
    this.spinnerLink = true;
    this.usuarioService.recuperarSenha(this.email_cad)
      .subscribe((data: any) => {

        this.spinnerLink = false;
        console.log(data);


        this.link_enviado = true;
        this.ocultarDizeres = true;
        this.email_nao_confere = false;

        // setTimeout(() => {

        // },
        //   4000);


      }, (erro) => {
        this.spinnerLink = false;
        console.log(erro);
        if (erro.status == 404) {
          this.link_enviado = false;
          this.email_nao_confere = true;
        } else {
          this.msg_erro_server_envio_link = true;
        }
      });

  }

  irParaAlteracaoSenha() {
    if (this.link_enviado) {
      this.router.navigate(['/change-password']);
    }

  }


}
