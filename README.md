# Fastify Backend

## Preface

Sample Backend handling, validating and sanitizing form data. This backend was made by Erik Jensson (github author) as a case work.

## Getting Started

Clone, install the dependencies then start the server.

```
$ git clone git@github.com:Ericrulec/case-backend.git
$ npm install
$ npm start
```

## Why Fastify

I have almost exclusively used Express.js for my projects, Express is mature but it also comes with a lot of overhead. So I thought it timely to try out an alternative. Introducing Fastify.

Fastify is a fast and low overhead framework for Node.js. The webframework is as close as you can get to native Node.js speed, with the same convenience and abstractions that Express.js offers.

## Validating and Indentifying Spam

The Request body is first validated against the _JSON schema_. Afterwards we check for any autofill bot activities, appropriately named _honeypot_. Then we run a _URL regex_ against the request body to deny any malicous URLs. Finally we compare `body.zipcode` and `body.city` to the Bring.no zipcode database.

> **Note**
> The schema is trying to match a Norwegian telephone-number / zipcode / city, anything else will fail.

## API Examples

- Submit

  - Method and Headers

  ```
  POST /submit HTTP/1.1
  Host: localhost:3000
  Content-Type: application/json
  ```

  - Request Body

  ```json
  {
    "name": "Erik",
    "address": "Plassen",
    "zipcode": "0001",
    "city": "Oslo",
    "country": "Norway",
    "tlf": "88888888",
    "email": "erik.email@gmail.com",
    "honeypot": ""
  }
  ```

  - Response Body: 200

  ```json
  {
    "status": "success"
  }
  ```

  - Response Body: 4xx

  ```json
  {
    "status": "failure",
    "message": "Bad parameters"
  }
  ```

## Next

Many steps have been made to prevent unwanted forms, unfortunately the protection against spam is subpar at best. Most targeted spam bots are sophisticated enough to bypass the restrictions this app employs. Below are further examples to limit spam.

- Further steps to prevent spam:
  - Enable Recaptcha
  - Email verification
  - Blocking or limiting IP addresses
  - Adding questions in form submissions

All of these steps will help prevent spam, although at the cost of convenience.

### At Scale

At scale we can create a well defined JSON schema for each site. We would then have a single endpoint _/submit_ that would match the incoming request with a corresponding schema and subrouter through something like a header.

```
schemas
    ├── somesite2_schema.js
    └── somesite1_schema.js
```
