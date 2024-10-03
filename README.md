# GraphQL API with Token-Based Authentication

This project implements a GraphQL API using Apollo Server with token-based authentication. Users can log in to obtain a JWT token, which is required to access protected routes.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
    - [Login Mutation](#login-mutation)
    - [Protected Queries](#protected-queries)
- [Testing with Postman](#testing-with-postman)
- [Token Generation and Usage](#token-generation-and-usage)
- [Contributing](#contributing)
- [License](#license)

## Features
- **User Authentication**: Secure login with username and password.
- **JWT Token Generation**: Generate a token upon successful login.
- **Protected Routes**: Access sensitive data only with a valid token.

## Technologies Used
- Node.js
- Apollo Server
- GraphQL
- JWT (JSON Web Tokens)
- dotenv for environment variable management

## Setup

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```
2. **Install Dependencies:**
    ```bash
   npm install
   ```
3. **Create config.js File: I explore the config.js file for the project where the secret key is added but normaly it must hide when we push in git for the security purpose:**
    ```bash
    SECRET_KEY=your_very_secure_secret_key
   ```
4. **Start the Server:**:
    ```
   npm run dev
   ```
   **The server will run at http://localhost:4000/graphql**


## API Endpoints
### Login Mutation

#### Endpoint: /graphql
#### Method: POST


#### Request Body
```bash
    mutation {
      login(username: "testuser", password: "password123")
    }
```
#### Response
On successful login, you will receive a JWT token:

```bash
    {
  "data": {
    "login": "your_jwt_token_here"
  }
}
```

## Protected Queries

1.**Get Node by ID**:    
#### Endpoint: /graphql
#### Method: POST

#### Request Body

```bash
 query GetNode($nodeId: ID!) {
  node(nodeId: $nodeId) {
    _id
    name
    description
    actions {
      _id
      name
    }
    responses {
      _id
      name
    }
  }
}
``` 
### Variables

```bash
 {
  "nodeId": "your_node_id_here"
}

``` 

2.**Get All Triggers**:  

#### Endpoint: /graphql
#### Method: POST

#### Request Body   

```bash
query {
  triggers {
    _id
    name
    description
  }
}


``` 

## Authorization Header 
As with the previous queries, include the token in the Authorization header: 

```bash
 Authorization: Bearer your_jwt_token_here
``` 

## Testing with Postman

1. **Open Postman and create a new request.**
2. **Set Method: Change to POST.**:
3. **Set URL: http://localhost:4000/graphql.**
4. **Set Body: Choose GraphQL and enter the appropriate query.**
5. **Set Headers:** 
    - For protected queries, add the Authorization header with the token.
    - Example
      ```bash
      Key: Authorization
      Value: Bearer your_jwt_token_here
    ```
   
## Token Generation and Usage
    - After logging in and receiving a token, use it to access protected routes.
    - Include the token in the Authorization header for any request that requires authentication.

## I attached the Postman API Documentation in a folder