import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario/usuario.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  senhas_nao_conferem = false;
  senha_alterada = false;
  new_password = "";
  new_password2 = "";
  token_recebido = "";
  msg_erro_token = false;
  msg_erro_server = false;
  msg_erro_server_senha = false;
  token_validado = false;
  token_expirado = false;
  spinner = false;
  spinner_token = false;
  constructor(private route: ActivatedRoute, private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {

  }

  alterarSenha() {

    if (this.new_password != this.new_password2) {
      this.senhas_nao_conferem = true;
      this.msg_erro_server_senha = false;
    } else {
      this.spinner = true;
      this.usuarioService.alterarSenhaPorToken(this.token_recebido, this.new_password)
        .subscribe((data: any) => {

          this.spinner = false;
          //  console.log(data);
          this.senhas_nao_conferem = false;
          this.msg_erro_server_senha = false;
          this.senha_alterada = true;

        setTimeout(() => {
          this.router.navigate(['/login']);
        },
          2000);

        }, (erro) => {
          this.spinner = false;
          //  console.log(erro);
          this.msg_erro_server_senha = true;
          this.senhas_nao_conferem = false;
        });

    }
  }

  // pegaParametroUrl() {
  //   this.route.params.subscribe((objeto: any) => {

  //     this.token_recebido = objeto.id;

  //     this.validarToken();

  //   })
  // }

  validarToken() {
    this.spinner_token = true;
    this.usuarioService.validarToken(this.token_recebido)
      .subscribe((data: any) => {

        this.spinner_token = false;
        //  console.log(data);
        this.token_validado = true;


      }, (erro) => {
        this.spinner_token = false;
        //  console.log(erro);
        if (erro.status == 404) {
          this.msg_erro_token = true;
        }

        if (erro.status == 403) {
          this.token_expirado = true;
        }

        if (erro.status != 403 && erro.status != 404) {
          this.msg_erro_server = true;
        }
      });
  }

}
