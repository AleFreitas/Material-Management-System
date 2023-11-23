BEGIN;

CREATE TABLE IF NOT EXISTS public.usuario
(
    id serial NOT NULL,
    nome character varying NOT NULL,
    sobrenome character varying NOT NULL,
    funcao character varying NOT NULL,
    email character varying NOT NULL,
    senha character varying NOT NULL,
    url_imagem character varying,
    PRIMARY KEY (id),
    CONSTRAINT "ID_Usuario" UNIQUE (id),
    CONSTRAINT "Login" UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS public.livro
(
    isbn VARCHAR(20) NOT NULL,
    descricao character varying NOT NULL,
    data_aquisicao date NOT NULL,
    conservacao character varying NOT NULL,
    localizacao character varying NOT NULL,
    quantidade smallint NOT NULL,
    titulo character varying NOT NULL,
    url_capa character varying,
    PRIMARY KEY (isbn),
    CONSTRAINT "ISBN" UNIQUE (isbn)
);

CREATE TABLE IF NOT EXISTS public.material_didatico
(
    id serial NOT NULL PRIMARY KEY ,
    "desc" character varying NOT NULL,
    "data_Aquisicao" date NOT NULL,
    conservacao character varying NOT NULL,
    localizacao character varying NOT NULL,
    quantidade bigint NOT NULL,
    serial character varying NOT NULL,
    url_imagem character varying,
    id_categoria_material bigint NOT NULL
--     PRIMARY KEY (id_categoria_material),
--     CONSTRAINT "ID_Material" UNIQUE (id_categoria_material)
);

CREATE TABLE IF NOT EXISTS public.categoria_livro
(
    id serial NOT NULL,
    nome character varying NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.autor
(
    id serial NOT NULL PRIMARY KEY,
    nome character varying NOT NULL,
    sobrenome character varying NOT NULL,
    email character varying UNIQUE NOT NULL
);


DO $$ 
DECLARE
    tabela_usuario_existe BOOLEAN := FALSE;
BEGIN
    -- Loop para verificar a existência da tabela usuario
    WHILE NOT tabela_usuario_existe LOOP
        -- Verifica se a tabela usuario existe
        tabela_usuario_existe := EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'usuario');
        
        -- Se a tabela usuario existe, cria a tabela sessao
        IF tabela_usuario_existe THEN
            CREATE TABLE IF NOT EXISTS public.sessao
			(
				id serial NOT NULL PRIMARY KEY,
				id_usuario bigint NOT NULL REFERENCES usuario(id),
				token character varying NOT NULL				
			);
            
            RAISE NOTICE 'Tabela sessao criada com sucesso.';
        ELSE
            -- Aguarda um pouco antes de verificar novamente
            PERFORM pg_sleep(2); -- Aguarda 2 segundos (ajuste conforme necessário)
        END IF;
    END LOOP;
END $$;


DO $$ 
DECLARE
    tabela_material_didatico BOOLEAN := FALSE;
BEGIN
    -- Loop para verificar a existência da tabela 
    WHILE NOT tabela_material_didatico LOOP
        -- Verifica se a tabela 
        tabela_material_didatico := EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'material_didatico');
         -- Se a tabela existe, cria a tabela
        IF tabela_material_didatico THEN
            CREATE TABLE IF NOT EXISTS public.categoria_material
			(
				id serial NOT NULL PRIMARY KEY,
				nome character varying NOT NULL				
			);
            
            RAISE NOTICE 'Tabela categoria_material criada com sucesso.';
        ELSE
            -- Aguarda um pouco antes de verificar novamente
            PERFORM pg_sleep(2); -- Aguarda 2 segundos (ajuste conforme necessário)
        END IF;
    END LOOP;
END $$;

DO $$ 
DECLARE
    tabela_livro BOOLEAN := FALSE;
    tabela_autor BOOLEAN := FALSE;
BEGIN
    -- Loop para verificar a existência da tabela livro
    WHILE NOT tabela_livro LOOP
        -- Verifica se a tabela livro existe
        tabela_livro := EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'livro');
        
        -- Se a tabela livro existe, continua com a tabela autor
        IF tabela_livro THEN
            -- Loop para verificar a existência da tabela autor
            WHILE NOT tabela_autor LOOP
                -- Verifica se a tabela autor existe
                tabela_autor := EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'autor');
                
                -- Se a tabela autor existe, cria a tabela autor_livro
                IF tabela_autor THEN
                    CREATE TABLE IF NOT EXISTS public.autor_livro
                    (
                        id serial NOT NULL PRIMARY KEY,
                        id_autor bigint NOT NULL REFERENCES autor(id),
                        isbn VARCHAR(20) NOT NULL REFERENCES livro(isbn)						
                    );
                    
                    RAISE NOTICE 'Tabela autor_livro criada com sucesso.';
                END IF;
            END LOOP;
        ELSE
            -- Aguarda um pouco antes de verificar novamente
            PERFORM pg_sleep(2); -- Aguarda 2 segundos (ajuste conforme necessário)
        END IF;
    END LOOP;
END $$;



DO $$ 
DECLARE
    tabela_categoria_livro BOOLEAN := FALSE;
BEGIN
    -- Loop para verificar a existência da tabela 
    WHILE NOT tabela_categoria_livro LOOP
        -- Verifica se a tabela 
        tabela_categoria_livro := EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'categoria_livro');
         -- Se a tabela existe, cria a tabela
        IF tabela_categoria_livro THEN
            CREATE TABLE IF NOT EXISTS public.relacao_categoria_livro
			(
				id serial NOT NULL PRIMARY KEY,
				id_categoria_livro bigint NOT NULL REFERENCES categoria_livro(id),
				isbn VARCHAR(20) NOT NULL REFERENCES livro(isbn)				
			);
            
            RAISE NOTICE 'Tabela relacao_categoria_livro criada com sucesso.';
        ELSE
            -- Aguarda um pouco antes de verificar novamente
            PERFORM pg_sleep(2); -- Aguarda 2 segundos (ajuste conforme necessário)
        END IF;
    END LOOP;
END $$;

CREATE TABLE IF NOT EXISTS public.item
(
    id serial NOT NULL PRIMARY KEY,
    isbn VARCHAR(20) REFERENCES livro(isbn),
    id_material bigint REFERENCES material_didatico(id)
);

CREATE TABLE IF NOT EXISTS public.emprestimo
(
    id serial NOT NULL PRIMARY KEY,
    id_usuario bigint NOT NULL REFERENCES usuario(id),
    id_item bigint NOT NULL REFERENCES item(id),
    data_emprestimo date NOT NULL,
    data_devolucao date NOT NULL,
    status boolean NOT NULL,
    multa numeric NOT NULL DEFAULT 0
);

END;