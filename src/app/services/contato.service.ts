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

  // Listar todos os contatos
  listarContatos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Criar novo contato
  criarContato(contato: Partial<ContatoAPI>): Observable<any> {
    return this.http.post<any>(this.apiUrl, contato);
  }

  // Buscar contato por ID
  buscarContato(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Atualizar contato
  atualizarContato(id: number, contato: Partial<ContatoAPI>): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, contato);
  }

  // Excluir contato
  excluirContato(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}