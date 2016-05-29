'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  AsyncStorage,
  ScrollView,
  StyleSheet,
  Text,
  View,
} = ReactNative;

var Util = require('./util');
var Service = require('./service');
var Host = require('./Host');
var HostDetail = require('./HostDetail');

var Favirate = React.createClass({
  getInitialState: function() {
    return {
      username: 'null'
    };
  },

  componentDidMount: function() {

    var path = Service.host + Service.favirate;
    var results = [];
    var that = this;
    var items = [];

    AsyncStorage.getItem('token', function(err, token) {
      if(!err && token) {
        // favirate action
        Util.postWithToken(path, token, {}, function(data) {
          if(data.status) {
            results = data.data;
            for(var i=0;i<results.length;i++) {
              items.push(
                <Host
                  data={results[i]}
                  nav={that.props.navigator}
                  component={HostDetail}
                  hostname={results[i].hostname}
                  ip={results[i].ip}
                 />
              );
            }
            that.setState({
              items: items
            });
          } else {
            AlertIOS.alert('收藏', data.msg);
          }
        });
      } else {
        AlertIOS.alert('收藏', '登录状态异常，请退出后重新登录');
      }
    });
    
  },

	render() {
	    return (
	      <ScrollView style={styles.container}>
          <View style={styles.items}>
            {this.state.items}
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