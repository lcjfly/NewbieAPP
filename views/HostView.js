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
var Service = require('./service');
var LSM = require('./LocalStorageManager');

var ReactNativeTableviewSimple = require('react-native-tableview-simple');
var TableView = ReactNativeTableviewSimple.TableView;
var Section = ReactNativeTableviewSimple.Section;
var Cell = ReactNativeTableviewSimple.Cell;

var HostView = React.createClass({

  getInitialState: function() {
    var host = LSM.fakeHostData[this.props.id] || {host: {}, network: {}};
    return {
      host: host
    }
  },

  render() {
    return (
      <ScrollView style={styles.container}>
        <TableView>
          <Section header="主机信息">
            <Cell cellstyle="RightDetail" title="机名" detail={this.state.host.host.name} />
            <Cell cellstyle="RightDetail" title="序列号" detail={this.state.host.host.serial} />
            <Cell cellstyle="RightDetail" title="机柜号" detail={this.state.host.host.cabinet} />
            <Cell cellstyle="RightDetail" title="负责人" detail={this.state.host.host.owner} />
            <Cell cellstyle="RightDetail" title="IP" detail={this.state.host.host.ip} />
            <Cell cellstyle="RightDetail" title="备注" detail={this.state.host.host.comment} />
          </Section>

          <Section header="网络信息">
            <Cell cellstyle="RightDetail" title="网络机柜号" detail={this.state.host.network.cabinet} />
            <Cell cellstyle="RightDetail" title="switch名" detail={this.state.host.network.switch} />
            <Cell cellstyle="RightDetail" title="switch端口" detail={this.state.host.network.switch_port} />
            <Cell cellstyle="RightDetail" title="配线架端口" detail={this.state.host.network.cable_port} />
            <Cell cellstyle="RightDetail" title="备注" detail={this.state.host.network.comment} />
          </Section>

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