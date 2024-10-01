const nodeData = require('../files/node.json');
const actionData = require('../files/action.json');
const responseData = require('../files/response.json');
const resourceTemplateData = require('../files/resourceTemplate.json');
const triggerData = require('../files/trigger.json');

const resolvers = {
    Query: {
        node: (_, { nodeId }) => {
            return nodeData.find(node => node._id === nodeId);
        },
        triggers: () => {
            return triggerData;
        }
    },
    NodeObject: {
        actions: (parent) => {
            return actionData.filter(action => parent.actions && parent.actions.includes(action._id));
        },
        responses: (parent) => {
            return responseData.filter(response => parent.responses && parent.responses.includes(response._id));
        },
        trigger: (parent) => {
            return triggerData.find(trigger => trigger._id === parent.trigger);
        },
        resourceTemplate: (parent) => {
            return resourceTemplateData.find(resourceTemplate => resourceTemplate._id === parent.resourceTemplateId);
        }
    }
};

module.exports = resolvers;
