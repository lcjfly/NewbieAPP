'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = ReactNative;

var Util = require('./util');
var Service = require('./service');
var LSM = require('./LocalStorageManager');

var ReactNativeTableviewSimple = require('react-native-tableview-simple');
var TableView = ReactNativeTableviewSimple.TableView;
var Section = ReactNativeTableviewSimple.Section;
var Cell = ReactNativeTableviewSimple.Cell;

var HostView = React.createClass({

  getInitialState: function() {
    var that = this;
    var host = {};
    
    return {
      host: that.props.host.id? LSM.getHostById(that.props.host.id): 0
    }
  },

  render() {
    var portInfoSections = [];
    if(this.state.host && this.state.host.portInfo) {
      var portInfos = this.state.host.portInfo;
      for(var index in portInfos) {
        var portInfo = portInfos[index];
        portInfoSections.push(
          <Section header="端口信息">
            <Cell cellstyle="RightDetail" title="端口号" detail={portInfo.port} />
            <Cell cellstyle="RightDetail" title="IP" detail={portInfo.ip} />
            <Cell cellstyle="RightDetail" title="备注" detail={portInfo.remark} />
            
            <Cell cellstyle="RightDetail" title="交换机名称" detail={portInfo.switchPort.switchDevice.dc_name} />
            <Cell cellstyle="RightDetail" title="交换机端口" detail={portInfo.switchPort.port} />
            <Cell cellstyle="RightDetail" title="交换机端口备注" detail={portInfo.switchPort.remark} />
            <Cell cellstyle="RightDetail" title="交换机负责人" detail={portInfo.switchPort.switchDevice.user.name} />
            <Cell cellstyle="RightDetail" title="交换机负责人工号" detail={portInfo.switchPort.switchDevice.user.usrid} />
            <Cell cellstyle="RightDetail" title="交换机负责人邮箱" detail={portInfo.switchPort.switchDevice.user.mail} />
            <Cell cellstyle="RightDetail" title="交换机负责人部门" detail={portInfo.switchPort.switchDevice.user.dep} />
            <Cell cellstyle="RightDetail" title="交换机负责人分机" detail={portInfo.switchPort.switchDevice.user.phone} />
          </Section>
        );
      }
    }
    return (
      <ScrollView style={styles.container}>
        <TableView>
          <Section header="主机信息">
            <Cell cellstyle="RightDetail" title="机名" detail={this.state.host.dc_name} />
            <Cell cellstyle="RightDetail" title="设备类型" detail={this.state.host.deviceType.value} />
            <Cell cellstyle="RightDetail" title="序列号" detail={this.state.host.dc_sn} />
            <Cell cellstyle="RightDetail" title="机柜号" detail={this.state.host.cabinet_name} />
            <Cell cellstyle="RightDetail" title="结束位置" detail={this.state.host.end_position} />
            <Cell cellstyle="RightDetail" title="开始位置" detail={this.state.host.start_position} />
            <Cell cellstyle="RightDetail" title="IP" detail={this.state.host.ip} />
            <Cell cellstyle="RightDetail" title="备注" detail={this.state.host.remark} />
          </Section>

          <Section header="负责人信息">
            <Cell cellstyle="RightDetail" title="姓名" detail={this.state.host.user.name} />
            <Cell cellstyle="RightDetail" title="工号" detail={this.state.host.user.usrid} />
            <Cell cellstyle="RightDetail" title="部门" detail={this.state.host.user.dep} />
            <Cell cellstyle="RightDetail" title="分机" detail={this.state.host.user.phone} />
            <Cell cellstyle="RightDetail" title="邮箱" detail={this.state.host.user.mail} />
          </Section>

          {
            portInfoSections
          }

          {
            this.state.host.san ?
            <Section header="SAN网络">
              <Cell cellstyle="RightDetail" title="网络机柜号" detail={this.state.host.san.cabinet} />
              <Cell cellstyle="RightDetail" title="switch名" detail={this.state.host.san.switch} />
              <Cell cellstyle="RightDetail" title="switch端口" detail={this.state.host.san.switch_port} />
              <Cell cellstyle="RightDetail" title="配线架端口" detail={this.state.host.san.cable_port} />
              <Cell cellstyle="RightDetail" title="备注" detail={this.state.host.san.comment} />
            </Section>:null
          }
        </TableView>
      </ScrollView>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

module.exports = HostView;