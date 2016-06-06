'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  ActionSheetIOS,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = ReactNative;

var Util = require('./util');
var Service = require('./service');

var base64Icon_menu = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAfCAMAAABNnRR0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAM1BMVEUAAAA7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pkr///9QX8CJAAAAD3RSTlMA9mllBwa4sfesraYEbGjgs2NSAAAAAWJLR0QQlbINLAAAAEJJREFUOMtj4CcSMDIMrEomIgEzwyggBrAQCVgZ2IgE7ETHJgcNUggHAydxgIubgYdYMNCRNEQAL5GAb4DLEKJVAgC5TSFHevfP6AAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNS0xMC0xNVQyMjo0OToyNCswODowMBdIpzMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTUtMTAtMTVUMjI6NDk6MjQrMDg6MDBmFR+PAAAATnRFWHRzb2Z0d2FyZQBJbWFnZU1hZ2ljayA2LjguOC0xMCBRMTYgeDg2XzY0IDIwMTUtMDctMTkgaHR0cDovL3d3dy5pbWFnZW1hZ2ljay5vcmcFDJw1AAAAGHRFWHRUaHVtYjo6RG9jdW1lbnQ6OlBhZ2VzADGn/7svAAAAGHRFWHRUaHVtYjo6SW1hZ2U6OkhlaWdodAAzOTCt18QXAAAAF3RFWHRUaHVtYjo6SW1hZ2U6OldpZHRoADUwMgVnMp0AAAAZdEVYdFRodW1iOjpNaW1ldHlwZQBpbWFnZS9wbmc/slZOAAAAF3RFWHRUaHVtYjo6TVRpbWUAMTQ0NDkyMDU2NFbP3tAAAAATdEVYdFRodW1iOjpTaXplADIuMzJLQkKoICh3AAAAWnRFWHRUaHVtYjo6VVJJAGZpbGU6Ly8vaG9tZS93d3dyb290L3d3dy5lYXN5aWNvbi5uZXQvY2RuLWltZy5lYXN5aWNvbi5jbi9zcmMvMTE5NTIvMTE5NTIyNy5wbmdfsmBnAAAAAElFTkSuQmCC';

var Cabinet = React.createClass({
  render() {
    return (
      <TouchableOpacity onPress={this._loadPage.bind(this, this.props.data)}>
        <View style={styles.item}>
          <View style={styles.icon}>
            <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>{this.props.type}机柜</Text>
          </View>
          <View style={{flexDirection: 'column', flex: 1}}>
            <Text numberOfLines={2} style={styles.name}>
              {this.props.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  },

  _showActionSheet: function() {
    var that = this;
    var options = [];
    var events = [];

    Util.isFaviratedCabinet(that.props.data.id, function(err, isFavirated) {
      if(!err) {
        if(!isFavirated) {
          events.push(function() {
            // add favirate
            var path = Service.host + Service.favirateCabinet + that.props.data.id;
            Util.post(path, { }, function(data) {
              if(data.status) {
                Alert.alert('添加收藏成功');
              } else {
                Alert.alert('添加收藏失败');
              }
            });
          });
          options.push('加入收藏');
          options.push('分享给大家');
          options.push('取消');

          events.push(function() {
            Alert.alert('share');
          });
          ActionSheetIOS.showActionSheetWithOptions({
              options: options,
              cancelButtonIndex: options.length - 1
            }, function(index) {
              events[index] && events[index]();
            }
          );
        } else {
          events.push(function() {
            // cancel favirate
            var path = Service.host + Service.favirateCabinet + that.props.data.id;
            Util.delete(path, { }, function(data) {
              if(data.status) {
                Alert.alert('取消收藏成功');
                
              } else {
                console.log('add favirate return:'+data.msg);
                Alert.alert('取消收藏失败');
              }
            });
          });
          options.push('取消收藏');
          options.push('分享给大家');
          options.push('取消');

          events.push(function() {
            Alert.alert('share');
          });

          ActionSheetIOS.showActionSheetWithOptions({
              options: options,
              cancelButtonIndex: options.length - 1
            }, function(index) {
              events[index] && events[index]();
            }
          );
        }
      } else {
        console.log('err:\n\n' + err);
      }
    });
  },

  _loadPage: function(data) {
  	var cabinet = data;
  	this.props.nav.push({
  		title: this.props.name,
  		component: this.props.component,
  		passProps: {
  			cabinet: cabinet
  		},
      rightButtonIcon: {uri: base64Icon_menu, scale: 1.5}, 
      onRightButtonPress: this._showActionSheet,
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