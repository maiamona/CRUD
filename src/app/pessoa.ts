export class Pessoa{
  public id: number;
  public nome: string;
  public idade: number;
  public email: string;

  constructor(id: number, nome: string, idade: number, email: string) {
    this.idade = idade;
    this.email = email;
    this.nome = nome;
    this.id = id;
  }
}