import { PessoaService } from './pessoa.service';
import { Component, OnInit } from '@angular/core';
import { Pessoa } from "./pessoa";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


 
  title = 'crud';

  pessoaLista: Array<Pessoa> = [];

  novaPessoa: Pessoa;
  nome = "";
  email = "";
  idade = 0;
  id = 0;
  editar = false;
  nomeCurso = "";
  data: Date;
  mes: Array<string>;
  raiz: number
  


  mostrarFormulario = false;
  constructor(private pessoaService: PessoaService) { }
  
   ngOnInit(): void{ // no momento que inicioalizar a tela
     this.recuperarPessoas();
     this.nomeCurso = "angular";
     this.data = new Date(2005, 3, 5);
     this.mes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
     this.raiz = 25;
   }
  alterar = true;
  get formato() {
    return this.alterar ? 'fullDate' : 'dd/MM/yyyy';
  }
  alterarFormato() {
    this.alterar = !this.alterar;
   }

  recuperarPessoas() {
    this.pessoaService.recuperarPessoa()
      .subscribe(
        response => this.pessoaLista = response,
        error => console.log(error)
      )
  }

  adicionarPessoa() {
    this.mostrarFormulario = true;
  }

  cancelPessoa() {
    this.mostrarFormulario = false;
  }

  deletarPessoa(id:number) {
    this.pessoaService.deletarPessoa(id)
      .subscribe(
        res => this.pessoaLista = this.pessoaLista.filter(pes => pes.id !== id),
        err => alert("Erro ao deletar")
      );
    location.reload();
  }

  editarFormulario(pessoa: Pessoa) {
    this.id = pessoa.id;
    this.nome = pessoa.nome;
    this.idade = pessoa.idade;
    this.email = pessoa.email;
    this.mostrarFormulario = true;
    this.editar = true;
  }

  salvar() {
    // instanciar ex. Pessoa = new Pessoa() 
    this.novaPessoa = new Pessoa(this.id, this.nome, this.idade, this.email);

    if (this.editar == false) {
      this.pessoaService.adicionarPessoa(this.novaPessoa)
        .subscribe(
          res => { //(primeiro parametro que é uma função) se ocorrer tudo bem
            this.pessoaLista.push(this.novaPessoa);
            this.mostrarFormulario = false;
          },
          err => alert("Erro ao salvar") //(segundo parametro que é uma função) se ouver um erro
      );
      location.reload();
    } else {
      this.pessoaService.editarPessoa(this.novaPessoa)
        .subscribe(
          res => {
            this.mostrarFormulario = false;
            let indexPessoa = this.pessoaLista.findIndex(x => x.id == this.novaPessoa.id);
            this.pessoaLista[indexPessoa] = this.novaPessoa;
          },
          err => alert("Erro ao salvar")
      )
    }
    location.reload();
  }
  
}
