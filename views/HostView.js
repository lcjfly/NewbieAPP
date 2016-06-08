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
var LSM = require('./LocalStorageManager');

var HostView = React.createClass({

  getInitialState: function() {
    var host = LSM.fakeHostData[this.props.id] || {name: "", ip:""};
    return {
      name: host.name,
      ip: host.ip
    }
  },

  render() {
  	var content = this.props.content;
    return (
      <ScrollView>
      	<View style={styles.content}>
      		<Text>{this.state.name}</Text>
          <Text>{this.state.ip}</Text>
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

module.exports = HostView;