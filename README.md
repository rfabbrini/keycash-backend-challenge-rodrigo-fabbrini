# Keycash Backend Code Challenge

Por: Rodrigo Fabbrini

A aplicação foi desenvolvida conforme as recomendações, utilizando Node.js, MySQL, Express, Sequelize e Docker.

## Testes
A aplicação foi desenvolvida utilizando TDD. 
Todos os testes que eu utilizei para o desenvolvimento estão nos fontes na pasta "tests/".

## Configuração
A aplicação está configurada para ser utilizada em uma máquina rodando windows com o Docker instalado.
Para Linux, será necessário alterar o IP configurado no arquivo "src/DatabaseService.js" para localhost.

```javascript
var sequelize = new Sequelize('dbKeycash', 'root', 'root', {
  host: 'localhost',
  ...
});
```

A aplicação está configurada para utilizar o IP default do Docker no Windows que é "192.168.99.100". Para verificar se a instalação do docker está utilizando o IP padrão, basta rodar o comando:
```bash
  docker-machine ip
```

## Inicialização
Para iniciar a aplicação, é preciso iniciar o container do MySQL primeiro. Basta rodar os seguintes comandos nesta ordem.

A partir da raiz da aplicação, navegue para a pasta "/docker_mysql" e execute os comandos para gerar e inicializar o container do docker.
```bash
  docker build --tag keycash-mysql-image .
  docker run -d --rm -p 3306:3306 --name keycash-mysql keycash-mysql-image
```
Na sequencia, volte para a raiz da aplicação e inicie o container do nodejs.

```bash
  docker build -t keycash-node-image .
  docker run -d --rm -p 8080:8080 --name keycash-node keycash-node-image
```

Pronto! A aplicação já está rodando e os endpoints estão expostos!

## Documentação

Infelizmente não houve tempo para o desenvolvimento de uma documentação utilizando swagger. 
Fiz uma breve descrição dos enpoints a seguir.

## EndPoints
A aplicação é composta por 5 endpoints:

```rest
  GET /recuperarImovel  
  Recupera um imóvel na base a partir de seu ID.

    ENTRADA:
      id: INTEGER

    SAIDA:
      id: INTEGER
      endereco: STRING
      preco: DECIMAL
      metros_quadrados: INTEGER
      num_quartos: INTEGER
      num_banheiros: INTEGER
      num_suites: INTEGER
      num_vagas: INTEGER
      createdAt: DATE
      updatedAt: DATE
```

```rest
  POST /inserirImovel
  Insere um imóvel na base.

    ENTRADA:
      endereco: STRING
      preco: DECIMAL
      metros_quadrados: INTEGER
      num_quartos: INTEGER
      num_banheiros: INTEGER
      num_suites: INTEGER
      num_vagas: INTEGER

    SAIDA:
      id: INTEGER
      endereco: STRING
      preco: DECIMAL
      metros_quadrados: INTEGER
      num_quartos: INTEGER
      num_banheiros: INTEGER
      num_suites: INTEGER
      num_vagas: INTEGER
      createdAt: DATE
      updatedAt: DATE
```

```rest
  PUT /atualizarImovel
  Atualiza um imóvel já inserido na base.

    ENTRADA:
      id: INTEGER
      endereco: STRING
      preco: DECIMAL
      metros_quadrados: INTEGER
      num_quartos: INTEGER
      num_banheiros: INTEGER
      num_suites: INTEGER
      num_vagas: INTEGER

    SAIDA:
      retorno: STRING
```

```rest
  DELETE /removerImovel
  Remove um imóvel da base a partir de um ID

    ENTRADA:
      id: INTEGER

    SAIDA:
      retorno: STRING
```

```rest
  GET /filtro
  Retorna uma lista de imóveis a partir de um filtro especifico.
  Todos os parâmetros são opcionais. O filtro será composto apenas pelos parâmetros que forem enviados.
  Para o endereço, serão retornados os registros que tiverem a frase enviada dentro de sua composição.
  Para o campo preço, serão retornados os registros com preços inferiores ou iguais aos enviados.
  Para os demais campos, serão retornados os registros com valores iguais ou maiores aos enviados.

    ENTRADA:
      endereco: STRING
      preco: DECIMAL
      metros_quadrados: INTEGER
      num_quartos: INTEGER
      num_banheiros: INTEGER
      num_suites: INTEGER
      num_vagas: INTEGER

    SAIDA:
      Array[
        id: INTEGER
        endereco: STRING
        preco: DECIMAL
        metros_quadrados: INTEGER
        num_quartos: INTEGER
        num_banheiros: INTEGER
        num_suites: INTEGER
        num_vagas: INTEGER
        createdAt: DATE
        updatedAt: DATE
     ]
```

## Banco de Dados
A base de dados é chamada de "dbKeycash".
Ela é composta por uma tabela chamada "Imovels" (Gerada pelo Sequelize)

A tabela possui a seguinte modelagem:

```SQL
  Imovels
    id INT PRIMARY KEY AUTO_INCREMENT
    endereco VARCHAR(100)
    preco DECIMAL(12,2)
    metrosQuadrados SMALLINT
    numQuartos SMALLINT
    numBanheiros SMALLINT
    numSuites SMALLINT
    numVagas SMALLINT
    createdAt DATE
    updatedAt DATE
```

## Exemplos
Para chamar a aplicação, é aconselhavel utitilizar uma aplicação como Postman.
Basta seguir o exemplo das chamadas a seguir para chamar a aplicação.

/recuperarImovel
```
  GET http://192.168.99.100:8080/recuperarImovel?id=1
```

/inserirImovel
```
  POST http://192.168.99.100:8080/inserirImovel
  body:
  [{"key":"endereco","value":"Marechal Joao Alves Neto","description":"","type":"text","enabled":true},{"key":"preco","value":"555555","description":"","type":"text","enabled":true},{"key":"metros_quadrados","value":"110","description":"","type":"text","enabled":true},{"key":"num_quartos","value":"9","description":"","type":"text","enabled":true},{"key":"num_banheiros","value":"5","description":"","type":"text","enabled":true},{"key":"num_suites","value":"1","description":"","type":"text","enabled":true},{"key":"num_vagas","value":"0","description":"","type":"text","enabled":true}]
```

/atualizarImovel
```
  PUT http://192.168.99.100:8080/atualizarImovel
  body:
  [{"key":"id","value":"161","description":"","type":"text","enabled":true},{"description":"","enabled":true,"key":"endereco","type":"text","value":"Joao Alfredo"},{"description":"","enabled":true,"key":"preco","type":"text","value":"99999.00"},{"description":"","enabled":true,"key":"metros_quadrados","type":"text","value":"90"},{"description":"","enabled":true,"key":"num_quartos","type":"text","value":"4"},{"description":"","enabled":true,"key":"num_banheiros","type":"text","value":"7"},{"description":"","enabled":true,"key":"num_suites","type":"text","value":"5"},{"description":"","enabled":true,"key":"num_vagas","type":"text","value":"2"}]
```

/removerImovel
```
  DELETE http://192.168.99.100:8080/removerImovel
  body:
  [{"key":"id","value":"168","description":"","type":"text","enabled":true}]
```

/removerImovel
```
  http://localhost:8080/filtro?num_suites=2&num_vagas=1
```




### Conclusão

Agradeço o tempo e a oportunidade.
Obrigado!
