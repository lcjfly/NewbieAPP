'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = ReactNative;

var Util = require('./util');
var CabinetUnitRowView = require('./CabinetUnitRowView');

/*
* 机柜u视图
* uStart: 开始位置 int
* uEnd: 结束位置 int 
* unitRowCount: unit行数 default=1
* unitColumnCount: unit列数 default=1
* slotDatas: 插槽数据 [{index, id, name, type...}]
*/
var CabinetUnitView = React.createClass({

  getInitialState: function() {
  	var unitRowCount = this.props.unitRowCount ? this.props.unitRowCount : 1,
  		unitColumnCount = this.props.unitColumnCount ? this.props.unitColumnCount : 1,
  		uCount = this.props.uEnd - this.props.uStart + 1,
  		slotDatas = this.props.slotDatas;
  	
  	// 分配相应index的数据至正确的行
    var that = this;
  	var unitRowViews = [];
  	for(var i=0;i<unitRowCount;i++) {
  		var rowSlotDatas = [];
  		for(var j=0;j<slotDatas.length;j++) {
  			if(parseInt(slotDatas[j].index/unitColumnCount) == i) {
  				rowSlotDatas.push(slotDatas[j]);
  			}
  		}
  		var rowUCount = uCount/unitRowCount;
  		unitRowViews[i] = <CabinetUnitRowView nav={that.props.nav} cCount={unitColumnCount} uCount={rowUCount} rowSlotDatas={rowSlotDatas} />;
  	}

    return {
      uStart: this.props.uStart,
      uEnd: this.props.uEnd,
      uCount: uCount,
      unitRowCount: unitRowCount,
      unitColumnCount: unitColumnCount,
      unitRowViews: unitRowViews
    }
  },

  componentDidMount: function() {

  },
  
  render() {
  	var that = this;
    return (
      <View style={[styles.cabinetUnit, {height: Util.default_u_height * that.state.uCount}]}>
      	{this.state.unitRowViews}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  cabinetUnit: {
    flexWrap: 'nowrap',
    flexDirection: 'column'
  },
});

module.exports = CabinetUnitView;