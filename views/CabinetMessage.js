'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} = ReactNative;

var Util = require('./util');
var Service = require('./service');

var CabinetMessage = React.createClass({
  getInitialState: function() {
    return {
    	id: this.props.id
    }
  },

  componentDidMount: function() {

  },

  _onClick: function() {
        Alert.alert('you clicked the msg');
    },

  render() {

    return (
          <TouchableOpacity onPress={this._onClick}>
	          <View>
	            <Text style={{color: '#000'}}>{this.state.id}</Text>
	          </View>
          </TouchableOpacity>
    );
  },

});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    flexDirection: 'column'
  },
 
});

module.exports = CabinetMessage;