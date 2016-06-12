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


var LoginView = React.createClass({

  getInitialState: function() {
    return {
      slotId: this.props.slotId,
      slotName: this.props.slotName,
      slotType: this.props.slotType,
    }
  },

  componentDidMount: function() {

  },

  render: function() {
  	return (
  	  	<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.inputRow}>
            <Text>用户名</Text>
            <TextInput ref="usernameInput" style={styles.input} placeholder="请输入用户名" onChangeText={this._getUsername}></TextInput>
          </View>
          <View style={styles.inputRow}>
            <Text>密码</Text>
            <TextInput ref="passwordInput" style={styles.input} password={true} placeholder="请输入密码" onChangeText={this._getPassword}></TextInput>
          </View>

          <View style={styles.btnRow}>
            <TouchableHighlight underlayColor="#fff" style={styles.btn} onPress={this._login}>
              <Text style={{color: '#fff'}}>登录</Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="#fff" style={styles.btn} onPress={this._showReg}>
              <Text style={{color: '#fff'}}>新用户</Text>
            </TouchableHighlight>
          </View>

          {this.state.isLoginLoadingShow ?
            <View>
              <ActivityIndicatorIOS size="small" color="#268DEF"></ActivityIndicatorIOS>
              <Text>登录中...</Text>
            </View>:null
          }
        </View>
  	);
  }
});

const styles = StyleSheet.create({


});

module.exports = LoginView;