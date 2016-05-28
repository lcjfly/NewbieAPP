'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = ReactNative;

var Util = require('./util');
var Service = require('./service');

var Detail = React.createClass({
  render() {
  	var content = this.props.content;
    return (
      <ScrollView>
      	<View style={styles.content}>
      		<Text>item detail</Text>
      	</View>
      </ScrollView>
    );
  }
});

const styles = StyleSheet.create({
  content: {
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    opacity: 0.85
  }
});

module.exports = Detail;