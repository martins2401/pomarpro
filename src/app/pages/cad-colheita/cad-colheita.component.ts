import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ColheitaService } from '../../services/colheita.service';


@Component({
  selector: 'app-cad-colheita',
  templateUrl: './cad-colheita.component.html',
  styleUrl: './cad-colheita.component.scss'
})
export class CadColheitaComponent {
  constructor(
private colheitaService:ColheitaService,
    private snackbar:MatSnackBar
  ){
   this.buscaColheita()
  }

  //inicializa o formulario 
  formulario:FormGroup = new FormGroup({
    id:new FormControl(null),
    quantidade:new FormControl('',Validators.required),
    arvore:new FormControl ('',Validators.required),
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

  this.colheitaService.addColheita(info).subscribe({
    next:(resposta)=>{
      console.log(resposta)
      this.snackbar.open(
        "Colheita adicionado com sucesso!",
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
        "Colheita não adicionado!",
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

buscaColheita(){
  this.colheitaService.getColheita().subscribe({
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