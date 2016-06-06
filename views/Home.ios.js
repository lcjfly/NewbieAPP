'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = ReactNative;

var Service = require('./service');
var RoomView = require('./RoomView');

var Home = React.createClass({

  getInitialState: function() {
    
    return {};
  },

  componentDidMount: function() {
    
  },

  render() {
    var that = this;
      return (
        <View style={styles.container}>
          <RoomView nav={that.props.navigator} />
        </View>
      );
    }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

module.exports = Home;