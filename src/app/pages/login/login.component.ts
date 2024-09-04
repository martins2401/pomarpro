import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  //declaração da variavel de erro
  msg_erro:string|null = null 

  constructor(
    private autenticacaoService:AutenticacaoService,
    private rota:Router
        ){}

  //inicialização do formulário reativo
  form = new FormGroup({
    usuario:new FormControl(),
    senha:new FormControl()

  })

//Método para testar o login
onLogin(){
  console.log(this.form.value)
  this.autenticacaoService.auenticaUsuario(this.form.value.usuario,
  this.form.value.senha)
  .subscribe({
    next:(resposta)=>{
      this.msg_erro = null;
      this.rota.navigate(['home']);

    },
    error:(erro)=>{
      console.log(erro)
      switch(erro.status){
        case 401:
          this.msg_erro = 'Usuario ou senha invalido'
          break;
          case 500:
            this.msg_erro = 'erro no servidor, tente novamente mais tarde'
            break;
      }
    }
  })
}

}