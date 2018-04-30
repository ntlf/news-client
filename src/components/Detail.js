import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Linking,
  TouchableOpacity
} from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class Detail extends Component {
  static navigationOptions = {
    title: 'Hír'
  }

  render() {
    if (!this.props.postQuery.PostView) {
      return (<View>
        <Text>
          Loading...
        </Text>
      </View>)
    }

    return (
      this.props.postQuery.PostView &&
      <ScrollView>
        <View style={styles.card}>
          <Text style={styles.title}>
            {this.props.postQuery.PostView.title}
          </Text>
          <Image
            style={styles.image}
            resizeMode={'contain'}
            source={{ uri: this.props.postQuery.PostView.imageUrl }}
          />
          <Text>
            {this.props.postQuery.PostView.text}
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL(this.props.postQuery.PostView.link)}>
            <Text style={styles.source}>{this.props.postQuery.PostView.link}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 18
  },
  source: {
    color: '#0095ff',
    marginTop: 16,
    marginBottom: 16
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 2,
    margin: 8,
    padding: 16
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 16,
    marginBottom: 16
  }
})

const PostQuery = gql`
  query PostQuery($id: ID!) {
    PostView(id: $id) {
      id
      link
      title
      imageUrl
      sourceDomain
      text
      location
    }
  }`

export default graphql(PostQuery, {
  name: 'postQuery',
  options: ({ navigation }) => ({
    variables: {
      id: navigation.state.params.id
    }
  })
})(Detail)
