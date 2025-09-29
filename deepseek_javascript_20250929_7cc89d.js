// graphql-app/schema.js
const typeDefs = `
  type Query {
    hello: String
  }
`;
const resolvers = {
  Query: { hello: () => 'Hello GraphQL!' }
};