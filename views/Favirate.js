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
  View,
} = ReactNative;

var Util = require('./util');
var Service = require('./service');
var Host = require('./Host');
var HostView = require('./HostView');
var Cabinet = require('./Cabinet');
var CabinetView = require('./CabinetView');
var LocalStorageManager = require('./LocalStorageManager');

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
    
    var results = [];
    var that = this;
    var hosts = [];
    var cabinets = [];

    that.setState({
      refreshing: true
    });

    LocalStorageManager.getFavirates(function(err, favirates) {

        that.setState({
          refreshing: false
        });

        var fHosts = favirates.hosts;
        for(var i=0;i<fHosts.length;i++) {
          hosts.push(
            <Host
              data={fHosts[i]}
              nav={that.props.navigator}
              component={HostView}
            />
          );
        }

        var fCabinets = favirates.cabinets;
        for(var i=0;i<fCabinets.length;i++) {
          cabinets.push(
            <Cabinet
              data={fCabinets[i]}
              nav={that.props.navigator}
              component={CabinetView}
             />
          );
        }
        that.setState({
          favirateHosts: hosts,
          favirateCabinets: cabinets
        });
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
            />}>
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