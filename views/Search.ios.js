'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  AlertIOS,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} = ReactNative;

var SearchHost = require('./SearchHost');
var SearchCabinet = require('./SearchCabinet');

var ReactNativeTableviewSimple = require('react-native-tableview-simple');
var TableView = ReactNativeTableviewSimple.TableView;
var Section = ReactNativeTableviewSimple.Section;
var Cell = ReactNativeTableviewSimple.Cell;

var Search = React.createClass({
  getInitialState: function() {
    return {
      items: []
    }
  },

  componentDidMount: function() {

  },

  _searchHost: function() {
    this.props.navigator.push({
      title: '搜索主机',
      component: SearchHost,
      passProps: {

      }
    });
  },

  _searchCabinet: function() {
    this.props.navigator.push({
      title: '搜索机柜',
      component: SearchCabinet,
      passProps: {

      }
    });
  },

	render() {
    return (
      <ScrollView style={styles.stage}>
          <TableView>
            <Section header="选择搜索类型">
              <Cell cellstyle="Basic" title="搜索主机" accessory="DisclosureIndicator" onPress={this._searchHost}/>
              <Cell cellstyle="Basic" title="搜索机柜" accessory="DisclosureIndicator" onPress={this._searchCabinet}/>
            </Section>
          </TableView>
      </ScrollView>
    );
	},
});

const styles = StyleSheet.create({
  stage: {
    backgroundColor: '#EFEFF4',
    flex: 1,
  },
});

module.exports = Search;