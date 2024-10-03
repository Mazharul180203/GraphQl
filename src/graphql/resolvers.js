const jwt = require('jsonwebtoken');
const nodeData = require('../files/node.json');
const actionData = require('../files/action.json');
const responseData = require('../files/response.json');
const resourceTemplateData = require('../files/resourceTemplate.json');
const triggerData = require('../files/trigger.json');
const {SECRET_KEY} = require("../../config");


const resolvers = {
    Mutation: {
        login: (_, { username, password }) => {
            if (username === 'testuser' && password === 'password123') {  // static usename and password is set for this applciation it can make dynamic when we use the database
                const user = { id: 1, username };
                const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
                return token;
            } else {
                throw new Error('Invalid credentials');
            }
        },
    },
    Query: {
        node: (_, { nodeId }, context) => {
            if (!context.user) {
                throw new Error('You must be authenticated');
            }

            const node = nodeData.find(node => node._id === nodeId);
            if (!node) {
                throw new Error(`Node with ID ${nodeId} not found`);
            }
            return node;
        },
        triggers: (_, __, context) => {
            if (!context.user) {
                throw new Error('You must be authenticated');
            }
            return triggerData;
        },
    },
    NodeObject: {
        actions: (parent) => {
            if (!parent.actions) return [];
            return actionData.filter(action => parent.actions.includes(action._id));
        },
        responses: (parent) => {
            if (!parent.responses) return [];
            return responseData.filter(response => parent.responses.includes(response._id));
        },
        trigger: (parent) => {
            return triggerData.find(trigger => trigger._id === parent.trigger);
        },
        resourceTemplate: (parent) => {
            return resourceTemplateData.find(resourceTemplate => resourceTemplate._id === parent.resourceTemplateId);
        },
    },
};

module.exports = resolvers;
