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

var CabinetDetail = React.createClass({
  componentDidMount: function() {

  },
  
  render() {
  	var cabinet = this.props.cabinet;
    return (
      <ScrollView>
      	<View style={styles.content}>
      		<Text>{cabinet.name}</Text>
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

module.exports = CabinetDetail;