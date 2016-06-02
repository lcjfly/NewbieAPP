'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = ReactNative;

var Util = require('./util');

/*
* 机柜侧栏u视图
* name: 名称 string e.g 1u/2u
*/
var CabinetSidebarUnitView = React.createClass({

  getInitialState: function() {
    return {
      name: this.props.name,
    }
  },

  componentDidMount: function() {

  },
  
  render() {
  	var cabinet = this.props.cabinet;
    return (
      <View style={styles.cabinetSidebarUnit}>
        <Text style={styles.cabinetSidebarUnitText}>{this.state.name}</Text>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  cabinetSidebarUnit: {
  	height: Util.u_height,
  	borderWidth: 1,
    borderColor: '#333',
  },
  cabinetSidebarUnitText: {
    textAlign: 'center',
    lineHeight: Util.u_height,
  },
});

module.exports = CabinetSidebarUnitView;