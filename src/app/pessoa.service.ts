import { Observable } from 'rxjs';
import { Pessoa } from './pessoa';

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private readonly API = "http://localhost:3000/pessoa";
  constructor(private http: HttpClient) { }
  recuperarPessoa() {
   return this.http.get<Pessoa[]>(this.API);
  }
  adicionarPessoa(pessoa:Pessoa): Observable<any> {
    return this.http.post(this.API, pessoa);
  }
  editarPessoa(pessoa: Pessoa): Observable<any> {
    return this.http.put(this.API + '/' + pessoa.id, pessoa);
  }
  deletarPessoa(id:number):Observable<any> {
    return this.http.delete(this.API + '/' + id);
  }
}
