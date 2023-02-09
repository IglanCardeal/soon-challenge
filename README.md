<div align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  <br>
  <h1>Desafio Soon</h1>
</div>

Este projeto é uma solução para o desafio fornecido pela empresa Soon. Ele fornece uma API web que permite ás companhias clientes criarem solicitações de serviços para guincho.

O projeto foi construído em Node.js no back-end e usando alguns conceitos de **SOLID**, **Clean Architecture** e **TDD**. A aplicação utiliza um banco de dados relacional PostgreSQL para armazenar informações sobre as solicitações e companhias clientes. Um serviço externo (**Distance Matrix**) do Google foi usado na construção desta API.

Apesar de ser uma aplicação de testes, esta tenta simular uma API real para consumo de serviços front-end ou back-end. Fora criado dados falsos (Fakers) de companhias clientes para simular a principal funcionalidade da API que é a criação de solicitações de serviços de entrega otimizada e listagem do total de serviços solicitados e criados por uma empresa cliente.

# Índice

- [Pré Requisitos](#pré-requisitos)
- [Começando](#começando)
- [API Endpoints](#api-endpoints)
- [Diagrama do Banco de Dados](#diagrama-do-banco-de-dados)
- [Testes Automatizados](#testes-automatizados)
- [Tecnologias](#tecnologias)

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

- #### Docker e docker compose

- Uma vez que você tenha instalado as dependências, você pode iniciar o servidor e o banco de dados de desenvolvimento usando o Docker. O projeto possui os arquivos `docker-compose.yml` e `docker-compose-postgres.yml` que são usados para configurar e subir os containers do projeto através do script `up` no `package.json`. O mesmo possui o script `down` para desligar os containers da aplicação.

Feito tudo isso, você pode digitar no terminal o comando:

```bash
$ npm run up
```

Ele vai executar alguns scripts para subir o container do Postgres, fazer os devidos ajustes do Prisma com o banco de dados e subir o container do servidor.

Se você visualizar os logs do container da aplicação, deve aparecer algo como:

```bash
[Nest] 201  - 02/09/2023, 8:27:59 PM     LOG [NestFactory] Starting Nest application...
[Nest] 201  - 02/09/2023, 8:27:59 PM     LOG [InstanceLoader] AppModule dependencies initialized +36ms
[Nest] 201  - 02/09/2023, 8:28:00 PM     LOG
==================INFO==================

[Nest] 201  - 02/09/2023, 8:28:00 PM    WARN [DB Restart]: New clients created. Use one of these:
[Nest] 201  - 02/09/2023, 8:28:00 PM    WARN [{"id":1,"name":"Teste"},{"id":1,"name":"Teste3"},{"id":1,"name":"Teste3"}]
[Nest] 201  - 02/09/2023, 8:28:00 PM     LOG
========================================

[Nest] 201  - 02/09/2023, 8:28:00 PM     LOG [RoutesResolver] FindCompanyServicesController {/api/v1/service-request}: +6ms
[Nest] 201  - 02/09/2023, 8:28:00 PM     LOG [RouterExplorer] Mapped {/api/v1/service-request/company, GET} route +6ms
[Nest] 201  - 02/09/2023, 8:28:00 PM     LOG [RoutesResolver] CreateServiceController {/api/v1/service-request}: +1ms
[Nest] 201  - 02/09/2023, 8:28:00 PM     LOG [RouterExplorer] Mapped {/api/v1/service-request/create, POST} route +2ms
[Nest] 201  - 02/09/2023, 8:28:00 PM     LOG [RoutesResolver] FindServiceRequestController {/api/v1/service-request}: +1ms
[Nest] 201  - 02/09/2023, 8:28:00 PM     LOG [RouterExplorer] Mapped {/api/v1/service-request/find/:id, GET} route +1ms
[Nest] 201  - 02/09/2023, 8:28:00 PM     LOG [RoutesResolver] PingTestController {/ping}: +1ms
[Nest] 201  - 02/09/2023, 8:28:00 PM     LOG [RouterExplorer] Mapped {/ping, GET} route +1ms
[Nest] 201  - 02/09/2023, 8:28:00 PM     LOG [NestApplication] Nest application successfully started +5ms
[Nest] 201  - 02/09/2023, 8:28:00 PM     LOG Server Up on port: 3000
```

Sucesso!: `LOG Server Up on port: 3000`

Uma informação relevante é: `[{"id":1,"name":"Teste"},{"id":1,"name":"Teste3"},{"id":1,"name":"Teste3"}]`, com dados de clientes para serem usados em testes das rotas da API.

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

## API Endpoints

> ### GET /ping

Este endpoint é utilizado para verificar se a API está ativa. Ele retorna um código de resposta HTTP 200 OK e uma mensagem `"pong"`.

```bash
curl --request GET \
  --url http://localhost:3000/ping
```

> ### POST /api/v1/service-request/create

Este endpoint é usado para criar uma nova solicitação de serviço. Ele espera um corpo JSON com as informações sobre a empresa, o tipo de serviço, o endereço de coleta e entregas (latitude e longitude) e veículos relacionados (marca, modelo, ano e placa).

```bash
curl --request POST \
  --url http://localhost:3000/api/v1/service-request/create \
  --header 'Content-Type: application/json' \
  --data '{
  "company": {
    "id": 1,
    "name": "Teste"
  },
  "serviceType": "guincho",
  "collectionAddress": {
    "lat": -1.369406,
    "long": -48.380052
  },
  "deliveries": [
    {
      "finalAddress": {
        "lat": -1.368226,
        "long": -48.377295
      },
      "vehicles": [
        {
          "brand": "VW",
          "model": "Gol",
          "year": "2015",
          "plate": "ABC-1234"
        }
      ]
    },
    {
      "finalAddress": {
        "lat": -1.369100,
        "long": -48.383126
      },
      "vehicles": [
        {
          "brand": "Ford",
          "model": "Wrangler",
          "year": "2012",
          "plate": "CDE-1234"
        }
      ]
    }
  ]
}'
```

> ### GET /api/v1/service-request/company

Este endpoint é usado para obter uma lista de solicitações de serviço relacionadas a uma determinada companhia. Ele espera um corpo JSON com as informações da empresa (`id`), bem como as datas de início e fim para filtragem da pesquisa.

```bash
curl --request GET \
  --url http://localhost:3000/api/v1/service-request/company \
  --header 'Content-Type: application/json' \
  --data '{
	"companyId": 1,
	"startDate": "2023-01-08T12:07:35.100Z",
	"endDate": "2023-03-08T12:09:35.100Z"
}'
```

> ### GET /api/v1/service-request/find/{serviceId}

Este endpoint permite ao usuário buscar uma solicitação de serviço pelo seu `serviceId`. O `serviceId` deve ser passado como um parâmetro na URL.

```bash
curl --request GET \
  --url http://localhost:3000/api/v1/service-request/find/{serviceId}
```

`*` Substitua o `{serviceId}` pelo id do serviço buscado.

---

Esses comandos cURL estão salvos no arquivo `local.http` e podem ser executados com a extensão REST Client do VSCode.

---

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

Os dados de companhia são apenas para testes, por isso temos apenas os campos `id` e `name`.

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

Os campos `total`, `collectionAddress`, `vehicles` e `deliveries` são objetos e tem a tipagem no modelo (`model`) do projeto:

```ts
export type Company = {
  id: number
  name: string
}
export type Total = {
  distance: number
  duration: number
  servicePrice: number
}

export type Address = {
  lat: number
  long: number
}

export type Vehicle = {
  plate: string
  model: string
  brand: string
  year: string
}

export interface Delivery {
  vehicles: Vehicle[]
  finalAddress: Address
  lastAddress: Address
  total: Omit<Total, 'servicePrice'>
}
```

E o objeto final que representa uma solicitação de serviço de uma companhia:

```ts
export interface ServiceRequest {
  id: string
  serviceType: ServiceType
  createdAt: Date
  total: Total
  collectionAddress: Address
  deliveries: Delivery[]
  vehicles: Vehicle[]
  company: Company
}
```

Por questões de interpretação, eu optei por salver os campos `total`, `collectionAddress`, `vehicles` e `deliveries` como tipo BJSON, pois os valores tem uma estrutura com seus campos contextualizada, logo, não há necessidade de criar novas colunas na tabela e os seus valores podem ser modificados dinamicamente. Um banco MongoDB poderia ser usado para armazenar esses dados, mas seria uma dependência irrelevante, por mais que os tipos dos campos internos não sejam tipados pelo banco, o próprio código do servidor garante uma tipagem de acordo com as regras da aplicação.

---

O tipo de dados JSONB (Binary JSON) no PostgreSQL é uma variante do tipo de dados JSON que oferece algumas vantagens sobre o JSON convencional:

Armazenamento mais eficiente: O JSONB é armazenado em formato binário, o que significa que ele ocupa menos espaço do que o JSON convencional e é mais rápido de processar.

Indexação: O JSONB pode ser indexado de forma mais eficiente do que o JSON convencional. Isso significa que as consultas que envolvem filtros baseados em valores JSONB serão executadas mais rapidamente.

Modificação de dados: Com o JSONB, é possível atualizar ou modificar valores específicos em um objeto JSON sem precisar reconstruir todo o objeto. Isso é muito útil para aplicações que precisam atualizar frequentemente valores em objetos JSON de grande tamanho.

Integridade de dados: O JSONB garante a integridade dos dados, pois ele valida a estrutura do objeto JSON antes de armazená-lo.

Em resumo, o uso do tipo de dados JSONB no PostgreSQL oferece uma série de vantagens sobre o uso do JSON convencional, incluindo armazenamento mais eficiente, indexação mais eficiente, modificação de dados mais fácil e garantia de integridade de dados.

---

## Testes Automatizados

Os códigos com regras de negócio foram feitos usando a metodologia TDD. Testes de unidade foram criados para os 3 casos de uso da aplicação.

Foi criado testes de unidade para a class de repositório relacionada aos serviços. logo é necessário que o banco de dados esteja rodando para que os testes executem com sucesso.

Para rodar os testes, execute o comando:

```bash
$ npm run test:server
```

Este comando irá subir o container do banco, garantir a sincronia das tabelas com o Prisma, e por fim executar os testes de unidade.

Existem testes para a classe de repositório e a classe de consumo do serviço do Google, mas a cobertura dos testes foi focada apenas nos arquivos com regras de negócio (casos de uso).

`*` Os testes da classe de consumo da API do Google não consome recursos reais.
`*` Não optei por criar testes de integração.

# Tecnologias

Para o a criação do projeto foram usadas as tecnologias e recursos:

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com)
- [Docker Compose](https://docs.docker.com/compose)
- [NestJS](https://nestjs.com)
- [Node.js](https://nodejs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Jest](https://jestjs.io)
- [Prisma](https://www.prisma.io)
- [PostgreSQL](https://www.postgresql.org)
- [Axios](https://github.com/axios/axios)
- [Google Maps Distance Matrix API](https://developers.google.com/maps/documentation/distance-matrix/start?hl=pt-br)
