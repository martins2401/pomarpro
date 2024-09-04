import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { validateHorizontalPosition, validateVerticalPosition } from '@angular/cdk/overlay';
import { MaterialService } from '../../service/material.service';
import { pomarService } from '../../services/pomar.service';
import { MovimentoService } from '../../services/movimento.service';


@Component({
  selector: 'app-cad-Movimento',
  templateUrl: './cad-Movimento.component.html',
  styleUrl: './cad-Movimento.component.scss'
})
export class CadMovimentoComponent {
  constructor(
private MovimentoService:MovimentoService,
    private snackbar:MatSnackBar
  ){
   this.buscaMovimento()
  }

  //inicializa o formulario 
  formulario:FormGroup = new FormGroup({
    id:new FormControl(null),
    quantidade:new FormControl('',Validators.required),
    produto:new FormControl ('',Validators.required),
    tipo:new FormControl('',Validators.required),
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

  this.MovimentoService.addMovimento(info).subscribe({
    next:(resposta)=>{
      console.log(resposta)
      this.snackbar.open(
        "Movimento adicionado com sucesso!",
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
        "oh não!",
        "Movimento não adicionado!",
        {
          verticalPosition:'top',
          horizontalPosition:'end',
          duration:3000
        }
      )
    }

  })


 if(info.id == null){
  //irá insersir no banco de dados do usuário 

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

buscaMovimento(){
  this.MovimentoService.getMovimento().subscribe({
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


