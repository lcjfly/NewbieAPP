'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} = ReactNative;

var Util = require('./util');
var Service = require('./service');
var Cabinet = require('./Cabinet');
var CabinetView = require('./CabinetView');
var LSM = require('./LocalStorageManager');

var SearchCabinet = React.createClass({
  getInitialState: function() {
    return {
      items: []
    }
  },

  componentDidMount: function() {

  },

	render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{height: 50, padding: 7}}>
          <TextInput style={styles.search} placeholder="请输入机柜名称" onChangeText={this._search} />
        </View>
        <View style={styles.items}>
          {this.state.items}
          <View style={{height: 35}} />
        </View>
      </ScrollView>
    );
	},

  _search: function(val) {
    var that = this;
    var items = [];
    var results = LSM.searchCabinetByName(val);
    for(var i=0;i<results.length;i++) {
      items.push(
        <Cabinet
          data={results[i]}
          nav={that.props.navigator}
          component={CabinetView}
         />
      );
    }
    this.setState({
      items: items
    });

    /*
    var path = Service.host + Service.searchCabinet;
    var results = [];
    var that = this;
    var items = [];
    // search action
    
    Util.post(path, {
      keyword: val
    }, function(data) {
      if(data.status) {
        
        results = data.data;
        for(var i=0;i<results.length;i++) {
          items.push(
            <Cabinet
              data={results[i]}
              nav={that.props.navigator}
              component={CabinetView}
             />
          );
        }
        that.setState({
          items: items
        });
      } else {
        Alert.alert('搜索', data.msg);
      }
    });
    */
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    flexDirection: 'column',
  },
  search: {
    height: 40,
    borderWidth: Util.pixel,
    borderColor: '#ccc',
    paddingLeft: 10,
    borderRadius: 6,
    backgroundColor: '#fff'
  },
});

module.exports = SearchCabinet;