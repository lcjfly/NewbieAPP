'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  ActivityIndicatorIOS,
  Alert,
  AsyncStorage,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} = ReactNative;

var Util = require('./util');
var Service = require('./service');
var Host = require('./Host');
var HostView = require('./HostView');
var Cabinet = require('./Cabinet');
var CabinetView = require('./CabinetView');

var Favirate = React.createClass({
  getInitialState: function() {
    return {
      refreshing: false,
      favirateHosts: [],
      favirateCabinets: []
    };
  },

   _refresh: function() {
    this._fetchFavirates();
  },

  _fetchFavirates: function() {
    var path = Service.host + Service.favirate;
    var results = [];
    var that = this;
    var hosts = [];
    var cabinets = [];

    that.setState({
      refreshing: true
    });

    // favirate action
    Util.get(path, {}, function(data) {
      if(data.status) {
        
        that.setState({
          refreshing: false
        });

        results = data.data;
        var fHosts = results.hosts;
        var fHostIds = [];

        for(var i=0;i<fHosts.length;i++) {
          hosts.push(
            <Host
              data={fHosts[i]}
              nav={that.props.navigator}
              component={HostView}
              hostname={fHosts[i].hostname}
              ip={fHosts[i].ip}
             />
          );
          fHostIds.push(fHosts[i].id);
        }

        var fCabinets = results.cabinets;
        var fCabinetIds = [];
        for(var i=0;i<fCabinets.length;i++) {
          cabinets.push(
            <Cabinet
              data={fCabinets[i]}
              nav={that.props.navigator}
              component={CabinetView}
              name={fCabinets[i].name}
             />
          );
          fCabinetIds.push(fCabinets[i].id);
        }
        Util.setLocalFavirates(fHostIds, fCabinetIds);
        that.setState({
          favirateHosts: hosts,
          favirateCabinets: cabinets
        });
      } else {
        Alert.alert('收藏', data.msg);
      }
    });
  },

  componentDidMount: function() {
    this._fetchFavirates(); 
  },

	render() {
	    return (
  	      <ScrollView style={styles.container}
            refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._fetchFavirates}
            />}
            style={styles.container}>
              <View style={styles.hosts}>
                {this.state.favirateHosts}
                <View style={{height: 35}} />
              </View>

              <View style={styles.cabinets}>
                {this.state.favirateCabinets}
                <View style={{height: 35}} />
              </View>
          </ScrollView>
	    );
  	}
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    flexDirection: 'column'
  },
  hosts: {
    flex: 1
  },
  cabinets: {
    flex: 1
  }
});

module.exports = Favirate;