import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import SafariView from 'react-native-safari-view';
import { CustomTabs } from 'react-native-custom-tabs';
import timeago from 'timeago.js';

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8
  },
  sourceDomain: {
    marginTop: 8,
    textAlign: 'left'
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 2,
    margin: 8,
    padding: 16
  },
  content: {
    flex: 1,
    flexDirection: 'row'
  },
  imageWrapper: {
    width: 100,
    height: 100
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  textWrapper: {
    marginRight: 16,
    flex: 1
  }
});

class Article extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({}).isRequired
  };

  openWeb = url => {
    if (Platform.OS === 'ios') {
      SafariView.show({ url });
    } else {
      CustomTabs.openURL(url);
    }
  };

  render() {
    const { data } = this.props;

    return (
      <TouchableOpacity onPress={() => this.openWeb(data.url)}>
        <View style={styles.card}>
          <View style={styles.content}>
            <View style={styles.textWrapper}>
              <Text style={styles.title}>{data.title}</Text>
              <Text>{data.description}</Text>
            </View>
            <View style={styles.imageWrapper}>
              <Image style={styles.image} source={{ uri: data.image_url }} />
            </View>
          </View>
          <View>
            <Text style={styles.sourceDomain}>
              {data.source_domain} | {timeago().format(data.date_publish)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Article;
