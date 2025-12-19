import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContatoService, ContatoAPI } from '../../services/contato.service';
import { FormatacaoService } from '../../services/formatacao.service';

export interface Contato {
  nome: string;
  data_nascimento: string;
  email: string;
  profissao: string;
  telefone_contato: string;
  celular_contato: string;
  possuiWhatsapp: boolean;
  notificacaoEmail: boolean;
  notificacaoSMS: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <!-- Header -->
      <div class="form-header">
        <h1>Cadastro de contato</h1>
      </div>

      <!-- Formulário -->
      <div class="form-container">
        <form (ngSubmit)="salvarContato()" #contatoForm="ngForm">
          <!-- Primeira linha -->
          <div class="form-row">
            <div class="form-field">
              <label for="nome">Nome</label>
              <input 
                type="text" 
                id="nome" 
                name="nome"
                placeholder="Ex.: João da Silva"
                [(ngModel)]="contato.nome"
                #nomeField="ngModel"
                minlength="2"
                required>
              <div *ngIf="nomeField.invalid && nomeField.touched" class="error-text">
                <small *ngIf="nomeField.errors?.['required']" style="color: #dc3545;">Nome é obrigatório</small>
                <small *ngIf="nomeField.errors?.['minlength']" style="color: #dc3545;">Nome deve ter pelo menos 2 caracteres</small>
              </div>
            </div>
            <div class="form-field">
              <label for="data_nascimento">Data de nascimento</label>
              <input 
                type="date" 
                id="data_nascimento" 
                name="data_nascimento"
                placeholder="Selecione a data de nascimento"
                [(ngModel)]="contato.data_nascimento"
                #dataNascimento="ngModel"
                required>
              <div *ngIf="dataNascimento.invalid && dataNascimento.touched" class="error-text">
                <small *ngIf="dataNascimento.errors?.['required']" style="color: #dc3545;">Data de nascimento é obrigatória</small>
              </div>
            </div>
          </div>

          <!-- Segunda linha -->
          <div class="form-row">
            <div class="form-field">
              <label for="email">E-mail</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                placeholder="Ex.: joao@teste.com.br"
                [(ngModel)]="contato.email"
                #emailField="ngModel"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                required>
              <div *ngIf="emailField.invalid && emailField.touched" class="error-text">
                <small *ngIf="emailField.errors?.['required']" style="color: #dc3545;">E-mail é obrigatório</small>
                <small *ngIf="emailField.errors?.['email'] || emailField.errors?.['pattern']" style="color: #dc3545;">E-mail inválido - deve conter &#64;</small>
              </div>
            </div>
            <div class="form-field">
              <label for="profissao">Profissão</label>
              <input 
                type="text" 
                id="profissao" 
                name="profissao"
                placeholder="Ex.: Desenvolvedora Web"
                [(ngModel)]="contato.profissao"
                #profissaoField="ngModel"
                minlength="2"
                required>
              <div *ngIf="profissaoField.invalid && profissaoField.touched" class="error-text">
                <small *ngIf="profissaoField.errors?.['required']" style="color: #dc3545;">Profissão é obrigatória</small>
                <small *ngIf="profissaoField.errors?.['minlength']" style="color: #dc3545;">Profissão deve ter pelo menos 2 caracteres</small>
              </div>
            </div>
          </div>

          <!-- Terceira linha -->
          <div class="form-row">
            <div class="form-field">
              <label for="telefone_contato">Telefone para contato</label>
              <input 
                type="tel" 
                id="telefone_contato" 
                name="telefone_contato"
                placeholder="Ex.: (11) 4003-2019"
                maxlength="15"
                [(ngModel)]="telefoneFormatado"
                (input)="formatarTelefoneInput($event)"
                (keypress)="validarDigitacaoTelefone($event)"
                #telefoneField="ngModel"
                required>
              <div *ngIf="telefoneField.invalid && telefoneField.touched" class="error-text">
                <small *ngIf="telefoneField.errors?.['required']" style="color: #dc3545;">Telefone é obrigatório</small>
                <small *ngIf="telefoneField.errors?.['pattern'] || telefoneField.errors?.['minlength']" style="color: #dc3545;">Telefone deve ter 10 dígitos (DDD + número)</small>
              </div>
            </div>
            
            <div class="form-field">
              <label for="celular_contato">Celular para contato</label>
              <input 
                type="tel" 
                id="celular_contato" 
                name="celular_contato"
                placeholder="Ex.: (11)98493-2039"
                maxlength="15"
                [(ngModel)]="celularFormatado"
                (input)="formatarCelularInput($event)"
                #celularField="ngModel"
                required>
              <div *ngIf="celularField.invalid && celularField.touched" class="error-text">
                <small *ngIf="celularField.errors?.['required']" style="color: #dc3545;">Celular é obrigatório</small>
                <small *ngIf="celularField.errors?.['pattern'] || celularField.errors?.['minlength']" style="color: #dc3545;">Celular deve ter 11 dígitos</small>
              </div>
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

          <!-- Mensagem de sucesso -->
          <div class="success-message" *ngIf="mensagemSucesso" style="color: #28a745; margin: 10px 0; padding: 10px; background-color: #d4edda; border: 1px solid #c3e6cb; border-radius: 4px;">
            {{ mensagemSucesso }}
          </div>

          <!-- Botões de ação -->
          <div class="form-actions">
            <button type="submit" class="btn-cadastrar" [disabled]="loading || contatoForm.invalid">
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

      <!-- Filtros de Pesquisa -->
      <div style="margin: 20px 0; padding: 20px; background: #f8f9fa; border-radius: 5px;">
        <h3>Filtros de Pesquisa</h3>
        <div style="display: flex; gap: 15px; flex-wrap: wrap; align-items: center;">
          <div>
            <label for="filtroProfissao" style="display: block; margin-bottom: 5px; font-weight: bold;">Profissão:</label>
            <input 
              type="text" 
              id="filtroProfissao"
              [(ngModel)]="filtroProfissao"
              (input)="aplicarFiltros()"
              placeholder="Ex: Desenvolvedora"
              style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 200px;">
          </div>
          <div>
            <label for="filtroAno" style="display: block; margin-bottom: 5px; font-weight: bold;">Ano de Nascimento:</label>
            <input 
              type="text" 
              id="filtroAno"
              [(ngModel)]="filtroAnoNascimento"
              (input)="aplicarFiltros()"
              placeholder="Ex: 1990"
              maxlength="4"
              style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 120px;">
          </div>
          <div style="align-self: end;">
            <button 
              (click)="limparFiltros()"
              style="padding: 8px 15px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;">
              Limpar Filtros
            </button>
          </div>
        </div>
      </div>

      <h2>Total: {{ contatosFiltrados.length }} contatos encontrados ({{ contatos.length }} no total)</h2>

      <!-- Mensagem de carregamento -->
      <div *ngIf="loading" style="text-align: center; padding: 20px;">
        <p>Carregando contatos...</p>
      </div>

      <!-- Mensagem quando não há contatos -->
      <div *ngIf="!loading && contatos.length === 0" style="text-align: center; padding: 20px;">
        <p>Nenhum contato cadastrado. Cadastre o primeiro contato acima!</p>
      </div>

      <!-- Mensagem quando filtro não encontra resultados -->
      <div *ngIf="!loading && contatos.length > 0 && contatosFiltrados.length === 0" style="text-align: center; padding: 20px;">
        <p>Nenhum contato encontrado com os filtros aplicados.</p>
      </div>



      <!-- TABELA COMPLETA -->
      <div *ngIf="!loading && contatosFiltrados.length > 0">
      <table border="1" style="width: 100%; margin: 20px 0;">
        <tr style="background: #048cd4; color: white;">
          <th style="padding: 10px;">Nome</th>
          <th style="padding: 10px;">Email</th>
          <th style="padding: 10px;">Data Nascimento</th>
          <th style="padding: 10px;">Profissão</th>
          <th style="padding: 10px;">Telefone</th>
          <th style="padding: 10px;">Celular</th>
          <th style="padding: 10px;">Ações</th>
        </tr>
        <tr *ngFor="let c of contatosPaginados; trackBy: trackContatoById" style="background: white;">
          <td style="padding: 10px; border: 1px solid #ccc; font-weight: bold;">{{ c.nome }}</td>
          <td style="padding: 10px; border: 1px solid #ccc;">{{ c.email }}</td>
          <td style="padding: 10px; border: 1px solid #ccc; text-align: center;">{{ formatarData(c.data_nascimento) }}</td>
          <td style="padding: 10px; border: 1px solid #ccc;">{{ c.profissao }}</td>
          <td style="padding: 10px; border: 1px solid #ccc; text-align: center;">{{ formatarTelefoneExibicao(c.telefone_contato) }}</td>
          <td style="padding: 10px; border: 1px solid #ccc; text-align: center;">{{ formatarCelularExibicao(c.celular_contato) }}</td>
          <td style="padding: 10px; border: 1px solid #ccc; text-align: center;">
            <button 
              (click)="editarContato(c)" 
              style="margin-right: 5px; background: transparent; border: none; cursor: pointer; padding: 4px;"
              [disabled]="loading"
              title="Editar contato">
              <img src="assets/editar.png" alt="Editar" style="width: 24px; height: 24px;">
            </button>
            <button 
              (click)="excluirContato(c.id!)" 
              style="background: transparent; border: none; cursor: pointer; padding: 4px;"
              [disabled]="loading"
              title="Excluir contato">
              <img src="assets/excluir.png" alt="Excluir" style="width: 24px; height: 24px;">
            </button>
          </td>
        </tr>
      </table>

      <!-- CONTROLES DE PAGINAÇÃO (INFERIOR) -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin: 20px 0; padding: 10px; background: #e9ecef; border-radius: 5px;">
        <div>
          <strong>Página {{ paginaAtual }} de {{ totalPaginas }}</strong>
        </div>
        <div style="display: flex; gap: 5px; align-items: center;">
          <button 
            (click)="paginaAtual = 1" 
            [disabled]="paginaAtual === 1 || loading"
            style="padding: 8px 12px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;"
            [style.opacity]="paginaAtual === 1 ? '0.5' : '1'">
            Primeira
          </button>
          <button 
            (click)="paginaAnterior()" 
            [disabled]="paginaAtual === 1 || loading"
            style="padding: 8px 12px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
            [style.opacity]="paginaAtual === 1 ? '0.5' : '1'">
            Anterior
          </button>
          
          <!-- Números das páginas -->
          <div style="display: flex; gap: 2px;">
            <button 
              *ngFor="let p of [].constructor(totalPaginas); let i = index"
              (click)="irParaPagina(i + 1)"
              [style.background]="(i + 1) === paginaAtual ? '#007bff' : '#e9ecef'"
              [style.color]="(i + 1) === paginaAtual ? 'white' : '#495057'"
              style="padding: 8px 12px; border: 1px solid #ccc; border-radius: 4px; cursor: pointer; min-width: 40px;"
              [disabled]="loading">
              {{ i + 1 }}
            </button>
          </div>

          <button 
            (click)="proximaPagina()" 
            [disabled]="paginaAtual === totalPaginas || loading"
            style="padding: 8px 12px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
            [style.opacity]="paginaAtual === totalPaginas ? '0.5' : '1'">
            Próxima
          </button>
          <button 
            (click)="paginaAtual = totalPaginas" 
            [disabled]="paginaAtual === totalPaginas || loading"
            style="padding: 8px 12px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;"
            [style.opacity]="paginaAtual === totalPaginas ? '0.5' : '1'">
            Última
          </button>
        </div>
      </div>
      
      </div>
    </div>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  contato: Contato = {
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
  contatosFiltrados: ContatoAPI[] = [];
  loading = false;
  erro = '';
  editandoId: number | null = null;

  // Paginação
  paginaAtual = 1;
  itensPorPagina = 6;
  totalPaginas = 0;

  // Filtros
  filtroProfissao = '';
  filtroAnoNascimento = '';

  // Campos formatados para exibição
  telefoneFormatado = '';
  celularFormatado = '';

  // Mensagem de sucesso
  mensagemSucesso = '';

  constructor(
    private contatoService: ContatoService,
    private formatacaoService: FormatacaoService
  ) { }

  ngOnInit() {
    this.carregarContatos();
  }

  carregarContatos() {
    this.loading = true;
    this.erro = '';
    
    this.contatoService.listarContatos().subscribe({
      next: (response) => {
        if (response && response.data && response.data.contatos) {
          this.contatos = response.data.contatos;
          this.aplicarFiltros();
        } else {
          this.contatos = [];
          this.contatosFiltrados = [];
        }
        
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.erro = 'Erro ao carregar contatos: ' + (error.message || error);
      }
    });
  }

  salvarContato() {
    if (this.loading) return;
    
    // Validações básicas
    const validacoes = this.validarFormulario();
    if (validacoes.length > 0) {
      this.erro = validacoes.join(' | ');
      return;
    }

    this.loading = true;
    this.erro = '';
    
    const operacao = this.editandoId ? 
      this.contatoService.atualizarContato(this.editandoId, this.contato) :
      this.contatoService.criarContato(this.contato);
    
    operacao.subscribe({
      next: (response) => {
        // Limpar erro e exibir mensagem de sucesso
        this.erro = '';
        this.mensagemSucesso = this.editandoId ? 
          'Contato atualizado com sucesso!' : 
          'Contato cadastrado com sucesso!';
        
        // Limpar mensagem após 5 segundos
        setTimeout(() => {
          this.mensagemSucesso = '';
        }, 5000);
        
        this.resetForm();
        this.carregarContatos();
        this.loading = false;
      },
      error: (error) => {
        let mensagemErro = 'Erro ao salvar contato: ';
        
        if (error.status === 422) {
          if (error.error?.errors) {
            // Laravel validation errors
            const erros = Object.values(error.error.errors).flat();
            mensagemErro += erros.join(', ');
          } else {
            mensagemErro += error.error?.message || 'Dados inválidos';
          }
        } else {
          mensagemErro += error.error?.message || error.message || 'Erro desconhecido';
        }
        
        this.erro = mensagemErro;
        this.loading = false;
      }
    });
  }

  validarFormulario(): string[] {
    const erros: string[] = [];

    // Validar nome
    if (!this.contato.nome || this.contato.nome.trim().length < 2) {
      erros.push('Nome deve ter pelo menos 2 caracteres');
    }

    // Validar email
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    if (!this.contato.email) {
      erros.push('E-mail é obrigatório');
    } else if (!emailRegex.test(this.contato.email)) {
      erros.push('E-mail inválido - deve conter arroba');
    }

    // Validar telefone
    const telefoneRegex = /^[0-9]{10}$/;
    if (!this.contato.telefone_contato) {
      erros.push('Telefone é obrigatório');
    } else if (!telefoneRegex.test(this.contato.telefone_contato)) {
      erros.push('Telefone deve ter exatamente 10 dígitos (DDD + número)');
    }

    // Validar celular
    const celularRegex = /^[0-9]{11}$/;
    if (!this.contato.celular_contato) {
      erros.push('Celular é obrigatório');
    } else if (!celularRegex.test(this.contato.celular_contato)) {
      erros.push('Celular deve ter exatamente 11 dígitos');
    }

    // Validar profissão
    if (!this.contato.profissao || this.contato.profissao.trim().length < 2) {
      erros.push('Profissão deve ter pelo menos 2 caracteres');
    }

    // Validar data de nascimento
    if (!this.contato.data_nascimento) {
      erros.push('Data de nascimento é obrigatória');
    } else {
      // Verificar se a data é válida (não pode ser futura)
      const dataInserida = new Date(this.contato.data_nascimento);
      const hoje = new Date();
      if (dataInserida > hoje) {
        erros.push('Data de nascimento não pode ser futura');
      }
      // Verificar se a data não é muito antiga (antes de 1900)
      const dataMinima = new Date('1900-01-01');
      if (dataInserida < dataMinima) {
        erros.push('Data de nascimento deve ser posterior a 1900');
      }
    }

    return erros;
  }

  excluirContato(id: number) {
    if (confirm('Tem certeza que deseja excluir este contato?')) {
      this.loading = true;
      this.erro = '';
      
      this.contatoService.excluirContato(id).subscribe({
        next: (response) => {
          this.carregarContatos();
          this.loading = false;
        },
        error: (error) => {
          this.erro = 'Erro ao excluir contato: ' + (error.error?.message || error.message || 'Erro desconhecido');
          this.loading = false;
        }
      });
    }
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
    this.telefoneFormatado = '';
    this.celularFormatado = '';
    this.erro = '';
    // NÃO limpar mensagemSucesso aqui para que ela apareça
  }

  formatarData(data: string): string {
    if (!data) return '';
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR');
  }

  trackContatoById(index: number, item: ContatoAPI): any {
    return item.id || index;
  }



  editarContato(contato: ContatoAPI) {
    this.editandoId = contato.id!;
    this.contato = {
      nome: contato.nome,
      data_nascimento: contato.data_nascimento,
      email: contato.email,
      profissao: contato.profissao,
      telefone_contato: contato.telefone_contato,
      celular_contato: contato.celular_contato,
      possuiWhatsapp: false,
      notificacaoEmail: false,
      notificacaoSMS: false
    };
    
    // Sincronizar campos formatados
    this.telefoneFormatado = this.formatacaoService.aplicarMascaraTelefoneFixo(contato.telefone_contato);
    this.celularFormatado = this.formatacaoService.aplicarMascaraCelular(contato.celular_contato);
    
    // Rolar para o topo do formulário
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }

  // Métodos de filtros
  aplicarFiltros() {
    let resultados = [...this.contatos];

    // Filtro por profissão
    if (this.filtroProfissao.trim()) {
      resultados = resultados.filter(contato => 
        contato.profissao.toLowerCase().includes(this.filtroProfissao.toLowerCase())
      );
    }

    // Filtro por ano de nascimento
    if (this.filtroAnoNascimento.trim()) {
      resultados = resultados.filter(contato => 
        contato.data_nascimento.includes(this.filtroAnoNascimento)
      );
    }

    this.contatosFiltrados = resultados;
    this.calcularPaginacao();
  }

  limparFiltros() {
    this.filtroProfissao = '';
    this.filtroAnoNascimento = '';
    this.aplicarFiltros();
  }

  // Métodos de paginação
  calcularPaginacao() {
    this.totalPaginas = Math.ceil(this.contatosFiltrados.length / this.itensPorPagina);
    if (this.paginaAtual > this.totalPaginas) {
      this.paginaAtual = 1;
    }
  }

  get contatosPaginados(): ContatoAPI[] {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    return this.contatosFiltrados.slice(inicio, fim);
  }

  paginaAnterior() {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
    }
  }

  proximaPagina() {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
    }
  }

  irParaPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaAtual = pagina;
    }
  }

  // Métodos de formatação de telefone
  formatarTelefoneExibicao(telefone: string): string {
    return this.formatacaoService.formatarTelefoneFixo(telefone);
  }

  formatarCelularExibicao(celular: string): string {
    return this.formatacaoService.formatarCelular(celular);
  }

  formatarTelefoneInput(event: any) {
    const valor = event.target.value;
    const apenasNumeros = valor.replace(/\D/g, '');
    
    // Limita exatamente a 10 dígitos
    if (apenasNumeros.length > 10) {
      const valorLimitado = apenasNumeros.substring(0, 10);
      this.telefoneFormatado = this.formatacaoService.aplicarMascaraTelefoneFixo(valorLimitado);
      this.contato.telefone_contato = valorLimitado;
      // Força a atualização do valor do input
      event.target.value = this.telefoneFormatado;
    } else {
      this.telefoneFormatado = this.formatacaoService.aplicarMascaraTelefoneFixo(valor);
      this.contato.telefone_contato = apenasNumeros;
    }
  }

  formatarCelularInput(event: any) {
    const valor = event.target.value;
    this.celularFormatado = this.formatacaoService.aplicarMascaraCelular(valor);
    // Atualiza o modelo com apenas números para validação
    this.contato.celular_contato = this.formatacaoService.limparFormatacaoTelefone(valor);
  }

  validarDigitacaoTelefone(event: KeyboardEvent) {
    const valorAtual = (event.target as HTMLInputElement).value;
    const apenasNumeros = valorAtual.replace(/\D/g, '');
    
    // Se já tem 10 dígitos e não é uma tecla de controle (backspace, delete, etc)
    if (apenasNumeros.length >= 10 && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(event.key)) {
      event.preventDefault();
    }
    
    // Permite apenas números
    if (!/[0-9]/.test(event.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(event.key)) {
      event.preventDefault();
    }
  }

}