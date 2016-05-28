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

var Util = require('./util');
var Service = require('./service');
var Item = require('./Item');
var Detail = require('./Detail');

var Search = React.createClass({
  getInitialState: function() {
    return {

    };
  },

  componentDidMount: function() {

  },

	render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{height: 50, padding: 7}}>
          <TextInput style={styles.search} placeholder="搜索" onChangeText={this._search}/>
        </View>
        <View style={styles.items}>
          <View style={{height: 35}} />
        </View>
      </ScrollView>
    );
	},

  _search: function(val) {
    var path = Service.host + Service.search;
    var results = [];
    var items = [];

    // search action
    Util.post(path, {
      keyword: val
    }, function(data) {
      if(data.status) {
        results = data.results;
        for(var i=0;i<results.length;i++) {
          items.push(
            <Item
              data={results[i]}
              nav={this.props.navigator}
              component={Detail}
              hostname={results[i].hostname}
              ip={results[i].ip}
             />
          );
        }
      } else {
        AlertIOS.alert('搜索', data.msg);
      }
    });
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    flexDirection: 'column'
  },
  search: {
    height: 35,
    borderWidth: Util.pixel,
    borderColor: '#ccc',
    paddingLeft: 10,
    borderRadius: 6,
    backgroundColor: '#fff'
  },
});

module.exports = Search;