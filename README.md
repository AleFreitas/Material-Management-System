**ROTAS:**

1. **Criar um Livro:**
   - **Método:** POST
   - **Endpoint:** `/book`
   - **Corpo da Requisição:**
     ```json
     {
        "isbn": "string",
        "descricao": "string",
        "data_aquisicao": "string",
        "conservacao": "string",
        "localizacao": "string",
        "quantidade": 0,
        "titulo": "string",
        "url_capa": "string"
     }
     ```

2. **Atualizar Livro:**
   - **Método:** PUT
   - **Endpoint:** `/book/:isbn`
   - **Corpo da Requisição (Opcional):**
     ```json
     {
        "isbn": "string",
        "descricao": "string",
        "data_aquisicao": "string",
        "conservacao": "string",
        "localizacao": "string",
        "quantidade": 0,
        "titulo": "string",
        "url_capa": "string"
     }
     ```

3. **Excluir Livro:**
   - **Método:** DELETE
   - **Endpoint:** `/book/:isbn`

4. **Criar Material:**
   - **Método:** POST
   - **Endpoint:** `/material`
   - **Corpo da Requisição:**
     ```json
     {
        "conservacao": "string",
        "localizacao": "string",
        "quantidade": 0,
        "desc": "string",
        "data_Aquisicao": "string",
        "serial": "string",
        "url_imagem": "string",
        "id_categoria_material": 0
     }
     ```

5. **Atualizar Material:**
   - **Método:** PUT
   - **Endpoint:** `/material/:id`
   - **Corpo da Requisição (Opcional):**
     ```json
     {
        "id": 0,
        "desc": "string",
        "data_Aquisicao": "string",
        "conservacao": "string",
        "localizacao": "string",
        "quantidade": 0,
        "serial": "string",
        "url_imagem": "string",
        "id_categoria_material": 0
     }
     ```

6. **Excluir Material:**
   - **Método:** DELETE
   - **Endpoint:** `/material/:id`

7. **Criar Usuário:**
   - **Método:** POST
   - **Endpoint:** `/sign-up`
   - **Corpo da Requisição:**
    ```json
     {
        "nome": "string",
        "sobrenome": "string",
        "funcao": "string",
        "email": "string email",
        "senha": "string",
        "url_imagem": "string"
     }
     ```

8. **Fazer Login:**
   - **Método:** POST
   - **Endpoint:** `/sign-in`
   - **Corpo da Requisição:**
    ```json
     {
        "email": "string",
        "senha": "string"
     }
     ```
   - **Resposta da Requisição:**
    ```json
     {
        "token": "string"
     }
    ```