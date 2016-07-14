/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  AsyncStorage,
  NavigatorIOS,
  ScrollView,
  StyleSheet,
  TabBarIOS,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

var ReactNativeAutoUpdater = require('react-native-auto-updater');
var Service = require('./views/service');
var Util = require('./views/util');

var Home = require('./views/Home.js');
var Favirate = require('./views/Favirate');
var ChatView = require('./views/ChatView');
var Search = require('./views/Search');
var Settings = require('./views/Settings');
var Login = require('./views/Login');


var base64Icon_home = 'data:image/png;base64,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';
var base64Icon_star = 'data:image/png;base64,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';
var base64Icon_search = 'data:image/png;base64,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';
var base64Icon_menu = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAfCAMAAABNnRR0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAM1BMVEUAAAA7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pkr///9QX8CJAAAAD3RSTlMA9mllBwa4sfesraYEbGjgs2NSAAAAAWJLR0QQlbINLAAAAEJJREFUOMtj4CcSMDIMrEomIgEzwyggBrAQCVgZ2IgE7ETHJgcNUggHAydxgIubgYdYMNCRNEQAL5GAb4DLEKJVAgC5TSFHevfP6AAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNS0xMC0xNVQyMjo0OToyNCswODowMBdIpzMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTUtMTAtMTVUMjI6NDk6MjQrMDg6MDBmFR+PAAAATnRFWHRzb2Z0d2FyZQBJbWFnZU1hZ2ljayA2LjguOC0xMCBRMTYgeDg2XzY0IDIwMTUtMDctMTkgaHR0cDovL3d3dy5pbWFnZW1hZ2ljay5vcmcFDJw1AAAAGHRFWHRUaHVtYjo6RG9jdW1lbnQ6OlBhZ2VzADGn/7svAAAAGHRFWHRUaHVtYjo6SW1hZ2U6OkhlaWdodAAzOTCt18QXAAAAF3RFWHRUaHVtYjo6SW1hZ2U6OldpZHRoADUwMgVnMp0AAAAZdEVYdFRodW1iOjpNaW1ldHlwZQBpbWFnZS9wbmc/slZOAAAAF3RFWHRUaHVtYjo6TVRpbWUAMTQ0NDkyMDU2NFbP3tAAAAATdEVYdFRodW1iOjpTaXplADIuMzJLQkKoICh3AAAAWnRFWHRUaHVtYjo6VVJJAGZpbGU6Ly8vaG9tZS93d3dyb290L3d3dy5lYXN5aWNvbi5uZXQvY2RuLWltZy5lYXN5aWNvbi5jbi9zcmMvMTE5NTIvMTE5NTIyNy5wbmdfsmBnAAAAAElFTkSuQmCC';
var base64Icon_settings = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACOlBMVEUAAAA7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pkr////hShxfAAAAvHRSTlMAAAEtLEvUnj4KE3Td2WYLTeDrtmUeAgdOw/v3q+P9/NuLDS+h8+Xq4umVXKf+KxjNMEC8+AWv9j8b3FEUfnkJalpo+XA9MR8OCLsa+u3kiqbh7tccKmuy6CkQaXu9Xyet5zIXvnEVNfWxBL8uOJLAqbljjY52tAO4j9OwDMGCWdod3qS19O9y1lDHO1Ly2CFzt2yUzkmfxezVJRbRqKMGYG0kQd/J5kSRRm+DsxHIyiPwQ5mTPFs3SqqIbs6hcY8AAAABYktHRL091dJ5AAACtklEQVQ4y22T+19MQRjGz3sqRNlLamtrz3axtclapd1tUza62axFiRQRUrZEokjJpYuUlhQJRULucr88f5yZc5baPt5fzpyZ7zvP+z4zIwiBIDEklEggClu2fEU4GwUH0cpVEZGrVURqDaCNWhMdE4SQLjZOD8QnhMQaIBkBY2JS8gJBYspaE5CaBpjToV+XsT7dgvQNiwDrRsC0NjNrE8vNZqm2FDscOYsAZy7Mm3VEefnppi0utkAFwYAqDnEqPh+Ts9XG52kbCouKS0q3KxC5y5C4Y3HVpPag0LHTu0skpYfd2BMdBBSXS2BRsZc5467ct78cVQe4hOhyOt3cruoVGTUHD8FYS8LhI3UMtmiOEtGxVcdzE8vqTwSUG7SwuwV1I6S6kwWhPqLMJnlfqaw5oGxH3SmhSLK0HNDx/a2nYTGfSTAArXkKcdaCNuEcHFlyZ3QeaN/Q4Wu+AGkfPyxSXQQ6hUtKfQJ1dUPD7aVML6LYlmS77IG5R+jEFdkCunoN1/kRkq4XFVYiX30fvGoStOgf4IYFATcYUGtC2iCTuumBp3cohmSJSlnCwCVo+BZG/Ow/73YqUJXf9a/IkDuQRpkptrtAi4/VIjbYjRhxEm8Ti9ok/xj6w+Tyxh24xzSWGEXU04j7Tj5IQvYgT5Gtzl2wemgCDybZ9+EYHh1TrBPDnU5X4EZT+GPoR3nicCGmgu4wuUr8V7dPP4lHazUHnhphHudnrJvpUjZ6VmeYfd70AhMvZcuT5/SYfeWbqdnvfS1P0Bso0dahJHBC81bDWogI5cC790ht767wfvgYEJYJdmnmjZhyM6lPffg87bL6/eLfyij5i768deDrcZi+7WjOWo/s2CVvk95lfGcP9sc8tNe08RI6rUsfr4L52uTapMI58b+AQJORhg8/f/1Wly6s/wGES+U2ylcJLQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNS0xMC0xNVQyMzowMjoyMiswODowMOE3w/kAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTUtMTAtMTVUMjM6MDI6MjIrMDg6MDCQantFAAAATnRFWHRzb2Z0d2FyZQBJbWFnZU1hZ2ljayA2LjguOC0xMCBRMTYgeDg2XzY0IDIwMTUtMDctMTkgaHR0cDovL3d3dy5pbWFnZW1hZ2ljay5vcmcFDJw1AAAAGHRFWHRUaHVtYjo6RG9jdW1lbnQ6OlBhZ2VzADGn/7svAAAAGHRFWHRUaHVtYjo6SW1hZ2U6OkhlaWdodAA2NjgiX5IBAAAAF3RFWHRUaHVtYjo6SW1hZ2U6OldpZHRoADY2OLGuwlwAAAAZdEVYdFRodW1iOjpNaW1ldHlwZQBpbWFnZS9wbmc/slZOAAAAF3RFWHRUaHVtYjo6TVRpbWUAMTQ0NDkyMTM0MjGrArAAAAATdEVYdFRodW1iOjpTaXplADI5LjZLQkKh4d4wAAAAWnRFWHRUaHVtYjo6VVJJAGZpbGU6Ly8vaG9tZS93d3dyb290L3d3dy5lYXN5aWNvbi5uZXQvY2RuLWltZy5lYXN5aWNvbi5jbi9zcmMvMTE5NTIvMTE5NTI1NC5wbmcFFyoPAAAAAElFTkSuQmCC';

var NewbieAPP = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'homeTab',
      isIndexShow: true,
      isLoginShow: false,
      isRegShow: false,
      isLoginLoadingShow: false
    };
  },

  componentDidMount: function() {
    var that = this;

    // login with token
    var path = Service.host + Service.loginByToken;
    Util.post(path, {}, function(data) {
      if(data.status) {
        that.setState({
          isIndexShow: true,
          isLoginShow: false,
          isRegShow: false,
          isLoadingShow: false
        });
      } else {
        Alert.alert('登录', data.msg);
        that.setState({
          isIndexShow: false,
          isLoginShow: true,
          isRegShow: false,
          isLoadingShow: false
        });
      }
    });
  },

  _selectTab: function(tabName) {
    this.setState({
      selectedTab: tabName
    });
  },

  _addNavigator: function(component, title) {
    var data = null;

    return <NavigatorIOS
      style={{flex: 1}}
      barTintColor='#007AFF'
      tintColor='#fff'
      titleTextColor='#fff'
      translucent={true}
      initialRoute={{
        component: component,
        title: title,
        passProps: {
          state: this
        }
      }}
    />;
  },

  _loginSuccess: function() {
    this.setState({
      isLoginShow: false,
      isIndexShow: true,
      selectedTab: 'homeTab',
    });
  },

  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.isIndexShow ?
          <View style={{flex: 1, opacity: 1}}>
            <TabBarIOS>
              <TabBarIOS.Item
                title="首页"
                icon={{uri: base64Icon_home, scale: 1.5}}
                selected={this.state.selectedTab === 'homeTab'}
                onPress={() => {
                  this.setState({
                    selectedTab: 'homeTab',
                  });
                }}>
                {this._addNavigator(Home, '首页')}
              </TabBarIOS.Item>
              <TabBarIOS.Item
                title="收藏"
                icon={{uri: base64Icon_star, scale: 1.5}}
                selected={this.state.selectedTab === 'favirateTab'}
                onPress={() => {
                  this.setState({
                    selectedTab: 'favirateTab',
                  });
                }}>
                {this._addNavigator(Favirate, '收藏')}
              </TabBarIOS.Item>
              <TabBarIOS.Item
                title="搜索"
                icon={{uri: base64Icon_search, scale: 1.5}}
                selected={this.state.selectedTab === 'searchTab'}
                onPress={() => {
                  this.setState({
                    selectedTab: 'searchTab',
                    presses: this.state.presses + 1
                  });
                }}>
                {this._addNavigator(Search, '搜索')}
              </TabBarIOS.Item>
              <TabBarIOS.Item
                title="消息"
                icon={{uri: base64Icon_menu, scale: 1.5}}
                badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
                selected={this.state.selectedTab === 'chatTab'}
                onPress={() => {
                  this.setState({
                    selectedTab: 'chatTab',
                    notifCount: this.state.notifCount + 1,
                  });
                }}>
                {this._addNavigator(ChatView, '消息')}
              </TabBarIOS.Item>
              <TabBarIOS.Item
                title="设置"
                icon={{uri: base64Icon_settings, scale: 1.5}}
                selected={this.state.selectedTab === 'settingsTab'}
                onPress={() => {
                  this.setState({
                    selectedTab: 'settingsTab',
                    presses: this.state.presses + 1
                  });
                }}>
                {this._addNavigator(Settings, '设置')}
              </TabBarIOS.Item>
            </TabBarIOS>
          </View>:null
        }
        {this.state.isLoginShow ?
            <Login loginSuccess={this._loginSuccess} />:null
        }
        
      </View>
    );
  }
});

const styles = StyleSheet.create({
  
  
});

AppRegistry.registerComponent('NewbieAPP', () => NewbieAPP);
