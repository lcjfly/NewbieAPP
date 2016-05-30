'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  ActivityIndicatorIOS,
  AlertIOS,
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
var HostDetail = require('./HostDetail');
var Cabinet = require('./Cabinet');
var CabinetDetail = require('./CabinetDetail');

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
              component={HostDetail}
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
              component={CabinetDetail}
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
        AlertIOS.alert('收藏', data.msg);
      }
    });
  },

  componentDidMount: function() {
    this._fetchFavirates(); 
  },

	render() {
	    return (
  	      <ScrollView 
            refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._fetchFavirates}
            />}
            style={styles.container}>
              <View style={styles.host}>
                {this.state.favirateHosts}
                <View style={{height: 35}} />
              </View>

              <View style={styles.cabinet}>
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
});

module.exports = Favirate;