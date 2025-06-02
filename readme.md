# Teste Técnico Dev Full Stack – Sistema de Tarefas

## Descrição

Sistema simples de gerenciamento de tarefas (to-do list) com autenticação de usuários. Cada usuário pode criar, listar, atualizar e excluir **suas próprias tarefas**.

- **Backend:** Laravel 12 (API REST, JWT)
- **Frontend:** AngularJS 1.6.9
- **Banco:** MySQL
- **Autenticação:** JWT

## Como rodar o projeto

### Pré-requisitos

- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) instalados.

### Passos

1. **Clone o repositório:**
   ```sh
   git clone git@github.com:0Duarte/multipedidos_teste_tecnico.git
   ```

---
2. **Na pasta raiz, suba os containers:**
   ```sh
   docker-compose up -d
   ```

3. **Configure o ambiente do backend:**
   - Copie o arquivo de variáveis de ambiente:
     ```sh
     cp backend/.env.example backend/.env
     ```

4. **Rode as migrations e seeders:**
   ```sh
   docker-compose exec app php artisan migrate --seed --force
   ```
   > Isso irá criar as tabelas e um usuário de teste:  
   > **E-mail:** test@example.com  
   > **Senha:** password


5. **Acesse a aplicação e garanta que as portas abaixo estejam disponíveis:**
   - **Frontend:** [http://localhost:3000](http://localhost:3000)
   - **Backend (API):** [http://localhost:8000](http://localhost:8000)

6. **Rodando os testes do backend:**
   ```sh
   docker-compose exec app php artisan test
   ```

## Variáveis de ambiente

As principais variáveis já estão configuradas em `backend/.env.example`.  

## Exemplos de requisições

Na pasta raiz encontra-se uma collection exportada do Insomnia .yaml para testar a API contendo todas as rotas. Fique a vontade para utilizar em seu client http de preferência.

## Estrutura do Projeto

- `backend/` – Código Laravel (API)
- `frontend/` – Código AngularJS 1.6.9
- `docker-compose.yml` – Arquivo de configuração dos containers Docker
- `multipedidos_teste_tecnico_insomnia.yaml` – Collection de requisições HTTP para Insomnia


## Diferenciais implementados

- Docker e Docker Compose para facilitar a execução local.
- Seeders e factories para dados de teste.
- O projeto foi criado utilizando as boas práticas do Laravel (ex arquivo de Requests, e validations para tratamento) e usando arquitetura de camadas com Controller, Service e Respository.

---
