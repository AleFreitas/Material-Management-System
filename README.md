# Sistema de Gerenciamento de Biblioteca - API

Este projeto, parte da disciplina de Banco de Dados da Universidade de Brasília (UnB), consiste em uma API para gerenciamento de bibliotecas focada em simplificar operações de cadastro, empréstimo e gestão de livros e materiais.

## Funcionalidades

A API de Gerenciamento de Biblioteca oferece uma série de funcionalidades essenciais, incluindo:

- Gerenciamento de Livros: Permite criar, atualizar, excluir e consultar livros no acervo da biblioteca.

- Gerenciamento de Materiais: Similar ao gerenciamento de livros, mas focado em outros materiais disponíveis na biblioteca.

- Administração de Usuários: Facilita a criação e o gerenciamento de contas de usuários, incluindo funções de login e cadastro.

- Controle de Empréstimos: Permite aos usuários solicitar, renovar e finalizar empréstimos de itens da biblioteca.

- Cadastro e Gerenciamento de Autores: Oferece funcionalidades para adicionar, atualizar e remover autores associados aos livros.

- Relacionamento entre Autores e Livros: Possibilita a criação e exclusão de relações entre autores e livros, enriquecendo a informação disponível sobre cada livro.

- Criação de Categorias: Permite classificar livros e materiais em diferentes categorias, facilitando a organização e a busca.

- Consultas Diversas: Inclui funcionalidades para resgatar informações sobre todos os livros ou materiais cadastrados, assim como a busca de itens específicos por identificadores únicos.

## Queries SQL

Todas as queries estão no diretório `src/repositories/` e estão divididas em `loan-repository.ts`, `material-repository.ts`, `session-repository` e `user-repository.ts`

## Tecnologias Utilizadas
- Typescript <a href="#"><code><img height="30" src="https://github.com/devicons/devicon/blob/master/icons/typescript/typescript-original.svg"></code></a>
- Node.js <a href="#"><code><img height="30" src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original.svg"></code></a>
- Express <a href="#"><code><img height="30" src="https://github.com/devicons/devicon/blob/master/icons/express/express-original.svg"></code></a>
- PostgreSQL <a href="#"><code><img height="30" src="https://github.com/devicons/devicon/blob/master/icons/postgresql/postgresql-original.svg"></code></a>

## Como Executar

1. Clone o repositório
2. Instale as dependências com
   ```bash
   npm install
   ```
3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

   ```Node
   DATABASE_URL = ...
   NODE_ENV = ...
   JWT_SECRET = ...
   PORT = (opcional)
   ```
4. Caso queira ter o banco de dados localmente temos um script de criação e população de banco no projeto (lembre de adicionar o url do banco local no `.env`)
5. Fizemos um deploy do banco de dados em uma plataforma gratuita [ElephantSQL](https://www.elephantsql.com/), se quiser utilizar basta adicionar a url no `.env`
   ```Node
   DATABASE_URL = postgres://xuhtelmv:UZ-WkdrlM-wYbsO3098pkWDI1yC8e9k6@silly.db.elephantsql.com/xuhtelmv
   ```
6. Execute o comando para iniciar o servidor
   ```bash
      npm run dev
   ```
7. Acesse o servidor em `localhost:5005` (caso tenha adicionado um PORT no .env troque o 5005 pela porta escolhida)
8. Há um arquivo `Postman.json` na raiz do projeto com todas as rotas da API para facilitar o teste. Basta importar o arquivo no Postman e executar as requisições.

## ARQUITETURA
A arquitetura implementada neste projeto foi a arquitetura de tres camadas adaptada ao contexto do desafio que era de uma api. Uma camada extra de ORM poderia ser adicionada para desacoplar ainda mais o sistema e isolar as regras de negócio do banco mas devido ao objetivo do trabalho o uso de uma ORM foi descartado e sendo assim a própria camada de negócio (API) implementa o código das queries necessárias

![image](https://github.com/AleFreitas/Material-Management-System/assets/83618808/f18220b4-c82b-4514-9122-a5b35eb7da4c)


## ROTAS DA API


1. Livros
   
   a. Criar Livro
      - Método: POST
      - Endpoint: /book
      - Nível de Acesso: chefe de laboratório ou administrador
      - Corpo da Requisição:
        ```json
        {
           "isbn": "string (número ISBN do livro)",
           "descricao": "string (descrição detalhada do livro)",
           "data_aquisicao": "string (data de aquisição no formato YYYY-MM-DD)",
           "conservacao": "string (estado de conservação do livro)",
           "localizacao": "string (localização física do livro)",
           "quantidade": "number (quantidade disponível)",
           "titulo": "string (título do livro)",
           "url_capa": "string (URL da imagem da capa do livro)"
        }
        ```
      - Retorno Esperado: Confirmação de criação com detalhes do livro adicionado.

   b. Atualizar Livro
      - Método: PUT
      - Endpoint: /book/:isbn
      - Nível de Acesso: chefe de laboratório ou administrador
      - Corpo da Requisição (Opcional):
        ```json
        {
           "isbn": "string (opcional, novo número ISBN do livro)",
           "descricao": "string (opcional, nova descrição do livro)",
           "data_aquisicao": "string (opcional, nova data de aquisição no formato YYYY-MM-DD)",
           "conservacao": "string (opcional, novo estado de conservação do livro)",
           "localizacao": "string (opcional, nova localização física do livro)",
           "quantidade": "number (opcional, nova quantidade disponível)",
           "titulo": "string (opcional, novo título do livro)",
           "url_capa": "string (opcional, nova URL da imagem da capa do livro)"
        }
        ```
      - Retorno Esperado: Confirmação de atualização com detalhes do livro atualizado.
   c. Excluir Livro
      - Método: DELETE
      - Endpoint: /book/:isbn
      - Nível de Acesso: chefe de laboratório ou administrador
      - Retorno Esperado: Confirmação da exclusão do livro.

   d. Resgatar todos os Livros
      - Método: GET
      - Endpoint: /book
      - Nível de Acesso: todos
      - Retorno Esperado: Lista de todos os livros cadastrados com seus respectivos detalhes.

   e. Resgatar Livro por ISBN
      - Método: GET
      - Endpoint: /book/:isbn
      - Nível de Acesso: todos
      - Retorno Esperado: Detalhes do livro correspondente ao ISBN fornecido.

   f. Resgatar Livros por Autor
      - Método: GET
      - Endpoint: /book/author/:authorId
      - Nível de Acesso: todos
      - Retorno Esperado: Lista de todos os livros escritos pelo autor.

   g. Resgatar Livros por Categoria
      - Método: GET
      - Endpoint: /book/category/:categoryId
      - Nível de Acesso: todos
      - Retorno Esperado: Lista de todos os livros de certa categoria.

2. Materiais
   
   a. Criar Material
      - Método: POST
      - Endpoint: /material
      - Nível de Acesso: chefe de laboratório ou administrador
      - Corpo da Requisição:
        ```json
        {
           "conservacao": "string (estado de conservação do material)",
           "localizacao": "string (localização física do material)",
           "quantidade": "number (quantidade disponível)",
           "desc": "string (descrição detalhada do material)",
           "data_Aquisicao": "string (data de aquisição no formato YYYY-MM-DD)",
           "serial": "string (número de série do material)",
           "url_imagem": "string (URL da imagem do material)",
           "id_categoria_material": "number (identificador da categoria do material)"
        }
        ```
      - Retorno Esperado: Confirmação de criação com detalhes do material adicionado.

   b. Atualizar Material
      - Método: PUT
      - Endpoint: /material/:id
      - Nível de Acesso: chefe de laboratório ou administrador
      - Corpo da Requisição (Opcional):
        ```json
        {
           "id": "number (identificador único do material)",
           "desc": "string (opcional, nova descrição do material)",
           "data_Aquisicao": "string (opcional, nova data de aquisição no formato YYYY-MM-DD)",
           "conservacao": "string (opcional, novo estado de conservação do material)",
           "localizacao": "string (opcional, nova localização física do material)",
           "quantidade": "number (opcional, nova quantidade disponível)",
           "serial": "string (opcional, novo número de série do material)",
           "url_imagem": "string (opcional, nova URL da imagem do material)",
           "id_categoria_material": "number (opcional, novo identificador da categoria do material)"
        }
        ```
      - Retorno Esperado: Confirmação de atualização com detalhes do material atualizado.

   c. Excluir Material
      - Método: DELETE
      - Endpoint: /material/:id
      - Nível de Acesso: chefe de laboratório ou administrador
      - Retorno Esperado: Confirmação da exclusão do material.

   d. Resgatar todos os Materiais
      - Método: GET
      - Endpoint: /material
      - Nível de Acesso: todos
      - Retorno Esperado: Lista de todos os materiais cadastrados com seus respectivos detalhes.

   e. Resgatar Material por ID
      - Método: GET
      - Endpoint: /material/:id
      - Nível de Acesso: todos
      - Retorno Esperado: Detalhes do material correspondente ao ID fornecido.
        
   g. Resgatar Materiais por Categoria
      - Método: GET
      - Endpoint: /material/category/:categoryId
      - Nível de Acesso: todos
      - Retorno Esperado: Lista de todos os materiais de certa categoria.


3. Usuários

   a. Criar Usuário
      - Método: POST
      - Endpoint: /sign-up
      - Nível de Acesso: chefe de laboratório ou administrador
      - Corpo da Requisição:
        ```json
        {
           "nome": "string (nome do usuário)",
           "sobrenome": "string (sobrenome do usuário)",
           "funcao": "string (função do usuário na organização)",
           "email": "string email (endereço de email do usuário)",
           "senha": "string (senha para acesso)",
           "url_imagem": "string (URL da imagem do perfil do usuário)"
        }
        ```
      - Retorno Esperado: Confirmação de criação com detalhes do usuário adicionado.

   b. Fazer Login
      - Método: POST
      - Endpoint: /sign-in
      - Nível de Acesso: nenhuma
      - Corpo da Requisição:
        ```json
        {
           "email": "string email (endereço de email do usuário)",
           "senha": "string (senha para acesso)"
        }
        ```
      - Retorno da Requisição:
        ```json
        {
           "token": "string (token de autenticação)"
        }
        ```
   
   c. Resgatar informações de Usuário
      - Método: GET
      - Endpoint: /user/:id
      - Nível de Acesso: usuário comum
      - Corpo da Requisição: VAZIO
      - Retorno Esperado: Detalhes do usuário correspondente ao ID fornecido.
   
   d. Resgatar Empréstimos do Usuário
      - Método: GET
      - Endpoint: /user/:id/loan
      - Nível de Acesso: usuário comum
      - Corpo da Requisição: VAZIO
      - Retorno Esperado: Lista de todos os empréstimos do usuário correspondente ao ID fornecido.
   
   e. Resgatar Livros do Usuário
      - Método: GET
      - Endpoint: /user/:id/book
      - Nível de Acesso: usuário comum
      - Corpo da Requisição: VAZIO
      - Retorno Esperado: Lista de todos os livros emprestados pelo usuário correspondente ao ID fornecido.
   
   f. Resgatar Materiais do Usuário
      - Método: GET
      - Endpoint: /user/:id/material
      - Nível de Acesso: usuário comum
      - Corpo da Requisição: VAZIO
      - Retorno Esperado: Lista de todos os materiais emprestados pelo usuário correspondente ao ID fornecido.
        
4. Empréstimos
   
   a. Solicitar Empréstimo
      - Método: POST
      - Endpoint: /loan/:itemId
      - Nível de Acesso: usuário comum
      - Corpo da Requisição: VAZIO
      - Retorno Esperado: Confirmação do empréstimo com detalhes do item emprestado.

   b. Finalizar Empréstimo
      - Método: DELETE
      - Endpoint: /loan/:itemId
      - Nível de Acesso: usuário comum
      - Corpo da Requisição: VAZIO
      - Retorno Esperado: Confirmação da finalização do empréstimo.

   c. Renovar Empréstimo
      - Método: PUT
      - Endpoint: /loan/:itemId
      - Nível de Acesso: usuário comum
      - Corpo da Requisição:
        ```json
        {
           "new_date": "string (nova data de devolução no formato YYYY-MM-DD)"
        }
        ```
      - Retorno Esperado: Confirmação da renovação do empréstimo com nova data de devolução.

   d. Resgatar todos os Empréstimos ativos
      - Método: GET
      - Endpoint: /loan
      - Nível de Acesso: todos
      - Corpo da Requisição: VAZIO
      - Retorno Esperado: Lista de todos os empréstimos cadastrados com seus respectivos detalhes.
   
   e. Resgatar todos os Empréstimos ativos de livros
      - Método: GET
      - Endpoint: /loan/book
      - Nível de Acesso: todos
      - Corpo da Requisição: VAZIO
      - Retorno Esperado: Lista de todos os empréstimos de livros cadastrados com seus respectivos detalhes.

   f. Resgatar todos os Empréstimos ativos de materiais ativos
      - Método: GET
      - Endpoint: /loan/material
      - Nível de Acesso: todos
      - Corpo da Requisição: VAZIO
      - Retorno Esperado: Lista de todos os empréstimos de materiais cadastrados com seus respectivos detalhes.

5. Autores
   
   a. Cadastrar Autor
      - Método: POST
      - Endpoint: /author
      - Nível de Acesso: chefe de laboratório ou administrador
      - Corpo da Requisição:
        ```json
        {
           "nome": "string (nome do autor)",
           "sobrenome": "string (sobrenome do autor)",
           "email": "string email (endereço de email do autor)"
        }
        ```
      - Retorno Esperado: Confirmação de criação com detalhes do autor adicionado.

   b. Atualizar dados de Autor
      - Método: PUT
      - Endpoint: /author/:id
      - Nível de Acesso: chefe de laboratório ou administrador
      - Corpo da Requisição:
        ```json
        {
           "nome": "string (novo nome do autor)",
           "sobrenome": "string (novo sobrenome do autor)",
           "email": "string email (novo endereço de email do autor)"
        }
        ```
      - Retorno Esperado: Confirmação de atualização com detalhes do autor atualizado.

   c. Deletar Autor
      - Método: DELETE
      - Endpoint: /author/:id
      - Nível de Acesso: chefe de laboratório ou administrador
      - Corpo da Requisição: VAZIO
      - Retorno Esperado: Confirmação da exclusão do autor.
   
   d. Resgatar todos os Autores
      - Método: GET
      - Endpoint: /author
      - Nível de Acesso: todos
      - Corpo da Requisição: VAZIO
      - Retorno Esperado: Lista de todos os autores cadastrados com seus respectivos detalhes.
        
6. Relacionamentos e Categorias
   
   a. Criar relacionamento Autor-Livro
      - Método: POST
      - Endpoint: /book-author
      - Nível de Acesso: chefe de laboratório ou administrador
      - Corpo da Requisição:
        ```json
        {
          "id_autor": "string numérica (identificador do autor)",
          "isbn": "string numérica (número ISBN do livro)"
        }
        ```
      - Retorno Esperado: Confirmação da criação do relacionamento entre autor e livro.

   b. Deletar relacionamento Autor-Livro
      - Método: DELETE
      - Endpoint: /book-author/:id/:isbn
      - Nível de Acesso: chefe de laboratório ou administrador
      - Corpo da Requisição: VAZIO
      - Retorno Esperado: Confirmação da exclusão do relacionamento entre autor e livro.

   c. Criar Categoria
      - Método: POST
      - Endpoint: /category
      - Nível de Acesso: chefe de laboratório ou administrador
      - Corpo da Requisição:
        ```json
        {
          "nome": "string (nome da categoria)",
          "tipo_de_categoria": "string ('livro' ou 'material')"
        }
        ```
      - Retorno Esperado: Confirmação de criação com detalhes da categoria adicionada.
   
   d. Resgatar todas as Categorias de livros
      - Método: GET
      - Endpoint: /category/book
      - Nível de Acesso: todos
      - Corpo da Requisição: VAZIO
      - Retorno Esperado: Lista de todas as categorias de livros cadastradas.
   
   e. Resgatar todas as Categorias de materiais
      - Método: GET
      - Endpoint: /category/material
      - Nível de Acesso: todos
      - Corpo da Requisição: VAZIO
      - Retorno Esperado: Lista de todas as categorias de materiais cadastradas.
   
   
**OBS 1:** Todas as rotas que necessitam de autenticação devem receber um token de autenticação no header da requisição. O header deve seguir esse modelo:
```
Authorization: "Bearer token"
```
onde token deve ser substituido pelo token apropriado recebido durante o login

## Observações

Para acessar versões já implantadas da API ou para tirar qualquer dúvida entre em contato com os desenvolvedores.
