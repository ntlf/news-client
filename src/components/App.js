import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { StackNavigator } from 'react-navigation';
import Home from './Home';
import Settings from './Settings';

const client = new ApolloClient({
  uri: 'https://api.graph.cool/simple/v1/cjcol6bod1cuh0170hkw0xf51'
});

const AppNavigator = StackNavigator(
  {
    Home: {
      screen: Home
    },
    Settings: {
      screen: Settings
    }
  },
  {
    initialRouteName: 'Home'
  }
);

const App = () => (
  <ApolloProvider client={client}>
    <AppNavigator />
  </ApolloProvider>
);

export default App;
