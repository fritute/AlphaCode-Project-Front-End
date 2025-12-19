import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatacaoService {

  constructor() { }

  /**
   * Formatar telefone fixo (8 ou 10 dígitos) para o formato (11)4002-8922
   * @param telefone - string com 8 ou 10 dígitos
   * @param ddd - string com 2 dígitos do DDD (padrão: '11') - usado apenas se telefone tem 8 dígitos
   * @returns string formatada ou telefone original se inválido
   */
  formatarTelefoneFixo(telefone: string, ddd: string = '11'): string {
    if (!telefone) return '';
    
    // Remove todos os caracteres não numéricos
    const apenasNumeros = telefone.replace(/\D/g, '');
    
    // Verifica se tem exatamente 10 dígitos (DDD + telefone)
    if (apenasNumeros.length === 10) {
      // Formato: (11) 4002-8922
      return `(${apenasNumeros.substring(0, 2)}) ${apenasNumeros.substring(2, 6)}-${apenasNumeros.substring(6)}`;
    }
    
    // Verifica se tem exatamente 8 dígitos para telefone fixo (retrocompatibilidade)
    if (apenasNumeros.length === 8) {
      // Formato: (11) 4002-8922
      return `(${ddd}) ${apenasNumeros.substring(0, 4)}-${apenasNumeros.substring(4)}`;
    }
    
    // Se não tem 8 ou 10 dígitos, retorna o valor original
    return telefone;
  }

  /**
   * Formatar celular (11 dígitos) para o formato (11)98704-6715
   * @param celular - string com 11 dígitos (DDD + 9 dígitos)
   * @returns string formatada ou celular original se inválido
   */
  formatarCelular(celular: string): string {
    if (!celular) return '';
    
    // Remove todos os caracteres não numéricos
    const apenasNumeros = celular.replace(/\D/g, '');
    
    // Verifica se tem exatamente 11 dígitos para celular
    if (apenasNumeros.length === 11) {
      // Formato: (11)98704-6715
      const ddd = apenasNumeros.substring(0, 2);
      const primeiraParte = apenasNumeros.substring(2, 7); // 5 dígitos (9xxxx)
      const segundaParte = apenasNumeros.substring(7); // 4 dígitos
      
      return `(${ddd})${primeiraParte}-${segundaParte}`;
    }
    
    // Se não tem 11 dígitos, retorna o valor original
    return celular;
  }

  /**
   * Remove formatação de telefone, deixando apenas números
   * @param telefone - string com ou sem formatação
   * @returns string apenas com números
   */
  limparFormatacaoTelefone(telefone: string): string {
    if (!telefone) return '';
    return telefone.replace(/\D/g, '');
  }

  /**
   * Aplicar máscara durante a digitação do telefone fixo (com DDD)
   * @param valor - valor atual do input
   * @returns valor formatado para exibição
   */
  aplicarMascaraTelefoneFixo(valor: string): string {
    if (!valor) return '';
    
    // Remove tudo que não é número
    let apenasNumeros = valor.replace(/\D/g, '');
    
    // Limita a 10 dígitos (DDD + 8 dígitos do telefone)
    apenasNumeros = apenasNumeros.substring(0, 10);
    
    if (apenasNumeros.length === 0) return '';
    if (apenasNumeros.length <= 2) return `(${apenasNumeros}`;
    if (apenasNumeros.length <= 6) return `(${apenasNumeros.substring(0, 2)}) ${apenasNumeros.substring(2)}`;
    
    return `(${apenasNumeros.substring(0, 2)}) ${apenasNumeros.substring(2, 6)}-${apenasNumeros.substring(6)}`;
  }

  /**
   * Aplicar máscara durante a digitação do celular
   * @param valor - valor atual do input
   * @returns valor formatado para exibição
   */
  aplicarMascaraCelular(valor: string): string {
    if (!valor) return '';
    
    // Remove tudo que não é número
    let apenasNumeros = valor.replace(/\D/g, '');
    
    // Limita a 11 dígitos
    apenasNumeros = apenasNumeros.substring(0, 11);
    
    if (apenasNumeros.length === 0) return '';
    if (apenasNumeros.length <= 2) return `(${apenasNumeros}`;
    if (apenasNumeros.length <= 7) return `(${apenasNumeros.substring(0, 2)})${apenasNumeros.substring(2)}`;
    
    return `(${apenasNumeros.substring(0, 2)})${apenasNumeros.substring(2, 7)}-${apenasNumeros.substring(7)}`;
  }
}