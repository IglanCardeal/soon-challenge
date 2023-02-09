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

Caso queira encerrar os containers, basta executar:

```bash
$ npm run down
```

- #### Alerta do Prisma

- Uma vez criado e ajustado o banco de dados durante a primeira execução, o prisma pode exibir um alerta como o mostrado abaixo, mas não se preocupe, pois uma vez criado as tabelas do banco durante a primeira inicialização, não há necessidade de executar o comando novamente. Aperte a tecla <kbd>N</kbd> para continuar normalmente.

```bash
- Drift detected: Your database schema is not in sync with your migration history.

The following is a summary of the differences between the expected database schema given your migrations files, and the actual schema of the database.

It should be understood as the set of changes to get from the expected schema to the actual schema.

[+] Added tables
  - Company
  - ServiceRequest

[*] Changed the `ServiceRequest` table
  [+] Added foreign key on columns (companyId)

- The following migration(s) are applied to the database but missing from the local migrations directory: 20230208185234_init

✔ We need to reset the "public" schema at "0.0.0.0:5432"
Do you want to continue? All data will be lost.
```

- Se você optar por refazer a base de dados, aperte a tecla <kbd>Y</kbd>, mas tenha em mente que todos os dados existentes serão apagados.

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

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
