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

## Começando

Para começar com o projeto, você precisará clonar o repositório para sua máquina local e instalar as dependências necessárias. Use os comandos abaixo:

```bash
$ git clone https://github.com/IglanCardeal/soon-challenge.git
$ cd soon-challenge
$ npm i -s
```

- #### Docker

Uma vez que você tenha instalado as dependências, você pode iniciar o servidor de desenvolvimento executando o seguinte comando:

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
