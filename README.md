# Sistema de Controle de Licenças de Acesso

![Angular](https://img.shields.io/badge/Angular-19-DD0031?logo=angular)
![PrimeNG](https://img.shields.io/badge/PrimeNG-14.0.0-1976D2?logo=prime)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-06B6D4?logo=tailwind-css)

Sistema CRUD com controle de acesso baseado em licenças dinâmicas e fixas, desenvolvido com Angular 19, PrimeNG e TailwindCSS.

## 📌 Visão Geral

Este projeto implementa um sistema de controle de acesso com dois tipos de usuários:
- **Licença Fixa**: Acesso ilimitado
- **Licença Dinâmica**: Acesso controlado por limites diários

## ✨ Funcionalidades

- Cadastro de usuários (CRUD completo)
- Controle de login com regras de licenciamento
- Visualização em tempo real de licenças utilizadas
- Interface responsiva e moderna
- Armazenamento local (localStorage)

## 📚 Documentação Técnica

### Estrutura do Projeto
src/<br>
├── app/<br>
│ ├── components/<br>
│ │ ├── login/ # Componente de login<br>
│ │ └── register/ # Componente de registro<br>
│ ├── services/<br>
│ │ └── license.service.ts # Lógica de controle de licenças<br>
│ └── validators/ # Validadores customizados<br>
├── assets/ # Recursos estáticos<br>
└── styles/ # Estilos globais<br>


### Regras de Negócio

1. **Licenças Fixas**:
   - Acesso ilimitado
   - Sem restrições de login

2. **Licenças Dinâmicas**:
   - Máximo de 10 usuários distintos por dia (configurável)
   - Cada usuário pode fazer múltiplos logins no mesmo dia (contando como 1 licença)
   - Bloqueio automático quando o limite é atingido

### Diagrama de Fluxo

```mermaid
graph TD
    A[Login] --> B{Licença Fixa?}
    B -->|Sim| C[Acesso Liberado]
    B -->|Não| D{Novo Usuário Hoje?}
    D -->|Sim| E[Acesso Liberado]
    D -->|Não| F{Limite Atingido?}
    F -->|Não| G[Registra Login]
    F -->|Sim| H[Acesso Negado]
```

🚀 Como Executar
Pré-requisitos
Node.js 18+

Angular CLI 19+

1. Instalação
Clone o repositório:

```ruby
git clone https://github.com/seu-usuario/controle-licencas.git
```
cd controle-licencas

2. Instale as dependências:

```ruby
rubynpm install
```

3. Execute a aplicação:

bash
```ruby
ng serve
```

4. Acesse no navegador:

http://localhost:4200

🛠️ Configurações
Edite o arquivo src/app/services/license.service.ts para ajustar:
```ruby
private readonly MAX_DYNAMIC_LICENSES = 10; // Altere o limite máximo
private readonly LOGIN_HISTORY_KEY = 'loginHistory'; // Chave do localStorage
```
# Documentação breve
🔐 Armazenamento
users: Lista de usuários cadastrados

loginHistory: Registro de logins diários

loggedInUser: Usuário atualmente logado

🎨 Componentes
LoginComponent
Valida credenciais

Aplica regras de licenciamento

Redireciona para registro após login

RegisterComponent
CRUD completo de usuários

Visualização de licenças utilizadas

Validação de formulários
<div align="center"> <sub>Desenvolvido com ❤️ por Sarolanda</sub> </div> 
