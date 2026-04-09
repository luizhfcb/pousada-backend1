# Equipe e Crachás Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar gestão administrativa de funcionários e visualização útil de crachás emitidos no painel.

**Architecture:** O backend ganhará rotas administrativas protegidas para listar, criar, editar e remover funcionários, além de listar crachás com dados do usuário. O frontend passará a carregar essas coleções e exibirá duas áreas novas no painel: equipe com CRUD e crachás com emissão e listagem.

**Tech Stack:** Node.js, Express, Mongoose, React, Vite, Vitest, node:test

---
