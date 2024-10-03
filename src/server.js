require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const {SECRET_KEY} = require("../config");


const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    cors: {
        origin: '*',
        credentials: true,
    },
    context: ({ req }) => {
        const authHeader = req.headers.authorization || '';
        let user = null;

        if (authHeader) {    // check that when want to access any api that is related to the user or not
            const token = authHeader.split(' ')[1]; //  that give the token part
            try {
                user = jwt.verify(token, SECRET_KEY);
            } catch (err) {
                console.error('Invalid token:', err);
                throw new Error('Invalid/Expired token');
            }
        }
        return { user };
    },
});

server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
