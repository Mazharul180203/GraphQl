const nodeData = require('../files/node.json');
const actionData = require('../files/action.json');
const responseData = require('../files/response.json');
const resourceTemplateData = require('../files/resourceTemplate.json');
const triggerData = require('../files/trigger.json');

const resolvers = {
    Query: {
        node: (_, { nodeId }) => {
            const node = nodeData.find(node => node._id === nodeId);
            if (!node) {
                throw new Error(`Node with ID ${nodeId} not found`);
            }
            return node;
        },
        triggers: () => triggerData,
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
