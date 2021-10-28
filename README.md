# Projeto teste da profitfy
###### Felipe Lelis

###### Tecnologias utilizadas

- Node.js
- Knex.js
- TypeScript
- PostgreSQL
- Padrão MVC

# Configuração do projeto

## Configurando conexão ao banco de dados

###### No arquivo na raiz do projeto 'knexfile.ts' ficam as nossas configurações de acesso ao banco de dados 

###### Exemplo :
```
    development: {
        client: 'pg',
        connection: {
            host: 'localhost',
            port: 5432,
            user: 'postgres',
            password: 'test',
            database: 'profitfy',
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
        },
        seeds: {
            directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
        },
    },
```
> em host: 'Coloque o url local de acesso ao seu banco de dados' 
> 
> em port: 'Coloque a porta que o serviço de banco de dados está usando'
>
> em user: 'O Usuário de acesso ao seu banco de dados '
> 
> em password: 'A senha de acesso ao seu banco de dados'
> 
> em database: 'O nome do seu banco de dados, onde sua aplicação irá rodar'

###### Altere as configurações conforme é o acesso ao seu banco de dados, lembrando que estamos utilizando postgre.

## Instalando as dependencias do nosso projeto

###### No terminal de comando, navegue até a pasta raiz do nosso projeto, em seguida digite esses comandos 

> yarn install ou npm install
> 

## Rodando as migrations para criar automaticamente as tabelas no nosso banco de dados

###### No terminal de comando, navegue até a pasta raiz do nosso projeto, em seguida digite esse comando
> npx knex migrate:latest

## Iniciando o nosso projeto
###### No terminal de comando, navegue até a pasta raiz do nosso projeto, em seguida digite os comando
>yarn start:dev
###### Então irá emprimir no terminal "Database running" e "Running on port 5500"
###### Dizendo que nossa conexão ao banco de dados está ok, e nosso projeto está rodando na porta 5500
###### ficando assim http://localhost:5500
## Nossas rotas
> Rota : POST  '/orders'
###### Nessa rota criamos ordens e customers de um request com body no formato json

###### Exemplo de entrada 

```
{
  "orders": [
    {
      "amount": 23.78,
      "created_at": "2021-10-10T05:43:22Z",
      "customer": { "name": "John Doe", "email": "johndoe@mail.com" }
    },
    {
      "amount": 213.32,
      "created_at": "2021-10-15T17:22:32Z",
      "customer": { "name": "John Doe", "email": "johndoe@mail.com" }
    },
    {
      "amount": 2334.23,
      "created_at": "2021-10-19T00:38:11Z",
      "customer": { "name": "Luck Det", "email": "luckdet@mail.com" }
    }
  ]
}
```

###### Exemplo de saída

```
{
  "message": "Dados criados com sucesso"
}
```

>Rota: GET /orders
###### Nessa rota listamos as ordens com um range de datas que vem como parametro

###### Exemplo de saída da rota, range de : start_date : "2021-10-10" e end_date: "2021-10-19"

```
{
  "data": [
    {
      "id": "a99ea63a-4d84-4d96-b258-8f1dec1f7297",
      "amount": 23.78,
      "customer_id": "7d09b52b-60e2-42f8-85c8-43bfe1f70b41",
      "created_at": "2021-10-10T08:43:22.000Z",
      "updated_at": "2021-10-08T02:04:54.524Z"
    },
    {
      "id": "098bb862-a3e1-4e7a-9742-9ecd493f3c63",
      "amount": 213.32,
      "customer_id": "c960044c-c745-4f4b-bbc2-71d57680ad9a",
      "created_at": "2021-10-15T20:22:32.000Z",
      "updated_at": "2021-10-08T02:04:54.526Z"
    }
  ],
  "total": 3
}
```
>Rota: GET /customers
###### Nesta rota lista o costumer com total comprado a média de ticket
###### Exemplo de saída 

```
{
  "customers": [
    {
      "total_spend_amount": 237.1,
      "email": "johndoe@mail.com",
      "average_ticket_amount": 118.55
    },
    {
      "total_spend_amount": 2334.23,
      "email": "luckdet@mail.com",
      "average_ticket_amount": 2334.23
    }
  ],
  "total": 3
}
```
>Rota : GET /savejsondata
###### Nessa rota, iremos popular o nosso banco de dados com os dados de https://s3.us-west-2.amazonaws.com/desafio-profitfy.me/new-new-teste.json em um arquivo json no projeto
###### Exemplo de saída 
```
{
  "message": "All data imported"
}
```
