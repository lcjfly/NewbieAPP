'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = ReactNative;

var Util = require('./util');
var CabinetSidebarUnitView = require('./CabinetSidebarUnitView');

/*
* 机柜侧栏u视图
* uCount: 机柜u数量 int default=42
*/
var CabinetSidebarView = React.createClass({

  getInitialState: function() {
  	var uCount = this.props.uCount ? this.props.uCount : Util.default_u_count;

  	var sidebarUnits = [];
    for(var i=uCount;i>0;i--) {
      sidebarUnits.push(
        <CabinetSidebarUnitView name={i}/>
      );
    }
    return {
      uCount: uCount,
      sidebarUnits: sidebarUnits,
    }
  },

  componentDidMount: function() {

  },
  
  render() {
    return (
      <View style={[styles.cabinetSidebar,{height: Util.default_u_height * this.state.uCount}]}>
        {this.state.sidebarUnits}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  cabinetSidebar: {
  	flex: 1,
    borderWidth: 1,
    borderColor: '#000'
  },
});

module.exports = CabinetSidebarView;