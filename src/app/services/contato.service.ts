import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContatoAPI {
  id?: number;
  nome: string;
  email: string;
  data_nascimento: string;
  profissao: string;
  telefone_contato: string;
  celular_contato: string;
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private apiUrl = 'http://localhost:8000/api/contatos';

  constructor(private http: HttpClient) {}

  // Listar todos os contatos - GET simples
  listarContatos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}