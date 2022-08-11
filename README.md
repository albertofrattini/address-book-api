# Address Book API

This API was built as a result of the task and its specification given by STRV during the hiring process.

## Design Choices

- Language: Typescript
- Runtime: Node.js
- Framework: Koa
- Database: PostgreSQL
- ORM: Prisma
- Hosting: Heroku
- CI/CD: Github Actions

## Getting started

### Local Development 

```sh
npm install

// Start postgres docker container
npm run infra

// Push the schema to the database
npm run db:push

npm run dev
```

### Running Tests

Firstly, ensure you have ran `npm run infra` and `npm run db:push` to create the database and provide a schema to it. Afterwards, just run:

```sh
npm run dev
```

### API Example Utilization

<table>
  <tr>
  <th><b>Method</b></th>
  <th><b>Route</b></th>
  <th><b>Example request</b></th> 
  <th><b>Example response</b></th>
  </tr>  
  <tr>
    <td>POST</td>
    <td><b>/v1/signup</b></td>
    <td>
    {
        "email": "example@example.com",
        "password": "passwrod"
    }
    </td>
    <td>
    {
        "email": "example@example.com",
        "accessToken": "xyz"
    }
    </td>  
  </tr>
    <tr>
    <td>POST</td>
    <td><b>/v1/login</b></td>
    <td>
    {
    "email": "example@example.com",
    "password": "password"
    }
    </td>
    <td>
    {
        "email": "example@example.com",
        "accessToken": "xyz"
    }
    </td>  
  </tr>
<tr>
    <td>POST</td>
    <td><b>/v1/contacts</b></td>
    <td>
    {
        headers: {
            "x-access-token": "xyz"
        },
        body: {
             "firstName": "alberto",
            "lastName": "frattini",
            "phoneNumber": "1234",
            "address": "strv street, 20"
        }
    }
    </td>
    <td>
    {
        "firstName": "alberto",
        "lastName": "frattini",
        "phoneNumber": "1234",
        "address": "strv street, 20"
    }
    </td>  
  </tr>    
</table>
