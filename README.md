# Sistema de Gerenciamento de Contatos - AlphaCode

Sistema completo de gerenciamento de contatos desenvolvido em Angular com integração a API PHP. Permite criar, visualizar, editar e excluir contatos com interface moderna e responsiva.

## 📋 Sobre o Projeto

Este sistema oferece uma solução completa para gerenciamento de contatos com as seguintes funcionalidades:

- ✅ **CRUD Completo** - Criar, visualizar, editar e excluir contatos
- ✅ **Paginação** - Visualização de 6 contatos por página
- ✅ **Filtros Avançados** - Filtrar por profissão e ano de nascimento
- ✅ **Validação de Formulários** - Validações em tempo real nos campos
- ✅ **Interface Responsiva** - Design adaptável para desktop e mobile
- ✅ **Integração com API** - Comunicação completa com backend PHP

## 🚀 Tecnologias Utilizadas

- **Angular 18** - Framework frontend
- **TypeScript** - Linguagem de programação
- **SCSS** - Pré-processador CSS
- **RxJS** - Programação reativa
- **HttpClient** - Comunicação com API
- **FormsModule** - Formulários reativos
- **Bootstrap** - Componentes e grid responsivo

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── components/          # Componentes reutilizáveis
│   ├── pages/
│   │   └── home/           # Página principal com formulário e tabela
│   ├── services/
│   │   ├── contato.service.ts    # Service para API de contatos
│   │   └── user.service.ts       # Service para usuários
│   ├── models/
│   │   └── user.model.ts         # Interface do modelo de usuário
│   ├── shared/
│   │   └── components/
│   │       └── loading/          # Componente de loading
│   ├── app.component.*           # Componente raiz
│   ├── app.config.ts            # Configuração da aplicação
│   └── app.routes.ts            # Configuração de rotas
├── assets/
│   ├── editar.png              # Ícone para botão editar
│   ├── excluir.png             # Ícone para botão excluir
│   └── logo.png                # Logo da aplicação
└── environments/               # Configurações de ambiente
```

## 🔌 Pré-requisitos - Backend API

Para o funcionamento completo da aplicação, é necessário ter um backend PHP rodando com as seguintes especificações:

### API Endpoints Necessários:
- **GET** `/api/contatos` - Listar contatos
- **POST** `/api/contatos` - Criar novo contato
- **PUT** `/api/contatos/{id}` - Atualizar contato
- **DELETE** `/api/contatos/{id}` - Excluir contato

### Estrutura de Dados:
```json
{
  "success": true,
  "data": {
    "contatos": [
      {
        "id": 1,
        "nome": "João Silva",
        "email": "joao@email.com",
        "data_nascimento": "1990-05-15",
        "profissao": "Desenvolvedor",
        "telefone_contato": "11999999999",
        "celular_contato": "11888888888"
      }
    ],
    "total": 1
  }
}
```

### URL da API:
- **Desenvolvimento**: `http://localhost:8000/api/contatos`

## 🛠️ Instalação e Configuração

### Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **npm** (versão 9 ou superior)
- **Backend PHP** com API de contatos funcionando em `http://localhost:8000`

### Passos para instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd front-end
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure o ambiente**
   - Certifique-se que o backend PHP está rodando em `http://localhost:8000`
   - Verifique se a API está respondendo em `/api/contatos`

4. **Execute o projeto**
   ```bash
   npm start ou ng serve
   ```

5. **Acesse a aplicação**
   - Aplicação: `http://localhost:4200`
   - API Backend: `http://localhost:8000/api/contatos`

## 📝 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento na porta 4201
- `npm run build` - Cria o build de produção
- `npm test` - Executa os testes unitários
- `npm run lint` - Executa a verificação de código

## 🎯 Funcionalidades Principais

### 📝 Formulário de Contatos
- Campos: Nome, E-mail, Data de Nascimento, Profissão, Telefone, Celular
- Validações em tempo real
- Máscaras para telefone e data
- Suporte a digitação manual ou seleção por calendário

### 📊 Tabela de Contatos
- Paginação com 6 registros por página
- Botões de navegação (Primeira, Anterior, Próxima, Última)
- Ações de editar e excluir com ícones personalizados
- Design responsivo

### 🔍 Sistema de Filtros
- Filtro por profissão (dropdown)
- Filtro por ano de nascimento (input)
- Aplicação automática dos filtros
- Combinação de múltiplos filtros

### ✅ Validações Implementadas
- **E-mail**: Formato válido com @
- **Campos obrigatórios**: Nome, e-mail, data de nascimento
- **Data**: Formato DD/MM/AAAA
- **Telefone**: Formato brasileiro com máscara

## 🎨 Interface do Usuário

- **Header**: Logo e título da aplicação
- **Formulário**: Interface limpa e intuitiva
- **Tabela**: Design profissional com ações por linha
- **Paginação**: Controles claros e funcionais
- **Filtros**: Posicionamento estratégico acima da tabela
- **Responsividade**: Adaptação para dispositivos móveis

## 🔧 Configurações Personalizáveis

### Paginação
```typescript
// Alterar número de itens por página
itensPorPagina: number = 6; // Modificar em home.component.ts
```

### URL da API
```typescript
// Alterar URL do backend
private apiUrl = 'http://localhost:8000/api/contatos'; // Modificar em contato.service.ts
```

## 🧪 Testando a Aplicação

1. **Teste de Criação**:
   - Preencha todos os campos do formulário
   - Clique em "Cadastrar"
   - Verifique se o contato aparece na tabela

2. **Teste de Edição**:
   - Clique no ícone de editar de um contato
   - Modifique os dados no formulário
   - Clique em "Atualizar"

3. **Teste de Exclusão**:
   - Clique no ícone de excluir
   - Confirme a exclusão
   - Verifique se o contato foi removido

4. **Teste de Filtros**:
   - Use o filtro por profissão
   - Use o filtro por ano de nascimento
   - Teste a combinação de filtros

## 🚨 Solução de Problemas

### Erro de CORS
Se encontrar problemas de CORS, configure o backend PHP para aceitar requisições do frontend:
```php
header("Access-Control-Allow-Origin: http://localhost:4201");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
```

### API não responde
- Verifique se o backend PHP está rodando em `http://localhost:8000`
- Teste a API diretamente no navegador: `http://localhost:8000/api/contatos`
- Verifique os logs do console do navegador (F12)

### Problemas de Validação
- Campos obrigatórios aparecem em vermelho quando vazios
- E-mail deve conter @ para ser válido
- Data deve estar no formato DD/MM/AAAA

## 📦 Build para Produção

```bash
npm run build
```

Os arquivos de produção serão criados no diretório `dist/`.

### Configurações de Produção
- Configure a URL da API de produção em `environment.prod.ts`
- Otimize as imagens em `assets/`
- Configure HTTPS se necessário


## 📞 Suporte Técnico

Para suporte técnico:
- **E-mail**: suporte@alphacode.com.br
- **Documentação**: Consulte este README
- **Issues**: Abra uma issue no repositório
