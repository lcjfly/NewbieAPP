'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  ActionSheetIOS,
  AlertIOS,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} = ReactNative;

var Util = require('./util');
var Service = require('./service');
var HostView = require('./HostView');

var base64Icon_menu = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAfCAMAAABNnRR0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAM1BMVEUAAAA7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pkr///9QX8CJAAAAD3RSTlMA9mllBwa4sfesraYEbGjgs2NSAAAAAWJLR0QQlbINLAAAAEJJREFUOMtj4CcSMDIMrEomIgEzwyggBrAQCVgZ2IgE7ETHJgcNUggHAydxgIubgYdYMNCRNEQAL5GAb4DLEKJVAgC5TSFHevfP6AAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNS0xMC0xNVQyMjo0OToyNCswODowMBdIpzMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTUtMTAtMTVUMjI6NDk6MjQrMDg6MDBmFR+PAAAATnRFWHRzb2Z0d2FyZQBJbWFnZU1hZ2ljayA2LjguOC0xMCBRMTYgeDg2XzY0IDIwMTUtMDctMTkgaHR0cDovL3d3dy5pbWFnZW1hZ2ljay5vcmcFDJw1AAAAGHRFWHRUaHVtYjo6RG9jdW1lbnQ6OlBhZ2VzADGn/7svAAAAGHRFWHRUaHVtYjo6SW1hZ2U6OkhlaWdodAAzOTCt18QXAAAAF3RFWHRUaHVtYjo6SW1hZ2U6OldpZHRoADUwMgVnMp0AAAAZdEVYdFRodW1iOjpNaW1ldHlwZQBpbWFnZS9wbmc/slZOAAAAF3RFWHRUaHVtYjo6TVRpbWUAMTQ0NDkyMDU2NFbP3tAAAAATdEVYdFRodW1iOjpTaXplADIuMzJLQkKoICh3AAAAWnRFWHRUaHVtYjo6VVJJAGZpbGU6Ly8vaG9tZS93d3dyb290L3d3dy5lYXN5aWNvbi5uZXQvY2RuLWltZy5lYXN5aWNvbi5jbi9zcmMvMTE5NTIvMTE5NTIyNy5wbmdfsmBnAAAAAElFTkSuQmCC';

var HostMessage = React.createClass({
  getInitialState: function() {
    return {
    	id: this.props.id
    }
  },

  componentDidMount: function() {

  },

    _showActionSheet: function() {
      var that = this;
      var options = [];
      var events = [];

      Util.isFaviratedHost(that.props.id, function(err, isFavirated) {
        if(!err) {
          if(!isFavirated) {
            events.push(function() {
              // add favirate
              var path = Service.host + Service.favirateHost + that.props.id;
              Util.post(path, { }, function(data) {
                if(data.status) {
                  AlertIOS.alert('添加收藏成功');
                } else {
                  AlertIOS.alert('添加收藏失败');
                }
              });
            });
            options.push('加入收藏');
            options.push('分享给大家');
            options.push('取消');

            events.push(function() {
              AlertIOS.alert('share');
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
              var path = Service.host + Service.favirateHost + that.props.id;
              Util.delete(path, { }, function(data) {
                if(data.status) {
                  AlertIOS.alert('取消收藏成功');
                  
                } else {
                  console.log('add favirate return:'+data.msg);
                  AlertIOS.alert('取消收藏失败');
                }
              });
            });
            options.push('取消收藏');
            options.push('分享给大家');
            options.push('取消');

            events.push(function() {
              AlertIOS.alert('share');
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


    _viewHost: function() {
      var that = this;
      var path = Service.host + Service.getHostById + this.state.id;
      Util.get(path, {}, function(data) {
        if(data.status) {
          that.props.nav.push({
            title: data.data.hostname,
            component: HostView,
            passProps: {
              host: data.data
            },
            rightButtonIcon: {uri: base64Icon_menu, scale: 1.5}, 
            onRightButtonPress: that._showActionSheet,
          });
        } else {
          AlertIOS.alert('查看分享的主机', data.msg);
        }
      });
    },

  render() {
  	const flexStyle = {};
    return (
    	<View style={[styles.bubble,
	        (this.props.position === 'left' ? styles.bubbleLeft : this.props.position === 'right' ? styles.bubbleRight : styles.bubbleCenter),
	        (this.props.status === 'ErrorButton' ? styles.bubbleError : null),
	        flexStyle]}
	      >
          <TouchableOpacity onPress={this._viewHost}>
	          <View style={{flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#1DB8FF',
                height: 38,
                marginLeft: 5,
                marginRight: 5,
                borderRadius: 4
              }}>
	            <Text style={{color: '#fff', paddingLeft: 20, paddingRight: 20}}>
                主机{this.state.id}
              </Text>
	          </View>
          </TouchableOpacity>
    </View>
    );
  },

});

const styles = StyleSheet.create({
  bubble: {
    borderRadius: 15,
    paddingLeft: 14,
    paddingRight: 14,
    paddingBottom: 10,
    paddingTop: 8,
  },
  text: {
    color: '#000',
  },
  textLeft: {
  },
  textRight: {
    color: '#fff',
  },
  textCenter: {
    textAlign: 'center',
  },
  bubbleLeft: {
    marginRight: 70,
    backgroundColor: '#e6e6eb',
    alignSelf: 'flex-start',
  },
  bubbleRight: {
    marginLeft: 70,
    backgroundColor: '#007aff',
    alignSelf: 'flex-end',
  },
  bubbleCenter: {
    backgroundColor: '#007aff',
    alignSelf: 'center',
  },
  bubbleError: {
    backgroundColor: '#e01717',
  },
 
});

module.exports = HostMessage;