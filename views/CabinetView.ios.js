'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Navigator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = ReactNative;

var Util = require('./util');
var CabinetSidebarView = require('./CabinetSidebarView');
var CabinetUnitView = require('./CabinetUnitView');

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

    // 传入的数据
    var json = [
      {
        uStart: 2,
        uEnd: 10,
        unitColumnCount: 8,
        unitRowCount: 2,
        slotDatas: [
          {index: 5, slotName: 'fwb1b', slotType:'防火墙'},
          {index: 10, slotName: 'fwb2b', slotType:'防火墙'}
        ]
      },
      {
        uStart: 11,
        uEnd: 16,
        unitColumnCount: 1,
        unitRowCount: 1,
        slotDatas: [
          {index: 0, slotName: '6units', slotType:''}
        ]
      },
      {
        uStart: 18,
        uEnd: 19,
        unitColumnCount: 1,
        unitRowCount: 1,
        slotDatas: [
          {index: 0, slotName: '2units', slotType:''}
        ]
      },
      {
        uStart: 41,
        uEnd: 42,
        unitColumnCount: 1,
        unitRowCount: 1,
        slotDatas: [
          {index: 0, slotName: '1unit', slotType:''}
        ]
      },
    ];
    
    var temp = 0;
    for(var i=0;i<json.length;i++) {
      var uStart = json[i].uStart -1,
          uEnd = json[i].uEnd -1;
      var uCount = uEnd - uStart + 1;
      testuDatas.splice(
        uStart-temp,
        uCount,
        <CabinetUnitView uStart={json[i].uStart} uEnd={json[i].uEnd} slotDatas={json[i].slotDatas} unitColumnCount={json[i].unitColumnCount} unitRowCount={json[i].unitRowCount} />
      );
      temp += uCount-1;
    }

    // 机柜数据从下往上
    testuDatas = testuDatas.reverse();

    return {
      uCount: uCount,
      name: this.props.name,
      uDatas: testuDatas, //this.props.uDatas,
    }
  },

  componentDidMount: function() {

  },
  
  render() {
    return (
        <ScrollView style={styles.scrollView}>
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
    backgroundColor: '#ccc',
    height: 30,
    alignItems: 'center'
  },
  cabinetName: {
    textAlign: 'center',
    lineHeight: 30,
    
  },
  cabinetBody: {
    backgroundColor: '#ddd',
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