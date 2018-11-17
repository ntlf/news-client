import React, { Component } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Article from './Article';
import ListInfo from './ListInfo';
import Header from './Header';

const ALL_ARTICLES = gql`
  query allArticles($skip: Int = 0, $first: Int = 10, $text: String = "") {
    articles: allArticlesByDate(skip: $skip, first: $first, text: $text) {
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

const styles = StyleSheet.create({
  loading: {
    padding: 16
  }
});

class Home extends Component {
  static navigationOptions = {
    header: null
  };

  static propTypes = {
    navigation: PropTypes.shape({})
  };

  state = {
    isRefreshing: false,
    searchText: undefined
  };

  onSearch = text => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.setState({ searchText: text });
    }, 500);
  };

  render() {
    const { isRefreshing, searchText } = this.state;

    return (
      <SafeAreaView>
        <Query
          query={ALL_ARTICLES}
          variables={{
            skip: 0,
            first: 10,
            text: searchText
          }}
        >
          {({ loading, data, refetch, fetchMore }) => (
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
              ListHeaderComponent={() => (
                <Header searchText={searchText} onSearch={this.onSearch} />
              )}
              ListFooterComponent={() => {
                if (loading) {
                  return (
                    <ActivityIndicator
                      style={styles.loading}
                      animating
                      size="large"
                    />
                  );
                }

                if (data.articles.length) {
                  return <ListInfo title="No more hits." />;
                }

                return <View />;
              }}
              ListEmptyComponent={() =>
                !loading && <ListInfo title="Nothing found." />
              }
              onEndReached={() => {
                fetchMore({
                  variables: {
                    skip: data.articles.length
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult.articles) return prev;

                    return {
                      ...prev,
                      articles: [...prev.articles, ...fetchMoreResult.articles]
                    };
                  }
                });
              }}
              onEndReachedThreshold={0.5}
            />
          )}
        </Query>
      </SafeAreaView>
    );
  }
}

export default Home;
