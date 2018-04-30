import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import SafariView from 'react-native-safari-view'
import { CustomTabs } from 'react-native-custom-tabs'

class Home extends Component {
  static navigationOptions = {
    title: 'HirPlacc'
  }

  state = {
    isRefreshing: false
    // position: {
    //   latitude: undefined,
    //   longitude: undefined
    // }
  }

  onRefresh = async () => {
    this.setState({ isRefreshing: true })

    await this.props.allArticlesQuery.refetch()

    this.setState({ isRefreshing: false })
  }

  // componentDidMount() {
  //   navigator.geolocation.watchPosition(position => {
  //     console.log(position)
  //     this.setState({ position: { latitude: position.coords.latitude, longitude: position.coords.longitude } })
  //   })
  // }

  openWeb = (url) => {
    if (Platform.OS === 'ios') {
      SafariView.show({ url })
    } else {
      CustomTabs.openURL(url)
    }
  }

  render() {
    console.log(this.props.allArticlesQuery)

    if (!this.props.allArticlesQuery.allArticlesByDate) {
      return (<View>
        <Text>
          Loading...
        </Text>
      </View>)
    }

    return (
      this.props.allArticlesQuery.allArticlesByDate && <FlatList
        data={this.props.allArticlesQuery.allArticlesByDate}
        keyExtractor={item => item.id}
        onRefresh={this.onRefresh}
        refreshing={this.state.isRefreshing}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => this.openWeb(item.url)}>
            <View style={styles.card}>
              <Text style={styles.title}>
                {item.title}
              </Text>
              <Text>
                {item.description}
              </Text>
              <Text style={styles.sourceDomain}>
                {item.source_domain}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 16
  },
  sourceDomain: {
    marginTop: 8,
    textAlign: 'right'
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 2,
    margin: 8,
    padding: 16
  }
})

const allArticlesQuery = gql`
  query AllArticlesQuery {
    allArticlesByDate(first: 10) {
      id
      title
      source_domain
      title_page
      description
      url
    }
  }`

export default graphql(allArticlesQuery, {
  name: 'allArticlesQuery'
})(Home)
