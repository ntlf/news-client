import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Settings extends Component {
  static navigationOptions = {
    title: 'Settings'
  };

  render() {
    return (
      <View>
        <Text>Settings</Text>
      </View>
    );
  }
}

export default Settings;
