let users = [];
let posts = [];
let idCounterUser = 1;
let idCounterPost = 1;

const resolvers = {
    Query: {
        user: (parent, { id }) => {
            return users.find(user => user.id === Number(id));
        },
        posts: () => posts,
    },
    Mutation: {
        createUser: (parent, { name, email }) => {
            const newUser = { id: idCounterUser++, name, email };
            users.push(newUser);
            return newUser;
        },
        createPost: (parent, { title, content, authorId }) => {
            const newPost = { id: idCounterPost++, title, content, authorId: Number(authorId) };
            posts.push(newPost);
            return newPost;
        },
    },
    User: {
        posts: (parent) => {
            return posts.filter(post => post.authorId === parent.id);
        },
    },
    Post: {
        author: (parent) => {
            return users.find(user => user.id === parent.authorId);
        },
    },
};

module.exports = resolvers;
