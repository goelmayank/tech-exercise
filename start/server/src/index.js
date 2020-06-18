require('dotenv').config();

import { ApolloServer } from 'apollo-server';

import resolvers from './resolvers';
import typeDefs from './schema';
import logger from './logger';

import Todos from './datasources/todos';

// creates a sequelize connection once. NOT for every request
const { createStore } = require('./utils');
const store = createStore();

// set up any dataSources our resolvers need
const dataSources = () => ({
  todosAPI: new Todos({ store }),
});

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  introspection: true,
  playground: true,
});

Promise.resolve()
  .then(() => logger.info('Starting server...'))
  .then(() => server.listen())
  .then(async ({ url }) => {
    logger.info(`🚀  Server ready at ${url}`);
  })
  .catch((e) => {
    logger.error(e, 'Impossible to initialize Apollo Server');
  });
