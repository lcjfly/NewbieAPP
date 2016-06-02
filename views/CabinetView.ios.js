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

/*
* 机柜视图
* name: 名称 string
* uCount: unit数量 int default=42
* uDatas: unit数据 [{uStart, uEnd, unitRowCount, unitColumnCount, [{index, name, type...}]}]
*/
var CabinetView = React.createClass({

  getInitialState: function() {

    var uCount = this.props.uCount ? this.props.uCount : Util.default_u_count;

    // !构建机柜数据
    var testuDatas = [];
    var testSlotDatas = [
      {index: 5, slotName: 'fwb1b', slotType:'防火墙2'},
      {index: 10, slotName: 'fwb1b', slotType:'防火墙10'}];
    testuDatas.push(
      <CabinetUnitView uStart='20' uEnd='30' slotDatas={testSlotDatas} unitColumnCount='8' unitRowCount='2' />);

    var testSlotDatas2 = [
      {index: 0, slotName: '', slotType:''}];
    testuDatas.push(
      <CabinetUnitView uStart='3' uEnd='5' slotDatas={testSlotDatas2} unitColumnCount='1' unitRowCount='1' />);

    var testSlotDatas3 = [
      {index: 0, slotName: 'fwb1b', slotType:'防火墙2'}];
    testuDatas.push(
      <CabinetUnitView uStart='1' uEnd='5' slotDatas={testSlotDatas3} unitColumnCount='1' unitRowCount='1' />);
    
    var testSlotDatas5 = [
      {index: 0, slotName: '', slotType:''}];
    testuDatas.push(
      <CabinetUnitView uStart='3' uEnd='3' slotDatas={testSlotDatas5} unitColumnCount='1' unitRowCount='1' />);


    var testSlotDatas4 = [
      {index: 0, slotName: 'aaa', slotType:'aaa'},
      {index: 1, slotName: 'bbb', slotType:'bbb'}];
    testuDatas.push(
      <CabinetUnitView uStart='1' uEnd='6' slotDatas={testSlotDatas4} unitColumnCount='2' unitRowCount='1' />);

    return {
      uCount: uCount,
      name: this.props.name,
      uDatas: testuDatas, //this.props.uDatas,
    }
  },

  componentDidMount: function() {

  },
  
  render() {
  	var cabinet = this.props.cabinet;
    return (
      <ScrollView style={styles.scrollView}>
      	<View style={styles.cabinet}>
      		<View style={styles.cabinetHead}>
            <Text style={styles.cabinetName}>JG280</Text>
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
    flex: 1
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
    justifyContent: 'space-between'
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