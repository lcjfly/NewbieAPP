'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = ReactNative;

var Service = require('./service');
var WebSocket = require('WebSocket');

var MySocket = React.createClass({

  getInitialState: function() {
    
    return {};
  },

  componentDidMount: function() {
    var ws = new WebSocket(Service.ws_url);
    ws.onopen = () => {
      // connection opened
      console.log('on open');
      ws.send('something');
    };

    ws.onmessage = (e) => {
      // a message was received
      console.log('on message: '+e.data);
    };

    ws.onerror = (e) => {
      // an error occurred
      console.log('on error: '+e.message);
    };

    ws.onclose = (e) => {
      // connection closed
      console.log('on close: '+e.code, e.reason);
    };
  },

  render() {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            home
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

module.exports = MySocket;