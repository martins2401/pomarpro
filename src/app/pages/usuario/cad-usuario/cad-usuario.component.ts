import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../service/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { validateHorizontalPosition, validateVerticalPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'app-cad-usuario',
  templateUrl: './cad-usuario.component.html',
  styleUrl: './cad-usuario.component.scss'
})
export class CadUsuarioComponent {
  constructor(
    private usuarioService:UsuarioService,
    private snackbar:MatSnackBar
  ){
this.buscaUsuarios()
  }

  //inicializa o formulario 
  formulario:FormGroup = new FormGroup({
    id:new FormControl(null),
    nome:new FormControl('',Validators.required),
    sobrenome:new FormControl ('',Validators.required),
    endereço:new FormControl('',Validators.required),
    telefone:new FormControl('',Validators.required),
    email:new FormControl('',Validators.required),
    login:new FormControl('',Validators.required),
  })


//métodos dos controles do formúlario
onIncluir(){
this.formulario.reset();
this.formulario.enable();


}

onSalvar(){
    //Guarda as informações em bariáveis pra melhorar o acesso 
  let info = this.formulario.value;
 //Verificar se está inserindo ou alterando com base no valor 
 //do ID (se for null,está  inserindo, senão está alterado)
 if(info.id == null){
  //irá insersir no banco de dados do usuário 
  
this.usuarioService.addUsuario(info).subscribe({
  next:(resposta)=>{
    console.log(resposta)
    this.snackbar.open(
    "usuário adicionado com sucesso!",
    "OK",  
    {
      verticalPosition:'top',
      horizontalPosition:'end',
      duration:3000
    }
    );
this.onCancelar()

  },
error:(erro)=>{
  console.log(erro)
  this.snackbar.open(
    "Oh não!",
    "Usuário não adicionado!",  
    {
      verticalPosition:'top',
      horizontalPosition:'end',
      duration:3000
    }
    )

}})

 }else{
  //irá alterar o usuario no banco de dados 
 }

}

onCancelar(){
this.formulario.reset();
this.formulario.disable();                                                                                             
}

// Função para buscar as informações e usúarios

relatorio:any[] = [];


buscaUsuarios(){
  this.usuarioService.getUsuarios().subscribe({
    next:(resposta)=>{
      console.log(resposta);
      this.relatorio = resposta.body;
    },
    error:(erro)=>{
      console.log(erro);
    }
  })

}


}
