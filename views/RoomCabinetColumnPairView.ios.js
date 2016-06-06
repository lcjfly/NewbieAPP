'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  AlertIOS,
  ScrollView,
  StyleSheet,
  Text,
  View,
} = ReactNative;

var Service = require('./service');
var RoomCabinetColumnView = require('./RoomCabinetColumnView');

/*
* 机房机柜对（最多2列）视图
* roomCabinetColumnPairDatas: 机柜列数据 [[{index, name, type}]+] index从0开始
*/
var RoomCabinetColumnPairView = React.createClass({

  getInitialState: function() {
    var that = this;
  	var roomCabinetColumnPairDatas = this.props.roomCabinetColumnPairDatas;
	  var roomCabinetColumnViews = [];
	  for(var i=0;i<roomCabinetColumnPairDatas.length;i++) {
	  	roomCabinetColumnViews.push(
	  		<RoomCabinetColumnView nav={that.props.nav} roomCabinetColumnDatas={roomCabinetColumnPairDatas[i]} />);
	  }
    return {
    	roomCabinetColumnViews: roomCabinetColumnViews
    };
  },

  componentDidMount: function() {
    
  },

  render() {
    return (
      <View>
        <View style={styles.cabinetColumnPair}>
          {this.state.roomCabinetColumnViews}
        </View>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  cabinetColumnPair: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 50,
    paddingLeft: 50,
    paddingRight: 50,
    borderWidth: 1,
    borderColor: '#00f'
  },
});

module.exports = RoomCabinetColumnPairView;