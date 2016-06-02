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
* 机柜u的slot视图
* [
* {slotName: 插槽主机名称 string,
* slotType: 插槽主机类型 string}
* ]
*/
var CabinetUnitRowSlotView = React.createClass({

  getInitialState: function() {
    return {
      slotName: this.props.slotName,
      slotType: this.props.slotType,
    }
  },

  componentDidMount: function() {

  },
  
  render() {
    return (
      <View style={styles.cabinetUnitRowSlot}>
      	<Text style={styles.cabinetUnitRowSlotName}>{this.state.slotName}</Text>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  cabinetUnitRowSlot: {
    flex: 1,
  	flexDirection: 'column',
  	justifyContent: 'center',
  	alignItems: 'center',
  	borderWidth: 1,
    borderColor: '#fff',
  },
  cabinetUnitRowSlotType: {
  	
  },
  cabinetUnitRowSlotName: {
    flexDirection: 'column',
  }
});

module.exports = CabinetUnitRowSlotView;