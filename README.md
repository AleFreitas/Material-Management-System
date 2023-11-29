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

7. Consultas
   
   a. Resgatar todos os livros cadastrados
      - Método: GET
      - Endpoint: /book
      - Nível de Acesso: todos
      - Corpo da Requisição: VAZIO
      - Retorno Esperado: Lista de todos os livros cadastrados com seus respectivos detalhes.

   b. Resgatar todos os materiais cadastrados
      - Método: GET
      - Endpoint: /material
      - Nível de Acesso: todos
      - Corpo da Requisição: VAZIO
      - Retorno Esperado: Lista de todos os materiais cadastrados com seus respectivos detalhes.

