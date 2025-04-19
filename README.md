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
src/
├── app/
│ ├── components/
│ │ ├── login/ # Componente de login
│ │ └── register/ # Componente de registro
│ ├── services/
│ │ └── license.service.ts # Lógica de controle de licenças
│ └── validators/ # Validadores customizados
├── assets/ # Recursos estáticos
└── styles/ # Estilos globais


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

