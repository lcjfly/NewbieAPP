'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  ActionSheetIOS,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = ReactNative;

var Service = require('./service');
var Util = require('./util');
var CabinetView = require('./CabinetView');
var LSM = require('./LocalStorageManager');

/*
* 机房机柜视图
* name: 机柜名称 string
* type: 机柜类型（显示不同颜色） string
*/
var RoomCabinetView = React.createClass({

  getInitialState: function() {
    var color = Util.CABINET_DEFAULT_COLOR;
    var paddingTop = Util.default_room_cabinet_paddingTop, paddingBottom = Util.default_room_cabinet_paddingBottom;
    switch(this.props.data.type) {
      case Util.CABINET_TYPE_STORAGE_HP_SUN: 
        color = Util.CABINET_COLOR_STORAGE_HP_SUN;
        break;
      case Util.CABINET_TYPE_IBMP:
        color = Util.CABINET_COLOR_IBMP;
        break;
      case Util.CABINET_TYPE_NETWORK:
        color = Util.CABINET_COLOR_NETWORK;
        break;
      case Util.CABINET_TYPE_PC:
        color = Util.CABINET_COLOR_PC;
        break;
      case Util.CABINET_TYPE_CAE_HPC:
        color = Util.CABINET_COLOR_CAE_HPC;
        break;
      case Util.CABINET_TYPE_CABLE:
        color = Util.CABINET_COLOR_CABLE;
        break;
      case Util.CABINET_TYPE_POWER:
        color = Util.CABINET_COLOR_POWER;
        paddingTop *= 2;
        paddingBottom *= 2;
        break;
        case Util.CABINET_TYPE_OTHER:
        color = Util.CABINET_COLOR_OTHER;
        break;
    }
    return {
    	name: this.props.data.name,
      type: this.props.data.type,
      color: color,
      paddingTop: paddingTop,
      paddingBottom: paddingBottom
    };
  },

  componentDidMount: function() {
    
  },
  
  _showActionSheet: function() {
    var that = this;
    var options = [];
    var events = [];

    LSM.isFaviratedCabinet(that.props.data.id, function(err, isFavirated) {
      if(!err) {
        if(!isFavirated) {
          events.push(function() {
            // add favirate
            LSM.addFavirateCabinet(that.props.data.id, function(err) {
              if(!err) {
                Alert.alert('添加收藏成功');
              } else {
                Alert.alert(err);
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
            LSM.removeFavirateCabinet(that.props.data.id, function(err) {
              if(!err) {
                Alert.alert('取消收藏成功');
              } else {
                Alert.alert(err);
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

  _showCabinetDetail: function() {
    var that = this;
    /*
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
              name={results[i].name}
             />
          );
        }
      } else {
        Alert.alert('查看机柜', data.msg);
      }
    });
    */
    this.props.nav.push({
      title: this.props.data.name,
      component: CabinetView,
      passProps: {
        state: this,
        cabinet: this.props.data
      },
      rightButtonIcon: {uri: Util.base64Icon_menu, scale: 1.5}, 
      onRightButtonPress: this._showActionSheet,
    });
  },

  render() {
    return (
      <View>
        {
          this.state.name.trim() == '' ?
            <View style={[styles.cabinet, {backgroundColor: this.state.color, paddingTop: this.state.paddingTop, paddingBottom: this.state.paddingBottom}]}>
              <Text style={styles.cabinetName}>
              	{this.state.name}
              </Text>
            </View>
          :
          <TouchableHighlight onPress={this._showCabinetDetail}>
            <View style={[styles.cabinet, {backgroundColor: this.state.color, paddingTop: this.state.paddingTop, paddingBottom: this.state.paddingBottom}]}>
              <Text style={styles.cabinetName}>
                {this.state.name}
              </Text>
            </View>
          </TouchableHighlight>
        }
      </View>
    );
  }
});

const styles = StyleSheet.create({
  cabinet: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#fff',
  },
  cabinetName: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 15,
    textAlign: 'center',
    color: '#fff',
  }
});

module.exports = RoomCabinetView;