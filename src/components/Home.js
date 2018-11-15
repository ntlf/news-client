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
import { SearchBar } from 'react-native-elements';
import Article from './Article';
import NoMore from './NoMore';

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
  static navigationOptions = ({ navigation }) => ({
    title: 'HirPlacc',
    header: (
      <SafeAreaView style={{ backgroundColor: '#393e42' }}>
        <View>
          <SearchBar
            onChangeText={
              navigation.state.params
                ? navigation.state.params.onSearch
                : () => {}
            }
            onClearText={() => {}}
            placeholder="Search..."
          />
        </View>
      </SafeAreaView>
    )
  });

  static propTypes = {
    navigation: PropTypes.shape({})
  };

  state = {
    isRefreshing: false,
    searchText: undefined
  };

  componentDidMount() {
    const { navigation } = this.props;

    navigation.setParams({ onSearch: this.onSearch });
  }

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
            ListFooterComponent={() =>
              loading ? (
                <ActivityIndicator
                  style={styles.loading}
                  animating
                  size="large"
                />
              ) : (
                <NoMore />
              )
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
    );
  }
}

export default Home;
