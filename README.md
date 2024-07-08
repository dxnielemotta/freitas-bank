# Freitas Bank

Este projeto é um sistema bancário comunitário desenvolvido utilizando Nest.js e TypeScript. Ele permite a gestão de clientes, contas bancárias e operações financeiras básicas.

## Funcionalidades

- Cadastro e gestão de clientes
- Criação de contas corrente e poupança
- Depósitos, saques e transferências entre contas
- Mudança de tipo de conta (corrente <-> poupança)
- Fechamento de contas

## Pré-requisitos

- Node.js (v14+)
- npm 

## Instalação

1. Clone o repositório:
 ```bash
   git clone https://github.com/dxnielemotta/freitas-bank.git
 ````
2. Entre no repositório:
```bash
   cd freitas-bank
 ````
3. Instale as dependências:
 ```bash
   npm install
 ````
4. Execute o projeto:
```bash
  npm run start:dev
```

## Testando no Insomnia
1. Abra o Insomnia
2. Importe a configuração:
   - Clique em Create
   - Selecione Import.
   - Navegue até a pasta onde você fez o clone do projeto. Selecione o arquivo insomnia.json.
   - Isso irá importar todas as rotas configuradas para que você possa começar a testar.

## Testes
   ### Clientes

- **Listar Clientes:**
  - `GET /clientes`
  
- **Obter Cliente por ID:**
  - `GET /clientes/:id`
  
- **Cadastrar Cliente:**
  - `POST /clientes/cadastrar`
  
- **Criar Conta Corrente:**
  - `POST /clientes/:clienteID/corrente`
  
- **Criar Conta Poupança:**
  - `POST /clientes/:clienteID/poupanca`
  
- **Mudar Tipo de Conta:**
  - `PUT /clientes/:id/mudar`
  
- **Fechar Conta:**
  - `DELETE /clientes/:id/excluir/:contaID`
### Contas

- **Criar Conta Corrente:**
  - `POST /contas/:clienteID/corrente`
  
- **Criar Conta Poupança:**
  - `POST /contas/:clienteID/poupanca`

### Gerentes

- **Listar Gerentes:**
  - `GET /gerentes`
  
- **Criar Gerente:**
  - `POST /gerentes`
  
- **Adicionar Cliente:**
  - `POST /gerentes/:id/clientes`
  
- **Mudar Tipo de Conta:**
  - `PUT /gerentes/:id/mudar/:clienteID`
  
- **Fechar Conta:**
  - `DELETE /gerentes/:id/excluir/:clienteID/:contaID`
