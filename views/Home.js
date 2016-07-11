'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  ScrollView,
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
        <ScrollView ref="_scrollView" horizontal={true} maximumZoomScale={2} minimumZoomScale={0.5} contentContainerStyle={styles.container}>
          <RoomView nav={that.props.navigator} />
        </ScrollView>
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