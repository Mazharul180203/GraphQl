const {gql} = require('apollo-server');

const typeDefs = gql`
   type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!  # Relationship to include posts
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!  # Relationship back to user
  }

  type Query {
    user(id: ID!): User
    posts: [Post!]!
  }

  type Mutation {
    createUser(name: String!, email: String!): User
    createPost(title: String!, content: String!, authorId: ID!): Post
  }
`;

module.exports = typeDefs;