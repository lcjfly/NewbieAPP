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
var HostView = require('./HostView');
var LSM = require('./LocalStorageManager');

var base64Icon_menu = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAfCAMAAABNnRR0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAM1BMVEUAAAA7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pkr///9QX8CJAAAAD3RSTlMA9mllBwa4sfesraYEbGjgs2NSAAAAAWJLR0QQlbINLAAAAEJJREFUOMtj4CcSMDIMrEomIgEzwyggBrAQCVgZ2IgE7ETHJgcNUggHAydxgIubgYdYMNCRNEQAL5GAb4DLEKJVAgC5TSFHevfP6AAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNS0xMC0xNVQyMjo0OToyNCswODowMBdIpzMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTUtMTAtMTVUMjI6NDk6MjQrMDg6MDBmFR+PAAAATnRFWHRzb2Z0d2FyZQBJbWFnZU1hZ2ljayA2LjguOC0xMCBRMTYgeDg2XzY0IDIwMTUtMDctMTkgaHR0cDovL3d3dy5pbWFnZW1hZ2ljay5vcmcFDJw1AAAAGHRFWHRUaHVtYjo6RG9jdW1lbnQ6OlBhZ2VzADGn/7svAAAAGHRFWHRUaHVtYjo6SW1hZ2U6OkhlaWdodAAzOTCt18QXAAAAF3RFWHRUaHVtYjo6SW1hZ2U6OldpZHRoADUwMgVnMp0AAAAZdEVYdFRodW1iOjpNaW1ldHlwZQBpbWFnZS9wbmc/slZOAAAAF3RFWHRUaHVtYjo6TVRpbWUAMTQ0NDkyMDU2NFbP3tAAAAATdEVYdFRodW1iOjpTaXplADIuMzJLQkKoICh3AAAAWnRFWHRUaHVtYjo6VVJJAGZpbGU6Ly8vaG9tZS93d3dyb290L3d3dy5lYXN5aWNvbi5uZXQvY2RuLWltZy5lYXN5aWNvbi5jbi9zcmMvMTE5NTIvMTE5NTIyNy5wbmdfsmBnAAAAAElFTkSuQmCC';

/*
* 机柜u的slot视图
* [
* {slotName: 插槽主机名称 string,
* slotType: 插槽主机类型 string}
* ]
*/
var CabinetUnitRowSlotView = React.createClass({

  getInitialState: function() {
    return {
      favirateText: "",
      onFavirateText: {},
      slotId: this.props.slotId,
      slotName: this.props.slotName,
      slotType: this.props.slotType,
    }
  },

  componentDidMount: function() {

  },

  _addFavirate: function() {
    var that = this;

    LSM.addFavirateHost(this.props.slotId, function(err) {
        if(!err) {
          that.state.favirateText = Util.TEXT_FAVIRATE_REMOVE;
          that.state.onFavirateText = that._cancelFavirate;

          that.props.nav.replace({
            title: that.props.slotName,
            component: HostView,
            passProps: {
              host : {
                id: that.state.slotId
              }
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
    LSM.removeFavirateHost(this.props.slotId, function(err) {
      if(!err) {
        that.state.favirateText = Util.TEXT_FAVIRATE_ADD;
        that.state.onFavirateText = that._addFavirate;

        that.props.nav.replace({
          title: that.props.slotName,
          component: HostView,
          passProps: {
            host : {
              id: that.state.slotId
            }
          },
          favirateText: that.state.favirateText,
          onFavirateText: that.state.onFavirateText
        });
      } else {
        Alert.alert('取消收藏失败:'+err);
      }
    });
  },

  _showHostDetail: function() {
    var that = this;

    if(this.state.slotId) {
      //Alert.alert('You clicked '+this.state.slotName);

      // 查询收藏状态
      LSM.isFaviratedHost(that.props.slotId, function(err, isFavirated) {
        if(!err) {
          that.state.favirateText = isFavirated?Util.TEXT_FAVIRATE_REMOVE:Util.TEXT_FAVIRATE_ADD;
          that.state.onFavirateText = isFavirated?that._cancelFavirate:that._addFavirate;
        } else {
          console.log('err:\n\n' + err);
        }

        that.props.nav.push({
          title: that.state.slotName,
          component: HostView,
          passProps: {
            host : {
              id: that.state.slotId
            }
          },
          favirateText: that.state.favirateText,
          onFavirateText: that.state.onFavirateText
        });
      });
    }
  },
  
  render() {
    return (
      <View style={styles.slotViewContainer}>
      {!this.state.slotId ?
          <View style={styles.cabinetUnitRowSlot}>
          	<Text style={styles.cabinetUnitRowSlotName}>{this.state.slotName}</Text>
          </View>
        :
        <TouchableOpacity onPress={this._showHostDetail} style={{flex: 1}}>
          <View style={styles.cabinetUnitRowSlot}>
            <Text style={styles.cabinetUnitRowSlotName}>{this.state.slotName}</Text>
          </View>
        </TouchableOpacity>
      }
    </View>
    );
  }
});

const styles = StyleSheet.create({
  slotViewContainer: {
    flex: 1,
  },
  cabinetUnitRowSlot: {
    flex: 1,
  	alignItems: 'center',
  	borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center'
  },
  cabinetUnitRowSlotType: {
  	
  },
  cabinetUnitRowSlotName: {
    fontSize: 12
  }
});

module.exports = CabinetUnitRowSlotView;