import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  View
} from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ListInfo from './ListInfo';

const ALL_SITES = gql`
  query AllSites {
    allSites {
      id
      domain
    }
  }
`;

const styles = StyleSheet.create({
  loading: {
    padding: 16
  },
  domain: {
    fontWeight: 'bold',
    fontSize: 16
  },
  card: {
    borderRadius: 2,
    margin: 8,
    padding: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  switch: {}
});

class Settings extends Component {
  static navigationOptions = {
    title: 'Settings'
  };

  state = {
    disabledSites: []
  };

  componentDidMount = async () => {
    const disabledSites =
      JSON.parse(await AsyncStorage.getItem('DISABLED_SITES')) || [];

    this.setState({ disabledSites });
  };

  render() {
    const { disabledSites } = this.state;

    return (
      <Query query={ALL_SITES}>
        {({ loading, data }) => (
          <FlatList
            data={data.allSites}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.domain}>{item.domain}</Text>
                <Switch
                  onValueChange={value => {
                    const newDisabledSites = [...disabledSites];

                    if (value) {
                      const index = disabledSites.indexOf(item.domain);

                      if (index !== -1) {
                        newDisabledSites.splice(index, 1);
                      }
                    } else {
                      newDisabledSites.push(item.domain);
                    }

                    this.setState({
                      disabledSites: newDisabledSites
                    });
                    AsyncStorage.setItem(
                      'DISABLED_SITES',
                      JSON.stringify(newDisabledSites)
                    );
                  }}
                  value={disabledSites.indexOf(item.domain) === -1}
                />
              </View>
            )}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 1,
                  width: '100%',
                  backgroundColor: '#c5c5c5'
                }}
              />
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

              return <View />;
            }}
            ListEmptyComponent={() =>
              !loading && <ListInfo title="Nothing found." />
            }
          />
        )}
      </Query>
    );
  }
}

export default Settings;
