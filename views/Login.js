'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Alert,
  AsyncStorage,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} = ReactNative;

var Util = require('./util');
var Service = require('./service');

var Login = React.createClass({

  getInitialState: function() {
    return {
      isLoginShow: true,
      isRegShow: false,
      isLoginLoadingShow: false,
      loginButtonText: '登录',
      regButtonText: '注册'
    }
  },

  componentDidMount: function() {

  },

  render: function() {
  	return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 1, flexDirection: 'row', paddingTop: 40, paddingLeft: 40}}>
            <TouchableHighlight underlayColor="#fff" onPress={this._showLogin}>
              <Text style={this.state.isLoginShow?styles.highlightloginText:styles.lowlightloginText}>登录</Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="#fff" onPress={this._showReg}>
              <Text style={this.state.isRegShow?styles.highlightRegText:styles.lowlightRegText}>注册</Text>
            </TouchableHighlight>
        </View>
        <View style={{flex: 8, flexDirection: 'column'}}>
          {this.state.isLoginShow ?
      	  	<View style={styles.loginContainer}>
              <View style={styles.inputRow}>
                <TextInput maxLength={10} ref="usernameInput" style={styles.input} placeholder="请输入用户名" onChangeText={this._getUsername}></TextInput>
              </View>
              <View style={styles.inputRow}>
                <TextInput maxLength={10} ref="passwordInput" style={styles.input} password={true} placeholder="请输入密码" onChangeText={this._getPassword}></TextInput>
              </View>

              <TouchableHighlight underlayColor="#fff" onPress={this._login}>
                <View style={styles.loginButton}>
                  <Text ref={"loginButtonText"} style={styles.loginButtonText}>{this.state.loginButtonText}</Text>
                </View>
              </TouchableHighlight>

              <View style={styles.forgetPassword}>
                <Text style={styles.forgetPasswordText}>忘记密码？</Text>
              </View>
            </View>:null
          }
          
          {this.state.isRegShow ?
            <View style={styles.regContainer}>
              <View style={styles.inputRow}>
                <TextInput maxLength={10} ref="usernameInput" style={styles.input} placeholder="请输入用户名" onChangeText={this._getUsername}></TextInput>
              </View>
              <View style={styles.inputRow}>
                <TextInput maxLength={20} keyboardType="email-address" ref="emailInput" style={styles.input} email={true} placeholder="请输入邮箱" onChangeText={this._getEmail}></TextInput>
              </View>
              <View style={styles.inputRow}>
                <TextInput maxLength={10} ref="passwordInput" style={styles.input} password={true} placeholder="请输入密码" onChangeText={this._getPassword}></TextInput>
              </View>

              <TouchableHighlight underlayColor="#fff" onPress={this._reg}>
                <View style={styles.regButton}>
                  <Text ref="regButton" style={styles.regButtonText}>{this.state.regButtonText}</Text>
                </View>
              </TouchableHighlight>
            </View>:null
          }
        </View>
      </View>
  	);
  },

  _getUsername: function(val) {
    var username = val;
    this.setState({
      username: username
    });
  },

  _getPassword: function(val) {
    var password = val;
    this.setState({
      password: password
    });
  },

  _getEmail: function(val) {
    var email = val;
    this.setState({
      email: email
    });
  },

  _clearLoginInputInfo: function() {
    
  },

  _showReg: function() {
    var that = this;

    // hide loginView and show loadingView
    that.setState({
      isRegShow: true,
      isLoginShow: false,
    });
  },

  _reg: function() {
    if(this.state.loginButtonText == '注册中...') {
      return;
    }

    var username = this.state.username;
    var password = this.state.password;
    var email = this.state.email;
    var path = Service.host + Service.reg;
    var that = this;

    if(!username || username.trim() == '') {
      Alert.alert('用户名不能为空');
      return;
    }

    if(!password || password.trim() == '') {
      Alert.alert('密码不能为空');
      return;
    }

    if(!email || email.trim() == '') {
      Alert.alert('邮箱不能为空');
      return;
    }

    this.setState({
      isRegingShow: true,
      regButtonText: '注册中...'
    });

    // reg action
    Util.post(path, {
      username: username,
      password: password,
      email: email
    }, function(data) {
      that.setState({
        isRegingShow: false,
        regButtonText: '注册'
      });

      if(data.status) {
        Alert.alert('注册', "注册成功，请返回登录");
        that._showLogin();
      } else {
        Alert.alert('注册', data.msg);
      }
    });
  },

  _showLogin: function() {
    this.setState({
      isLoginShow: true,
      isRegShow: false,
    });
  },

  _login: function() {

    if(this.state.loginButtonText == '登录中...') {
      return;
    }
    
    var username = this.state.username;
    var password = this.state.password;
    var path = Service.host + Service.login;
    var that = this;

    if(!username || username.trim() == '') {
      Alert.alert('用户名不能为空');
      return;
    }

    if(!password || password.trim() == '') {
      Alert.alert('密码不能为空');
      return;
    }

    // hide loginView and show loadingView
    that.setState({
      isLoginShow: false,
      isRegShow: false,
      isLoginLoadingShow: true,
      loginButtonText: '登录中...'
    });

    // login action
    Util.post(path, {
      username: username,
      password: password,
    }, function(data) {
      if(data.status) {
        
        that._clearLoginInputInfo();

        var token = data.data;
        Util.token = token;
        
        // store data locally
        AsyncStorage.multiSet([
          ['username', username],
          ['token', token],
        ], function(err) {
          if(!err) {
            that.setState({
              isLoginShow: false,
              isRegShow: false,
              isLoginLoadingShow: false,
              loginButtonText: '登录'
            });
            that.props.loginSuccess();
          }
        });
      } else {
        Alert.alert('登录', data.msg);
        that.setState({
          isLoginShow: true,
          isRegShow: false,
          isLoginLoadingShow: false,
          loginButtonText: '登录'
        });
      }
    });
  },
});

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  regContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  input: {
    width: Util.size.width/4*3,
    borderWidth: 1,
    height: 40,
    borderColor: '#ccc',
    paddingLeft: 15,
    paddingRight: 15
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#077ac9',
    height: 40,
    width: Util.size.width/4*3,
    borderRadius: 40
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 20
  },
  forgetPassword: {
    margin: 20
  },
  forgetPasswordText: {
    color: '#888'
  },
  regButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f18f45',
    height: 40,
    width: Util.size.width/4*3,
    borderRadius: 40
  },
  regButtonText: {
    color: '#fff',
    fontSize: 20
  },
  highlightloginText: {
    color: 'black',
    fontSize: 30, 
    marginRight: 10
  },
  lowlightloginText: {
    color: 'grey',
    fontSize: 25, 
    marginRight: 10
  },
  highlightRegText: {
    color: 'black',
    fontSize: 30, 
    marginRight: 10
  },
  lowlightRegText: {
    color: 'grey',
    fontSize: 25, 
    marginRight: 10
  },
});

module.exports = Login;