import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";

import Pages from './pages';

import { resolvers, typeDefs } from "./resolvers";

// Set up our apollo-client to point at the server we created
// this can be local or a remote endpoint
const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: "http://localhost:4000/graphql"
  }),
  resolvers,
  typeDefs
});

cache.writeData({
  data: {
    draftToDos: []
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>,
  document.getElementById("root")
);