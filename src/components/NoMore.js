import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    padding: 16,
    textAlign: 'center'
  }
});

// eslint-disable-next-line react/prefer-stateless-function
class NoMore extends PureComponent {
  render() {
    return (
      <View style={styles.title}>
        <Text style={styles.title}>No more hits.</Text>
      </View>
    );
  }
}

export default NoMore;
