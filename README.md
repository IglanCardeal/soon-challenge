<div align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  <br>
  <h1>Desafio Soon</h1>
</div>

Este projeto é uma solução para o desafio fornecido pela empresa Soon. Ele fornece uma API web que permite ás companhias clientes criarem solicitações de serviços para guincho.

O projeto foi construído em Node.js no back-end e usando alguns conceitos de **SOLID**, **Clean Architecture** e **TDD**. A aplicação utiliza um banco de dados relacional PostgreSQL para armazenar informações sobre as solicitações e companhias clientes. Um serviço externo (**Distance Matrix**) do Google foi usado na construção desta API.

Apesar de ser uma aplicação de testes, esta tenta simular uma API real para consumo de serviços front-end ou back-end. Fora criado dados falsos (Fakers) de companhias clientes para simular a principal funcionalidade da API que é a criação de solicitações de serviços de entrega otimizada e listagem do total de serviços solicitados e criados por uma empresa cliente.

## Pré Requisitos

Antes de começar a testar este projeto, é importante que você tenha os seguintes programas instalados em seu computador:

- [Node.js](https://nodejs.org/en/)
- [Git](https://git-scm.com/downloads)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/install/)

Esses programas são essenciais para garantir que você possa executar o projeto corretamente. Certifique-se de que eles estão instalados antes de continuar.

- #### Arquivo `.env`

- Antes de tudo, o projeto necessita de um arquivo `.env` definido e com variáveis de ambiente necessárias para rodar a aplicação. Para criá-lo, tome como base o arquivo `.env.example`. Renomeie-o para `.env`. Agora defina as variáveis necessárias.

```none
DATABASE_URL="postgresql://prisma:prisma@0.0.0.0:5432/dev"

GOOGLE_CLOUD_API_KEY=your-api-key
GOOGLE_CLOUD_API_URL=https://maps.googleapis.com/maps/api/distancematrix/json
```

- `DATABASE_URL` é definida a string de conexão com o banco de dados Postgres. **Não altere** este valor padrão `postgresql://prisma:prisma@0.0.0.0:5432/dev`.
- `GOOGLE_CLOUD_API_KEY` coloque aqui sua chave de API do Google Cloud.
- `GOOGLE_CLOUD_API_URL` esta é a url para consumir um serviço externo do Google. **Não altere** este valor padrão `https://maps.googleapis.com/maps/api/distancematrix/json`.

## Começando

Para começar com o projeto, você precisará clonar o repositório para sua máquina local e instalar as dependências necessárias. Use os comandos abaixo:

```bash
$ git clone https://github.com/IglanCardeal/soon-challenge.git
$ cd soon-challenge
$ npm i -s
```

- #### Docker e docker compose

- Uma vez que você tenha instalado as dependências, você pode iniciar o servidor e o banco de dados de desenvolvimento usando o Docker. O projeto possui os arquivos `docker-compose.yml` e `docker-compose-postgres.yml` que são usados para configurar e subir os containers do projeto através do script `up` no `package.json`. O mesmo possui o script `down` para desligar os containers da aplicação.

Feito tudo isso, você pode digitar no terminal o comando:

```bash
$ npm run up
```

Ele vai executar alguns scripts para subir o container do Postgres, fazer os devidos ajustes do Prisma com o banco de dados e subir o container do servidor.

---

Caso queira encerrar os containers, basta executar:

```bash
$ npm run down
```

---

Agora teste a aplicação acessando a rota `http://localhost:3000/ping` (a porta padrão do servidor é `3000`) para fazer um teste da aplicação. Execute o cURL abaixo:

```bash
curl --request GET \
  --url http://localhost:3000/ping
```

Você deve receber como resposta:

```bash
{"message":"Pong!"}
```

Caso você tenha a extensão [Rest Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) no VSCode, abra o arquivo `local.http` na pasta `rest-client` e execute o cURL de teste:

![img](./docs/images/http.png)

## Diagrama do Banco de Dados

No banco, temos as entidades

```none
+---------------+ (1)   (*) +------------------+
|    Company    | <-------- |  ServiceRequest  |
+---------------+           +------------------+
| id            |           | id               |
| name          |           | serviceType      |
+---------------+           | createdAt        |
                            | total            |
                            | collectionAddress|
                            | deliveries       |
                            | vehicles         |
                            | companyId        |
                            +------------------+
```

A seta `<--------` com o número `1` indica que uma empresa cliente (`Company`) tem uma chave estrangeira para muitos pedidos de serviço (`ServiceRequest`), enquanto a seta com o número `*` indica que um pedido de serviço tem uma referência para uma única empresa.

Os tipos dos dados estão representados na tabela abaixo. Alguns dados estão salvos no formato BJON (Binary JSON) e eu irei explicar o motivo de usar esse tipo.

```none
### Company

| Column | Data Type |
| ------ | -------- |
| id     | INTEGER  |
| name   | TEXT     |

### ServiceRequest

| Column            | Data Type   |
| ----------------- | ----------- |
| id                | TEXT        |
| serviceType       | TEXT        |
| createdAt         | TIMESTAMP(3)|
| total             | JSONB       |
| collectionAddress | JSONB       |
| deliveries        | JSONB       |
| vehicles          | JSONB       |
| companyId         | INTEGER     |
```
