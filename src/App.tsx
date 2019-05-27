import React from 'react';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from 'react-apollo';
import Feed from './Feed';

const httpLink = new HttpLink({ uri: 'http://localhost:4000/' })

   // create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink.concat(httpLink),
  cache: new InMemoryCache()
})

const App: React.FC = () => (
  <ApolloProvider client={apolloClient}>
    <Feed />
  </ApolloProvider>
);

export default App;
