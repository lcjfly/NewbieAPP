'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Alert,
  AsyncStorage,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} = ReactNative;

var Util = require('./util');
var Service = require('./service');
var Version = require('./Version');
var VersionDetail = require('./VersionDetail');

var Version = React.createClass({
  getInitialState: function() {
    return {
      refreshing: false,
      versions: []
    };
  },

  _fetchVersionLogs: function() {
    var that = this;
    that.setState({refreshing: true});
    var path = Service.host + Service.version;
      // fetch version logs
      Util.get(path, {}, function(data) {
        that.setState({refreshing: false});
        if(data.status) {
          var results = data.data;
          var versionDetails = [];
          for(var i=0;i<results.length;i++) {
            versionDetails.push(
              <VersionDetail
                data = {results[i]}
               />
            );
          }
          that.setState({
            versions: versionDetails
          });
        } else {
          Alert.alert('获取版本更新日志失败');
        }
      });
  },

  componentDidMount: function() {

    this._fetchVersionLogs();
    
  },

  _getContent: function(val) {
    this.setState({
      content: val
    });
  },

	render() {
	    return (
	      <ScrollView 
          refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._fetchVersionLogs}
          />
        }>
  	      <View style={styles.version}>
            {this.state.versions}
            <View style={{height: 35}} />
          </View>
	    </ScrollView>
	    );
		}
});

const styles = StyleSheet.create({
  version: {
    
  },
});

module.exports = Version;