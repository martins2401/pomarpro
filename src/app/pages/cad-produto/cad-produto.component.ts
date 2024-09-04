import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { validateHorizontalPosition, validateVerticalPosition } from '@angular/cdk/overlay';
import { MaterialService } from '../../service/material.service';
import { produtoService } from '../../services/produto.service';


@Component({
  selector: 'app-cad-Produto',
  templateUrl: './cad-produto.component.html',
  styleUrl: './cad-produto.component.scss'
})
export class CadProdutoComponent {
  constructor(
private ProdutoService:produtoService,
    private snackbar:MatSnackBar
  ){
   this.buscaProduto()
  }

  //inicializa o formulario 
  formulario:FormGroup = new FormGroup({
    id:new FormControl(null),
    descricao:new FormControl('',Validators.required),
    unid_medida:new FormControl ('',Validators.required),
    valor:new FormControl('',Validators.required),
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

  this.ProdutoService.addProduto(info).subscribe({
    next:(resposta)=>{
      console.log(resposta)
      this.snackbar.open(
        "Produto adicionado com sucesso!",
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
        "Produto não adicionado!",
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

buscaProduto(){
  this.ProdutoService.getProduto().subscribe({
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


