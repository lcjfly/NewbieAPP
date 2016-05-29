'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = ReactNative;

var Util = require('./util');
var Service = require('./service');

var Host = React.createClass({
  render() {
    return (
      <TouchableOpacity onPress={this._loadPage.bind(this, this.props.data)}>
      	<View style={styles.item}>
      	  <View style={styles.icon}>
      	  	<Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>{this.props.type}</Text>
      	  </View>
      	  <View style={{flexDirection: 'column', flex: 1}}>
      	  	<Text numberOfLines={2} style={styles.itemname}>
      	  		{this.props.hostname}
      	  	</Text>
      	  	<Text style={styles.itemip}>
      	  		{this.props.ip}
      	  	</Text>
      	  </View>
      	</View>
      </TouchableOpacity>
    );
  },

  _loadPage: function(data) {
  	var item = data;
  	this.props.nav.push({
  		title: this.props.hostname,
  		component: this.props.component,
  		passProps: {
  			item: item
  		}
  	});
  }
});

const styles = StyleSheet.create({
  item: {
    height: 80,
    padding: 5,
    borderBottomWidth: Util.pixel,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    height: 50,
    width: 50,
    borderRadius: 4,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#05C147',
    marginRight: 10
  },
  itemname: {
  	flex: 1,
  	marginBottom: 5,
  	opacity: 0.7
  },
  itemip: {
  	color: '#ccc',
  	fontSize: 11
  }
});

module.exports = Host;