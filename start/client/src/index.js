import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";

import Pages from './pages';

import { resolvers } from "./resolvers";
import "./styles.css";

// Set up our apollo-client to point at the server we created
// this can be local or a remote endpoint
const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: "http://localhost:4000/graphql",
    headers: {
      authorization: localStorage.getItem("token"),
      "client-name": "Space Explorer [web]",
      "client-version": "1.0.0"
    }
  }),
  resolvers
  // typeDefs
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem("token"),
    cartItems: []
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>,
  document.getElementById("root")
);