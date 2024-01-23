import React from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import App from './App';


const httpLink = new HttpLink({
  uri: "https://stage.gql.101internet.ru",
  fetch: fetch,
});

const customLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: "Basic MTAxaW50ZXI6dGVzdDEwMQ==",
    },
  };
});

const client = new ApolloClient({
  link: customLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

