import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Article from './Article';

const ALL_ARTICLES = gql`
  query allArticles($skip: Int = 0, $first: Int = 10) {
    articles: allArticlesByDate(skip: $skip, first: $first) {
      id
      title
      source_domain
      title_page
      description
      url
      image_url
      date_publish
    }
  }
`;

class Home extends Component {
  static navigationOptions = {
    title: 'HirPlacc'
  };

  state = {
    isRefreshing: false
  };

  render() {
    const { isRefreshing } = this.state;

    return (
      <Query
        query={ALL_ARTICLES}
        variables={{
          skip: 0,
          first: 10
        }}
      >
        {({ loading, data, refetch, fetchMore }) => {
          if (!data.articles && loading) {
            return (
              <View>
                <Text>Loading...</Text>
              </View>
            );
          }

          return (
            <FlatList
              data={data.articles}
              keyExtractor={item => item.id}
              onRefresh={async () => {
                this.setState({ isRefreshing: true });

                await refetch();

                this.setState({ isRefreshing: false });
              }}
              refreshing={isRefreshing}
              renderItem={({ item }) => <Article data={item} />}
              ListFooterComponent={() => (
                <ActivityIndicator animating size="large" />
              )}
              onEndReached={() => {
                fetchMore({
                  variables: {
                    skip: data.articles.length
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    return {
                      ...prev,
                      articles: [...prev.articles, ...fetchMoreResult.articles]
                    };
                  }
                });
              }}
              onEndReachedThreshold={0}
            />
          );
        }}
      </Query>
    );
  }
}

export default Home;
