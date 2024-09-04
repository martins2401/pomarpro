import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { validateHorizontalPosition, validateVerticalPosition } from '@angular/cdk/overlay';
import { MaterialService } from '../../service/material.service';
import { ArvoreService } from '../../services/arvore.service';


@Component({
  selector: 'app-cad-arvore',
  templateUrl: './cad-arvore.component.html',
  styleUrl: './cad-arvore.component.scss'
})
export class CadArvoreComponent {
  constructor(
private ArvoreService:ArvoreService,
    private snackbar:MatSnackBar
  ){
   this.buscaArvore()
  }

  //inicializa o formulario 
  formulario:FormGroup = new FormGroup({
    id:new FormControl(null),
    defensiva:new FormControl('',Validators.required),
    fertilizante:new FormControl ('',Validators.required),
    ultima_verificacao:new FormControl ('',Validators.required),
    tipo:new FormControl('',Validators.required),
    situacao:new FormControl('',Validators.required),
    pomar:new FormControl('',Validators.required),
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

  this.ArvoreService.addArvore(info).subscribe({
    next:(resposta)=>{
      console.log(resposta)
      this.snackbar.open(
        "arvore adicionado com sucesso!",
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
        "Arvore não adicionado!",
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

buscaArvore(){
  this.ArvoreService.getArvore().subscribe({
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
