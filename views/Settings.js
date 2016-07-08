'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Alert,
  AsyncStorage,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = ReactNative;

var ReactNativeAutoUpdater = require('react-native-auto-updater');

var Service = require('./service');
var Util = require('./util');
var Feedback = require('./Feedback');
var Version = require('./Version');

var ReactNativeTableviewSimple = require('react-native-tableview-simple');
var TableView = ReactNativeTableviewSimple.TableView;
var Section = ReactNativeTableviewSimple.Section;
var Cell = ReactNativeTableviewSimple.Cell;

/**
  _goMainPage: function(){
    this.props.navigator.push({
      title: "首页",
      component: Index,
      leftButtonTitle:" "
    });
  }
*/

var Settings = React.createClass({
  getInitialState: function() {
    return {
      username: 'null'
    };
  },

  componentDidMount: function() {

    var that = this;
    AsyncStorage.getItem('username', function(errs, value) {
      if(!errs) {
        that.setState({
          username: value,
        });
      }
    });
  },

  _showLogin: function(){
    this.props.state.setState({
      isIndexShow: false,
      isLoginShow: true,
      isRegShow: false,
      isLoadingShow: false
    });
  },

  _logout: function() {

    var that = this;
    Alert.alert(
      '登出', 
      '确认登出？',
      [
        {text: '取消', style: 'cancel',onPress: function() {

        }},
        {text: '确认', style: 'confirm',onPress: function() {
          var path = Service.host + Service.logout;
          // logout action
          Util.get(path, {}, function(data) {
            if(data.status) {
              // store data locally
              AsyncStorage.removeItem('token', function(err) {
                if(!err) {
                  that._showLogin();
                }else {
                  console.log('logout error');
                }
              });
            } else {
              that._showLogin();
            }
          });
        }}
      ]
    );
  },

  _gotoFeedback: function() {
    this.props.navigator.push({
      title: '反馈',
      component: Feedback,
      passProps: {

      }
    });
  },

  _gotoVersionLog: function() {
    this.props.navigator.push({
      title: '更新日志',
      component: Version,
      passProps: {

      }
    });
  },

	render() {
	    return (
        <ScrollView contentContainerStyle={styles.stage}>
            <View style={{
              backgroundColor: '#37474F',
              height: 200,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <View style={{
                backgroundColor: '#ffc107',
                width: 80,
                height: 80,
                borderRadius: 10
              }}></View>
            </View>
            <TableView>
              <Section header="账户信息">
                <Cell cellstyle="RightDetail" title="用户名" detail={this.state.username} />
                <Cell title="退出当前账户" titleTextColor="#f00" onPress={() => this._logout()}/>
              </Section>

              <Section header="版本信息">
                <Cell cellstyle="Basic" title="更新日志" accessory="DisclosureIndicator" onPress={this._gotoVersionLog}/>
                <Cell cellstyle="Basic" title="报告BUG" accessory="DisclosureIndicator" onPress={this._gotoFeedback}/>
              </Section>
            </TableView>
        </ScrollView>
        
	    );
  	}
});
//<Cell cellstyle="RightDetail" title="版本号" detail={ReactNativeAutoUpdater.jsCodeVersion()} />
const styles = StyleSheet.create({
  stage: {
    backgroundColor: '#EFEFF4',
    paddingBottom: 20,
    flex: 1,
  },
});

module.exports = Settings;