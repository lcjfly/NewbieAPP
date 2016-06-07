'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
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

  _showHostDetail: function() {
    if(this.state.slotName) {
      Alert.alert('You clicked '+this.state.slotName);
    }
  },
  
  render() {
    return (
      <View style={styles.slotViewContainer}>
      {this.state.slotName == '' ?
          <View style={styles.cabinetUnitRowSlot}>
          	<Text style={styles.cabinetUnitRowSlotName}>{this.state.slotName}</Text>
          </View>
        :
        <TouchableHighlight onPress={this._showHostDetail} style={{flex: 1}}>
          <View style={styles.cabinetUnitRowSlot}>
            <Text style={styles.cabinetUnitRowSlotName}>{this.state.slotName}</Text>
          </View>
        </TouchableHighlight>
      }
    </View>
    );
  }
});

const styles = StyleSheet.create({
  slotViewContainer: {
    flex: 1,
  },
  cabinetUnitRowSlot: {
    flex: 1,
  	alignItems: 'center',
  	borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center'
  },
  cabinetUnitRowSlotType: {
  	
  },
  cabinetUnitRowSlotName: {
    flexDirection: 'column',
  }
});

module.exports = CabinetUnitRowSlotView;