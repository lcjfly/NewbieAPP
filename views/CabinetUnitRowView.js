'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = ReactNative;

var Util = require('./util');
var CabinetUnitRowSlotView = require('./CabinetUnitRowSlotView');

/*
* 机柜u的slot行视图
* uCount: 占据的u数量（用来计算view高度）
* cCount: 列数
* rowSlotDatas: 插槽数据 [{index, id, name, type...}] index从0开始
*/
var CabinetUnitRowView = React.createClass({
  
  getInitialState: function() {
    var rowSlotDatas = this.props.rowSlotDatas;
    var cCount = parseInt(this.props.cCount.toString());
    
    // 初始化row中的数据为默认数据
    var that = this;
    var rowSlotViews = [];
    for(var i=0;i<cCount;i++) {
      rowSlotViews.push(
        <CabinetUnitRowSlotView slotName="" slotType="" />);
    }

    for(var i=0;i<rowSlotDatas.length;i++) {
      var index = rowSlotDatas[i].index % cCount;
      rowSlotViews[index] = <CabinetUnitRowSlotView nav={that.props.nav} slotId={rowSlotDatas[i].slotId} slotName={rowSlotDatas[i].slotName} slotType={rowSlotDatas[i].slotType} />;
    }

    return {
      rowSlotViews: rowSlotViews
    }
  },

  componentDidMount: function() {

  },
  
  render() {
    return (
      <View style={styles.cabinetUnitRowSlot}>
      	{this.state.rowSlotViews}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  cabinetUnitRowSlot: {
    flex: 1,
  	flexDirection: 'row',
  },
  cabinetUnitRowSlotName: {
  	
  },
  cabinetUnitRowSlotType: {
  }
});

module.exports = CabinetUnitRowView;