'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = ReactNative;

var Util = require('./util');
var Service = require('./service');
var CabinetView = require('./CabinetView');
var LSM = require('./LocalStorageManager');

var base64Icon_menu = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAfCAMAAABNnRR0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAM1BMVEUAAAA7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pkr///9QX8CJAAAAD3RSTlMA9mllBwa4sfesraYEbGjgs2NSAAAAAWJLR0QQlbINLAAAAEJJREFUOMtj4CcSMDIMrEomIgEzwyggBrAQCVgZ2IgE7ETHJgcNUggHAydxgIubgYdYMNCRNEQAL5GAb4DLEKJVAgC5TSFHevfP6AAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNS0xMC0xNVQyMjo0OToyNCswODowMBdIpzMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTUtMTAtMTVUMjI6NDk6MjQrMDg6MDBmFR+PAAAATnRFWHRzb2Z0d2FyZQBJbWFnZU1hZ2ljayA2LjguOC0xMCBRMTYgeDg2XzY0IDIwMTUtMDctMTkgaHR0cDovL3d3dy5pbWFnZW1hZ2ljay5vcmcFDJw1AAAAGHRFWHRUaHVtYjo6RG9jdW1lbnQ6OlBhZ2VzADGn/7svAAAAGHRFWHRUaHVtYjo6SW1hZ2U6OkhlaWdodAAzOTCt18QXAAAAF3RFWHRUaHVtYjo6SW1hZ2U6OldpZHRoADUwMgVnMp0AAAAZdEVYdFRodW1iOjpNaW1ldHlwZQBpbWFnZS9wbmc/slZOAAAAF3RFWHRUaHVtYjo6TVRpbWUAMTQ0NDkyMDU2NFbP3tAAAAATdEVYdFRodW1iOjpTaXplADIuMzJLQkKoICh3AAAAWnRFWHRUaHVtYjo6VVJJAGZpbGU6Ly8vaG9tZS93d3dyb290L3d3dy5lYXN5aWNvbi5uZXQvY2RuLWltZy5lYXN5aWNvbi5jbi9zcmMvMTE5NTIvMTE5NTIyNy5wbmdfsmBnAAAAAElFTkSuQmCC';

var Cabinet = React.createClass({

  getInitialState: function() {
    return {
      favirateText: "",
      onFavirateText: {},
    };
  },

  render() {
    return (
      <TouchableOpacity onPress={this._loadPage.bind(this, this.props.data)}>
        <View style={styles.item}>
          <View style={styles.icon}>
            <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>{this.props.data.type}机柜</Text>
          </View>
          <View style={{flexDirection: 'column', flex: 1}}>
            <Text numberOfLines={2} style={styles.name}>
              {this.props.data.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  },

  _addFavirate: function() {
    var that = this;

    LSM.addFavirateCabinet(this.props.data.id, function(err) {
      if(!err) {
        that.state.favirateText = Util.TEXT_FAVIRATE_REMOVE;
        that.state.onFavirateText = that._cancelFavirate;

        that.props.nav.replace({
          title: that.props.data.name,
          component: CabinetView,
          passProps: {
            cabinet: that.props.data,
            state: that,
          },
          favirateText: that.state.favirateText,
          onFavirateText: that.state.onFavirateText
        });
      } else {
        Alert.alert('添加收藏失败:'+err);
      }
    });
  },

  _cancelFavirate: function() {
    var that = this;

    LSM.removeFavirateCabinet(this.props.data.id, function(err) {
      if(!err) {
        that.state.favirateText = Util.TEXT_FAVIRATE_ADD;
        that.state.onFavirateText = that._addFavirate;

        that.props.nav.replace({
          title: that.props.data.name,
          component: CabinetView,
          passProps: {
            cabinet: that.props.data,
            state: that,
          },
          favirateText: that.state.favirateText,
          onFavirateText: that.state.onFavirateText
        });
      } else {
        Alert.alert('取消收藏失败:'+err);
      }
    });
  },
  

  _loadPage: function(data) {
    var that = this;
  	var cabinet = data;

    // 查询收藏状态
    LSM.isFaviratedCabinet(that.props.data.id, function(err, isFavirated) {
      if(!err) {
        that.state.favirateText = isFavirated?Util.TEXT_FAVIRATE_REMOVE:Util.TEXT_FAVIRATE_ADD;
        that.state.onFavirateText = isFavirated?that._cancelFavirate:that._addFavirate;
      } else {
        console.log('err:\n\n' + err);
      }

    	that.props.nav.push({
    		title: that.props.data.name,
    		component: that.props.component,
    		passProps: {
    			cabinet: cabinet
    		},
        favirateText: that.state.favirateText,
        onFavirateText: that.state.onFavirateText
    	});
    });
  }
});

const styles = StyleSheet.create({
  item: {
    height: 80,
    padding: 5,
    borderBottomWidth: Util.pixel,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  icon: {
    height: 50,
    width: 50,
    borderRadius: 4,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#212f2c',
    marginRight: 10
  },
  itemname: {
  	flex: 1,
  	marginBottom: 5,
  	opacity: 0.7
  },
});

module.exports = Cabinet;