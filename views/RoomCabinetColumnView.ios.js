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
var Util = require('./util');
var RoomCabinetView = require('./RoomCabinetView');

/*
* 机房机柜列视图
* cabinetCount: 机柜数量 默认值：Util.default_cabinet_count_per_column
* roomCabinetColumnDatas: 机柜数据 [{index, name}] index从0开始
*/
var RoomCabinetColumnView = React.createClass({

  getInitialState: function() {
    var that = this;
  	var roomCabinetColumnDatas = this.props.roomCabinetColumnDatas;
  	var roomCabinetViews = [];
  	// 初始化一列机柜默认数据
  	var cabinetCount = this.props.cabinetCount ? this.props.cabinetCount : Util.default_cabinet_count_per_column;
  	for(var i=0;i<cabinetCount;i++) {
  		roomCabinetViews.push(
  			<RoomCabinetView nav={that.props.nav} name="" />);
  	}

  	for(var i=0;i<roomCabinetColumnDatas.length;i++) {
  		roomCabinetViews[roomCabinetColumnDatas[i].index] = <RoomCabinetView nav={that.props.nav}  name={roomCabinetColumnDatas[i].name} />;
  	}
    return {
    	roomCabinetViews: roomCabinetViews
    };
  },

  componentDidMount: function() {
    
  },

  render() {
    return (
      <View>
        <View style={styles.roomCabinetColumn}>
          {this.state.roomCabinetViews}
        </View>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  roomCabinetColumn: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: '#0f0'
  },
});

module.exports = RoomCabinetColumnView;