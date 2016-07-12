'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  //ActionSheetIOS,
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
      favirateText: "",
      onFavirateText: {},
    	name: this.props.data.name,
      type: this.props.data.type,
      color: color,
      paddingTop: paddingTop,
      paddingBottom: paddingBottom
    };
  },

  componentDidMount: function() {
    
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
        // update cache data
        LSM.removeFavirateCabinet(that.props.data.id);
        
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
  

  _showCabinetDetail: function() {
    var that = this;

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
        component: CabinetView,
        passProps: {
          cabinet: that.props.data,
          state: that,
        },
        favirateText: that.state.favirateText,
        onFavirateText: that.state.onFavirateText
      });
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