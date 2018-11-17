import React from 'react';
import {
  Platform,
  ImageBackground,
  StyleSheet,
  Text,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import { SearchBar, Icon } from 'react-native-elements';
import backgroundImage from './background.jpg';

const styles = StyleSheet.create({
  loading: {
    padding: 16
  },
  header: {
    position: 'relative',
    height: 160
  },
  brandWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleWrapper: {
    marginTop: 24,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: '#fafafadd'
  },
  title: {
    color: '#393e42F3',
    paddingHorizontal: 8,
    borderRadius: 4,
    fontSize: 32,
    fontFamily: Platform.OS === 'ios' ? 'Baskerville' : 'serif',
    fontWeight: 'bold'
  },
  searchContainer: {
    margin: 8,
    backgroundColor: null,
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  searchInput: {
    backgroundColor: '#fafafadd',
    color: '#393e42'
  },
  settings: {
    position: 'absolute',
    top: 16,
    right: 16,
    paddingTop: 4,
    paddingRight: 4,
    paddingBottom: 4,
    paddingLeft: 4,
    backgroundColor: '#393e42F3',
    borderRadius: 2
  }
});

const Header = ({ onSearch, searchText, onSettingsPress }) => (
  <ImageBackground
    style={{
      backgroundColor: '#ccc',
      flex: 1,
      resizeMode: 'center',
      width: '100%',
      height: '100%',
      justifyContent: 'center'
    }}
    source={backgroundImage}
  >
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#393e4266'
      }}
    />
    <View style={styles.header}>
      <View style={styles.brandWrapper}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>HirPlacc</Text>
        </View>
      </View>
      <SearchBar
        lightTheme
        containerStyle={styles.searchContainer}
        inputStyle={styles.searchInput}
        onChangeText={onSearch}
        onClearText={() => {}}
        placeholder="Search..."
        defaultValue={searchText}
      />

      <View style={styles.settings}>
        <Icon
          underlayColor="#393e42AA"
          name="settings"
          color="#e1e8ee"
          onPress={onSettingsPress}
        />
      </View>
    </View>
  </ImageBackground>
);

Header.propTypes = {
  searchText: PropTypes.string,
  onSearch: PropTypes.func,
  onSettingsPress: PropTypes.func
};

export default Header;
