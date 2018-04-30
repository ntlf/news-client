import React, { Component } from 'react'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { StackNavigator } from 'react-navigation';
import Home from './Home'
import Detail from './Detail'


const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjcol6bod1cuh0170hkw0xf51' }),
  cache: new InMemoryCache()
})

const AppNavigator = StackNavigator({
  Home: {
    screen: Home
  },
  Detail: {
    screen: Detail
  }
}, {
  initialRouteName: 'Home'
})

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppNavigator />
      </ApolloProvider>
    )
  }
}
