# Frontend Pousada Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir um frontend React/Vite com vitrine pública da pousada e área administrativa básica integrada ao backend existente.

**Architecture:** O repositório manterá o backend atual na raiz e receberá uma nova pasta `frontend/` para deploy independente. O frontend usará React Router para separar área pública e administrativa, Axios para integração com a API, armazenamento local do JWT e componentes reaproveitáveis para formulários, tabelas e feedback de estado.

**Tech Stack:** React, Vite, React Router DOM, Axios, Vitest, Testing Library

---

### Task 1: Bootstrap do frontend

**Files:**
- Create: `frontend/*`
- Modify: `frontend/package.json`
- Test: `frontend/src/test/setup.js`

- [ ] Gerar a base Vite React para o frontend.
- [ ] Instalar dependências de app e teste.
- [ ] Configurar Vitest com ambiente jsdom e setup da Testing Library.

### Task 2: Camada de API e autenticação

**Files:**
- Create: `frontend/src/lib/api.js`
- Create: `frontend/src/lib/auth.js`
- Test: `frontend/src/lib/auth.test.js`

- [ ] Escrever testes de armazenamento e leitura do token.
- [ ] Implementar utilitários mínimos e interceptação de headers.

### Task 3: Estrutura visual e rotas

**Files:**
- Create: `frontend/src/App.jsx`
- Create: `frontend/src/layouts/*`
- Create: `frontend/src/pages/*`
- Test: `frontend/src/App.test.jsx`

- [ ] Escrever testes das rotas principais pública e protegida.
- [ ] Implementar layouts, navegação e guarda de rota.

### Task 4: Área pública

**Files:**
- Create: `frontend/src/features/public/*`
- Test: `frontend/src/features/public/*.test.jsx`

- [ ] Escrever testes para renderização de quartos e estados de carregamento/erro.
- [ ] Implementar home e seção de quartos consumindo `GET /api/quartos`.

### Task 5: Área administrativa

**Files:**
- Create: `frontend/src/features/admin/*`
- Test: `frontend/src/features/admin/*.test.jsx`

- [ ] Escrever testes para login, dashboard e formulários principais.
- [ ] Implementar login, listagens e cadastros de quartos, reservas, serviços e crachás.

### Task 6: Finalização para deploy

**Files:**
- Create: `frontend/.env.example`
- Modify: `README` ou documentação mínima se necessário
- Test: build do Vite

- [ ] Ajustar `VITE_API_URL`, estados de erro e mensagens de deploy.
- [ ] Validar testes e build.
- [ ] Subir localmente para revisão do usuário.
