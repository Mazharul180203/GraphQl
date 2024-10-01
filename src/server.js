const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const authHeader = req.headers.authorization || '';
        if (!authHeader.startsWith('Bearer ')) {
            throw new Error('Authorization token missing or invalid');
        }
        const token = authHeader.split(' ')[1];
    }
});

server.listen().then(({ url }) => {
    console.log(` Server ready at ${url}`);
});
