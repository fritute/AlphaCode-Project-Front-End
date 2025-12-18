import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContatoService, ContatoAPI } from '../../services/contato.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="container">
      <!-- Formulário de Cadastro -->
      <div class="form-container">
        <form class="contact-form" (ngSubmit)="cadastrarContato()">
          <div class="form-row">
            <div class="form-field">
              <label for="nome">Nome completo</label>
              <input 
                type="text" 
                id="nome" 
                name="nome"
                placeholder="Ex.: Letícia Pacheco dos Santos"
                [(ngModel)]="contato.nome"
                required>
            </div>
            
            <div class="form-field">
              <label for="data_nascimento">Data de nascimento</label>
              <input 
                type="date" 
                id="data_nascimento" 
                name="data_nascimento"
                [(ngModel)]="contato.data_nascimento"
                required>
            </div>
          </div>

          <div class="form-row">
            <div class="form-field">
              <label for="email">E-mail</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                placeholder="Ex.: leticia@gmail.com"
                [(ngModel)]="contato.email"
                required>
            </div>
            
            <div class="form-field">
              <label for="profissao">Profissão</label>
              <input 
                type="text" 
                id="profissao" 
                name="profissao"
                placeholder="Ex.: Desenvolvedora Web"
                [(ngModel)]="contato.profissao"
                required>
            </div>
          </div>

          <div class="form-row">
            <div class="form-field">
              <label for="telefone_contato">Telefone para contato</label>
              <input 
                type="tel" 
                id="telefone_contato" 
                name="telefone_contato"
                placeholder="Ex.: 40332019"
                maxlength="8"
                [(ngModel)]="contato.telefone_contato"
                required>
            </div>
            
            <div class="form-field">
              <label for="celular_contato">Celular para contato</label>
              <input 
                type="tel" 
                id="celular_contato" 
                name="celular_contato"
                placeholder="Ex.: 11984932039"
                maxlength="11"
                [(ngModel)]="contato.celular_contato"
                required>
            </div>
          </div>

          <!-- Checkboxes -->
          <div class="checkbox-section">
            <div class="checkbox-item">
              <input 
                type="checkbox" 
                id="whatsapp" 
                name="whatsapp"
                [(ngModel)]="contato.possuiWhatsapp">
              <label for="whatsapp">Número de celular possui Whatsapp</label>
            </div>
            
            <div class="checkbox-item">
              <input 
                type="checkbox" 
                id="notificacaoEmail" 
                name="notificacaoEmail"
                [(ngModel)]="contato.notificacaoEmail">
              <label for="notificacaoEmail">Enviar notificações por E-mail</label>
            </div>
            
            <div class="checkbox-item">
              <input 
                type="checkbox" 
                id="notificacaoSMS" 
                name="notificacaoSMS"
                [(ngModel)]="contato.notificacaoSMS">
              <label for="notificacaoSMS">Enviar notificações por SMS</label>
            </div>
          </div>

          <!-- Mensagem de erro -->
          <div class="error-message" *ngIf="erro">
            {{ erro }}
          </div>

          <!-- Botões de ação -->
          <div class="form-actions">
            <button type="submit" class="btn-cadastrar" [disabled]="loading">
              {{ loading ? 'Aguarde...' : (editandoId ? 'Atualizar contato' : 'Cadastrar contato') }}
            </button>
            <button type="button" class="btn-cancelar" *ngIf="editandoId" (click)="cancelarEdicao()">
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <!-- Linha Separadora -->
      <hr class="separator">

      <!-- DEBUG -->
      <div style="background: #f0f0f0; padding: 1rem; margin: 1rem 0; font-family: monospace;">
        <p><strong>DEBUG INFO:</strong></p>
        <p>Loading: {{ loading }}</p>
        <p>Erro: {{ erro }}</p>
        <p>Total contatos: {{ contatos.length }}</p>
        <p>Primeiro contato: {{ contatos[0]?.nome || 'Nenhum' }}</p>
      </div>

      <!-- Tabela de Contatos -->
      <div class="table-container">
        <table class="contatos-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Data nascimento</th>
              <th>E-mail</th>
              <th>Celular</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngIf="loading">
              <td colspan="6" class="loading-cell">🔄 Carregando contatos da API...</td>
            </tr>
            <tr *ngIf="!loading && erro">
              <td colspan="6" class="empty-cell" style="color: red;">❌ {{ erro }}</td>
            </tr>
            <tr *ngIf="!loading && !erro && contatos.length === 0">
              <td colspan="6" class="empty-cell">📭 Nenhum contato encontrado na API</td>
            </tr>
            <tr *ngFor="let contato of contatos; let i = index; trackBy: trackByFn">
              <td>{{ contato.id || i+1 }}</td>
              <td>{{ contato.nome }}</td>
              <td>{{ formatarData(contato.data_nascimento) }}</td>
              <td>{{ contato.email }}</td>
              <td>{{ contato.celular_contato }}</td>
              <td class="actions">
                <button class="btn-edit" (click)="editarContato(contato)">
                  ✏️
                </button>
                <button class="btn-delete" (click)="excluirContato(contato.id!)">
                  🗑️
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  contato = {
    nome: '',
    data_nascimento: '',
    email: '',
    profissao: '',
    telefone_contato: '',
    celular_contato: '',
    possuiWhatsapp: false,
    notificacaoEmail: false,
    notificacaoSMS: false
  };

  contatos: ContatoAPI[] = [];
  loading = false;
  erro = '';
  editandoId: number | null = null;

  constructor(private contatoService: ContatoService) {}

  ngOnInit() {
    console.log('HomeComponent inicializado');
    this.carregarContatos();
  }

  carregarContatos() {
    console.log('Iniciando carregamento de contatos...');
    this.loading = true;
    this.erro = '';
    
    this.contatoService.listarContatos().subscribe({
      next: (response) => {
        console.log('RESPOSTA COMPLETA DA API:', response);
        
        let contatosCarregados: ContatoAPI[] = [];
        
        // Tratar diferentes formatos de resposta da API
        if (Array.isArray(response)) {
          if (response.length > 0 && response[0].contatos) {
            // Formato: [{ contatos: [...], total: 5, page: 1 }]
            contatosCarregados = response[0].contatos;
            console.log('Formato 1 - Array com contatos:', contatosCarregados);
          } else {
            // Formato: [...] (array direto)
            contatosCarregados = response;
            console.log('Formato 2 - Array direto:', contatosCarregados);
          }
        } else if (response && response.contatos) {
          // Formato: { contatos: [...] }
          contatosCarregados = response.contatos;
          console.log('Formato 3 - Objeto com contatos:', contatosCarregados);
        } else if (response && response.data) {
          // Formato: { success: true, data: [...] }
          contatosCarregados = Array.isArray(response.data) ? response.data : [response.data];
          console.log('Formato 4 - Com data:', contatosCarregados);
        }
        
        this.contatos = contatosCarregados;
        console.log('CONTATOS FINAIS CARREGADOS:', this.contatos.length, this.contatos);
        this.loading = false;
      },
      error: (error) => {
        console.error('ERRO AO CARREGAR CONTATOS:', error);
        this.erro = `Erro ao carregar contatos: ${error.message || error}`;
        this.contatos = [];
        this.loading = false;
      }
    });
  }

  cadastrarContato() {
    if (!this.contato.nome || !this.contato.email) {
      this.erro = 'Nome e email são obrigatórios';
      return;
    }

    // Simular cadastro e apenas recarregar da API
    this.resetForm();
    this.carregarContatos();
  }

  editarContato(contato: ContatoAPI) {
    // Apenas simular edição
    console.log('Editando contato:', contato);
  }

  excluirContato(id: number) {
    // Apenas simular exclusão
    console.log('Excluindo contato:', id);
  }

  cancelarEdicao() {
    this.editandoId = null;
    this.resetForm();
  }

  resetForm() {
    this.editandoId = null;
    this.contato = {
      nome: '',
      data_nascimento: '',
      email: '',
      profissao: '',
      telefone_contato: '',
      celular_contato: '',
      possuiWhatsapp: false,
      notificacaoEmail: false,
      notificacaoSMS: false
    };
    this.erro = '';
  }

  formatarData(data: string): string {
    if (!data) return '';
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR');
  }

  trackByFn(index: number, item: ContatoAPI): any {
    return item.id || index;
  }

  // Método para testar com dados locais
  testarComDadosLocais() {
    this.contatos = [
      {
        id: 1,
        nome: 'Teste Local',
        data_nascimento: '2000-01-01',
        email: 'teste@local.com',
        profissao: 'Teste',
        telefone_contato: '12345678',
        celular_contato: '11987654321'
      }
    ];
  }
}