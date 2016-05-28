'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = ReactNative;

var Favirate = React.createClass({
	render() {
	    return (
	      <View style={styles.container}>
	        <Text style={styles.welcome}>
	          Favirate
	        </Text>
	      </View>
	    );
  	}
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

module.exports = Favirate;