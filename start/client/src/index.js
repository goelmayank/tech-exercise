import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";

import Pages from './pages';
import { generateId } from "./lib/toDoHelpers";
import { resolvers, typeDefs } from "./resolvers";

// Set up our apollo-client to point at the server we created
// this can be local or a remote endpoint
const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null
});

// await before instantiating ApolloClient, else queries might run before the cache is persisted
persistCache({
  cache,
  storage: window.localStorage
});

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
    draftToDos: [],
    currentToDo: {
      _id: "5eeafe4ae060af3ce2bfeb34",
      title: "",
      completed: false
    }
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>,
  document.getElementById("root")
);