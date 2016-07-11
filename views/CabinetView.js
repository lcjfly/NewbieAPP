'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = ReactNative;

var Util = require('./util');
var CabinetSidebarView = require('./CabinetSidebarView');
var CabinetUnitView = require('./CabinetUnitView');
var LSM = require('./LocalStorageManager');

/*
* 机柜视图
* name: 名称 string
* uCount: unit数量 int default=42
* uDatas: unit数据 [{uStart, uEnd, unitRowCount, unitColumnCount, [{index, name, type...}]}, {...}]
*/
var CabinetView = React.createClass({

  getInitialState: function() {

    var uCount = this.props.uCount ? this.props.uCount : Util.default_u_count;

    // !构建机柜数据
    var testuDatas = [];
    for(var i=0;i<uCount;i++) {
      testuDatas.push(
        <CabinetUnitView uStart={i} uEnd={i} slotDatas={[{index: 0, slotName: '', slotType:''}]} unitColumnCount='1' unitRowCount='1' />);
    }

    var json = LSM.fakeCabinetData[this.props.cabinet.id];
    
    if(!json || !json.length) {
      return {};
    }
    var that = this;
    var temp = 0;
    for(var i=0;i<json.length;i++) {
      var uStart = json[i].uStart -1,
          uEnd = json[i].uEnd -1;
      var uCount = uEnd - uStart + 1;
      testuDatas.splice(
        uStart-temp,
        uCount,
        <CabinetUnitView nav={that.props.navigator} uStart={uStart} uEnd={uEnd} slotDatas={json[i].slotDatas} unitColumnCount={json[i].unitColumnCount} unitRowCount={json[i].unitRowCount} />
      );
      temp += uCount-1;
    }

    // 将机柜平面图中连续的空槽位合并显示为一个空槽位
    for(var i=0;i<testuDatas.length;i++) {
      if(testuDatas[i].props.unitColumnCount == '1' && testuDatas[i].props.unitRowCount == '1'
        && testuDatas[i].props.slotDatas[0].slotName == '' && testuDatas[i].props.slotDatas[0].slotType == '') {
          var temp = i+1;
          while(true) {
            if(testuDatas[temp].props.unitColumnCount == '1' && testuDatas[temp].props.unitRowCount == '1'
              && testuDatas[temp].props.slotDatas[0].slotName == '' && testuDatas[temp].props.slotDatas[0].slotType == '') {
              temp++;
            } else {
              break;
            }
          }
          if(temp - i >= 2) {
            testuDatas.splice(
              i,
              temp-i, 
              <CabinetUnitView uStart={i} uEnd={temp -1} slotDatas={[{index: 0, slotName: '', slotType:''}]} unitColumnCount='1' unitRowCount='1' />);
          }
      }
    }

    // 机柜数据从下往上
    testuDatas = testuDatas.reverse();

    return {
      uCount: uCount,
      name: this.props.cabinet.name,
      uDatas: testuDatas, //this.props.uDatas,
    }
  },

  componentDidMount: function() {

  },
  
  render() {
    return (
        <ScrollView style={styles.scrollView} maximumZoomScale={2}>
        	<View style={styles.cabinet}>
        		<View style={styles.cabinetHead}>
              <Text style={styles.cabinetName}></Text>
            </View>
            <View style={styles.cabinetBody}>
              <View style={styles.cabinetBodySidebar}>
                <CabinetSidebarView />
              </View>
              <View style={styles.cabinetBodyUnits}>
                {this.state.uDatas}
              </View>
              <View style={styles.cabinetBodySidebar}>
                <CabinetSidebarView />
              </View>
            </View>
        	</View>
        </ScrollView>
    );
  }
});

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  cabinet: {
    flex: 1,
    flexDirection: 'column',
  },
  cabinetHead: {
    height: 10,
    alignItems: 'center'
  },
  cabinetName: {
    textAlign: 'center',
    lineHeight: 30,
    
  },
  cabinetBody: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
  cabinetBodyUnits: {
    flexDirection: 'column',
    flex: 5
  },
  cabinetBodySidebar: {
    flex: 1
  },
});

module.exports = CabinetView;