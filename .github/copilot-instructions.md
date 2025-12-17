# Instruções para o GitHub Copilot

Este projeto é um frontend Angular com a seguinte estrutura organizacional:

## Tecnologias Utilizadas
- Angular 17 com Standalone Components
- TypeScript
- SCSS para estilos
- RxJS para programação reativa

## Estrutura do Projeto
- `src/app/components/` - Componentes reutilizáveis
- `src/app/pages/` - Páginas da aplicação
- `src/app/services/` - Serviços para lógica de negócio
- `src/app/models/` - Interfaces e tipos TypeScript
- `src/app/shared/` - Componentes e módulos compartilhados

## Convenções de Código
- Use Standalone Components (sem NgModule)
- Prefira imports diretos do Angular
- Use SCSS para estilos componetizados
- Implemente interfaces para tipagem forte
- Use observables para dados assíncronos

## Scripts Disponíveis
- `npm start` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm test` - Testes unitários
- `npm run lint` - Verificação de código

Projeto criado e configurado com sucesso!