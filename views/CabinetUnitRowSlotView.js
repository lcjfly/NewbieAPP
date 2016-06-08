'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = ReactNative;

var Util = require('./util');
var HostView = require('./HostView');

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
      slotId: this.props.slotId,
      slotName: this.props.slotName,
      slotType: this.props.slotType,
    }
  },

  componentDidMount: function() {

  },

  _showHostDetail: function() {
    var that = this;
    if(this.state.slotName) {
      //Alert.alert('You clicked '+this.state.slotName);
      that.props.nav.push({
        title: this.state.slotName,
        component: HostView,
        passProps: {
          id: that.state.slotId
        },
      });
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
        <TouchableOpacity onPress={this._showHostDetail} style={{flex: 1}}>
          <View style={styles.cabinetUnitRowSlot}>
            <Text style={styles.cabinetUnitRowSlotName}>{this.state.slotName}</Text>
          </View>
        </TouchableOpacity>
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
    borderColor: '#000',
    justifyContent: 'center'
  },
  cabinetUnitRowSlotType: {
  	
  },
  cabinetUnitRowSlotName: {
    flexDirection: 'column',
  }
});

module.exports = CabinetUnitRowSlotView;