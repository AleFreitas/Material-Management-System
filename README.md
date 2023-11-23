**ROTAS:**

1. **Criar um Livro:**
   - **Método:** POST
   - **Endpoint:** `/book`
   - **Nivel de Acesso** `chefe de laboratório ou administrador`
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
   - **Nivel de Acesso** `chefe de laboratório ou administrador`
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
   - **Nivel de Acesso** `chefe de laboratório ou administrador`

4. **Criar Material:**
   - **Método:** POST
   - **Endpoint:** `/material`
   - **Nivel de Acesso** `chefe de laboratório ou administrador`
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
   - **Nivel de Acesso** `chefe de laboratório ou administrador`
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
   - **Nivel de Acesso** `chefe de laboratório ou administrador`

7. **Criar Usuário:**
   - **Método:** POST
   - **Endpoint:** `/sign-up`
   - **Nivel de Acesso** `chefe de laboratório ou administrador`
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
   - **Nivel de Acesso** `nenhuma`
   - **Corpo da Requisição:**
    ```json
     {
        "email": "string email",
        "senha": "string"
     }
     ```
   - **Resposta da Requisição:**
    ```json
     {
        "token": "string"
     }
    ```

9. **Solicitar empréstimo:**
   - **Método:** POST
   - **Endpoint:** `/loan/:itemId`
   - **Nivel de Acesso** `usuário comum`
   - **Corpo da Requisição:**
   ```
    VAZIO
   ```

10. **Finalizar empréstimo:**
   - **Método:** DELETE
   - **Endpoint:** `/loan/:itemId`
   - **Nivel de Acesso** `usuário comum`
   - **Corpo da Requisição:**
   ```
   VAZIO
   ```

11. **Renovar empréstimo:**
   - **Método:** PUT
   - **Endpoint:** `/loan/:itemId`
   - **Nivel de Acesso** `usuário comum`
   - **Corpo da Requisição:**
   ```json
    {
      "new_date": "YYYY-MM-DD"
    }
   ```

12. **Cadastrar um Autor:**
   - **Método:** POST
   - **Endpoint:** `/author`
   - **Nivel de Acesso** `chefe de laboratório ou administrador`
   - **Corpo da Requisição:**
   ```json
    {
      "nome":"string",
      "sobrenome": "string",
      "email": "string email"
    }
   ```

13. **Atualizar dados de Autor:**
   - **Método:** PUT
   - **Endpoint:** `/author/:id`
   - **Nivel de Acesso** `chefe de laboratório ou administrador`
   - **Corpo da Requisição:**
   ```json
    {
      "nome":"string",
      "sobrenome": "string",
      "email": "string email"
    }
   ```

14. **Deletar Autor**
   - **Método:** DELETE
   - **Endpoint:** `/author/:id`
   - **Nivel de Acesso** `chefe de laboratório ou administrador`
   - **Corpo da Requisição:**
   ```
    VAZIO
   ```

15. **Criar relacionamento Autor-livro**
   - **Método:** POST
   - **Endpoint:** `/book-author`
   - **Nivel de Acesso** `chefe de laboratório ou administrador`
   - **Corpo da Requisição:**
   ```json
    {
      "id_autor": "string numerica",
      "isbn": "string numerica"
    }
   ```

16. **Deletar relacionamento Autor-Livro**
   - **Método:** DELETE
   - **Endpoint:** `/book-author/:id/:isbn`
   - **Nivel de Acesso** `chefe de laboratório ou administrador`
   - **Corpo da Requisição:**
   ```
    VAZIO
   ```

17. **Criar Categoria**
   - **Método:** POST
   - **Endpoint:** `/category`
   - **Nivel de Acesso** `chefe de laboratório ou administrador`
   - **Corpo da Requisição:**
   ```json
    {
      "nome": "string",
      "tipo_de_categoria": "string ('livro' or 'material')"
    }
   ```