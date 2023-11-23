-- Populate Usuario Table
INSERT INTO public.usuario (nome, sobrenome, funcao, email, senha, url_imagem)
VALUES
    ('João', 'Silva', 'Funcionário', 'joao.silva@email.com', 'senha123', 'url_imagem1'),
    ('Maria', 'Santos', 'Estudante', 'maria.santos@email.com', 'senha456', 'url_imagem2'),
    ('Carlos', 'Oliveira', 'Professor', 'carlos.oliveira@email.com', 'senha789', 'url_imagem3');

-- Populate Livro Table
INSERT INTO public.livro (isbn, descricao, data_aquisicao, conservacao, localizacao, quantidade, titulo, url_capa)
VALUES
    ('9780123456789', 'Livro de Ficção', '2023-01-01', 'Bom', 'Estante A', 5, 'Aventuras Fantásticas', 'url_capa1'),
    ('9780987654321', 'Livro Técnico', '2023-02-15', 'Regular', 'Estante B', 3, 'Programação Avançada', 'url_capa2'),
    ('9781122334455', 'Livro Infantil', '2023-03-20', 'Ótimo', 'Estante C', 8, 'Contos de Fadas', 'url_capa3');

-- Populate Material Didatico Table
INSERT INTO public.material_didatico ("desc", "data_Aquisicao", conservacao, localizacao, quantidade, serial, url_imagem, id_categoria_material)
VALUES
    ('Material Didático 1', '2023-04-10', 'Bom', 'Prateleira 1', 10, 'serial123', 'url_imagem4', 1),
    ('Material Didático 2', '2023-05-15', 'Regular', 'Prateleira 2', 15, 'serial456', 'url_imagem5', 2),
    ('Material Didático 3', '2023-06-20', 'Ótimo', 'Prateleira 3', 20, 'serial789', 'url_imagem6', 3);

-- Populate Categoria Livro Table
INSERT INTO public.categoria_livro (nome)
VALUES
    ('Ficção'),
    ('Técnico'),
    ('Infantil');

-- Populate Autor Table
INSERT INTO public.autor (nome, sobrenome, email)
VALUES
    ('Autor1', 'Sobrenome1', 'autor1@mail.com'),
    ('Autor2', 'Sobrenome2', 'autor2@mail.com'),
    ('Autor3', 'Sobrenome3', 'autor3@mail.com');

-- Populate Sessao Table (assuming some existing Usuario records)
INSERT INTO public.sessao (id_usuario, token)
VALUES
    (1, 'token123'),
    (2, 'token456'),
    (3, 'token789');

-- Populate Categoria Material Table (assuming some existing Material Didatico records)
INSERT INTO public.categoria_material (nome)
VALUES
    ('Categoria1'),
    ('Categoria2'),
    ('Categoria3');

-- Populate Autor Livro Table (assuming some existing Autor and Livro records)
INSERT INTO public.autor_livro (id_autor, isbn)
VALUES
    (1, '9780123456789'),
    (2, '9780987654321'),
    (3, '9781122334455');

-- Populate Relacao Categoria Livro Table (assuming some existing Categoria Livro and Livro records)
INSERT INTO public.relacao_categoria_livro (id_categoria_livro, isbn)
VALUES
    (1, '9780123456789'),
    (2, '9780987654321'),
    (3, '9781122334455');

-- Populate Item Table (assuming some existing Livro and Material Didatico records)
INSERT INTO public.item (isbn, id_material)
VALUES
    ('9780123456789', 1),
    ('9780987654321', 2),
    ('9781122334455', 3);

-- Populate Emprestimo Table (assuming some existing Usuario and Item records)
INSERT INTO public.emprestimo (id_usuario, id_item, data_emprestimo, data_devolucao, status)
VALUES
    (1, 1, '2023-07-01', '2023-07-15', TRUE),
    (2, 2, '2023-08-01', '2023-08-15', TRUE),
    (3, 3, '2023-09-01', '2023-09-15', FALSE);
