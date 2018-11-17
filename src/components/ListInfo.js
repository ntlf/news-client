import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    padding: 16,
    textAlign: 'center'
  }
});

const ListInfo = ({ title }) => (
  <View style={styles.title}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

ListInfo.propTypes = {
  title: PropTypes.string
};

export default ListInfo;
