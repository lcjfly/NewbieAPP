'use strict';

import React, { Component } from 'react';

import {
  Alert,
  AppRegistry,
  BackAndroid,
  Image,
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

var base64Icon_home = 'data:image/png;base64,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';

import TabNavigator from 'react-native-tab-navigator';

var Service = require('./views/service');
var Util = require('./views/util');

var Home = require('./views/Home.js');
var Favirate = require('./views/Favirate.js');
var Search = require('./views/Search.js');
var Settings = require('./views/Settings.js');
var Login = require('./views/Login.js');
var NavigatorExample = require('./views/NavigatorExample.js');

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

  _loginSuccess: function() {
    this.setState({
      isLoginShow: false,
      isIndexShow: true,
      selectedTab: 'homeTab',
    });
  },

  _addNavigator: function(component, title) {
    var data = null;

    return <Navigator
      style={{flex: 1}}
      initialRoute={{
        component: component,
        title: title,
        params: {
          state: this
        }
      }}
      renderScene={(route, navigator) => {
        let Component = route.component;
        if(Component) {
          return <View style={{paddingTop: 56, height: 3000}}><Component state={this} {...route.params} navigator={navigator} /></View>
        }
      }}
      navigationBar={
       <Navigator.NavigationBar
         routeMapper={{
           LeftButton: (route, navigator, index, navState) =>
            { 
              if (index === 0) {
                return null;
              }

              BackAndroid.addEventListener('hardwareBackPress', function() {
                   navigator.pop()
                   return true;
              });

              var previousRoute = navState.routeStack[index - 1];
              return (
                <TouchableOpacity
                  onPress={() => navigator.pop()}
                  style={styles.navBarLeftButton}>
                  <Text style={[styles.navBarText, styles.navBarButtonText]}>
                    {previousRoute.title?'< '+previousRoute.title:''}
                  </Text>
                </TouchableOpacity>
              );
            },
           RightButton: (route, navigator, index, navState) =>
             { return (<Text></Text>); },
           Title: (route, navigator, index, navState) =>
             { return (<View><Text style={[styles.navBarText, styles.navBarTitleText]}>{route.title}</Text></View>); },
         }}
         style={{backgroundColor: '#077ac9'}}
       />
      }
      configureScene={(route, routeStack) =>
        Navigator.SceneConfigs.PushFromRight}
    />;
  },

  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.isIndexShow ?
            <TabNavigator>
              <TabNavigator.Item
                selected={this.state.selectedTab === 'homeTab'}
                title="首页"
                renderIcon={() => <Image source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==', scale: 0.5}} />}
                renderSelectedIcon={() => <Image source={{uri: base64Icon_home, scale: 1}} />}
                onPress={() => this.setState({ selectedTab: 'homeTab' })}>
                {this._addNavigator(Home, '首页')}
              </TabNavigator.Item>
              <TabNavigator.Item
                selected={this.state.selectedTab === 'favirateTab'}
                title="收藏"
                renderIcon={() => <Image source={{uri: base64Icon_home, scale: 3}} />}
                renderSelectedIcon={() => <Image source={{uri: base64Icon_home, scale: 3}} />}
                onPress={() => this.setState({ selectedTab: 'favirateTab' })}>
                {this._addNavigator(Favirate, '收藏')}
              </TabNavigator.Item>
              <TabNavigator.Item
                selected={this.state.selectedTab === 'searchTab'}
                title="搜索"
                renderIcon={() => <Image source={{uri: base64Icon_home, scale: 3}} />}
                renderSelectedIcon={() => <Image source={{uri: base64Icon_home, scale: 3}} />}
                onPress={() => this.setState({ selectedTab: 'searchTab' })}>
                {this._addNavigator(Search, '搜索')}
              </TabNavigator.Item>
              <TabNavigator.Item
                selected={this.state.selectedTab === 'chatTab'}
                title="消息"
                renderIcon={() => <Image source={{uri: base64Icon_home, scale: 3}} />}
                renderSelectedIcon={() => <Image source={{uri: base64Icon_home, scale: 3}} />}
                onPress={() => this.setState({ selectedTab: 'chatTab' })}>
                {this._addNavigator(Search, '消息')}
              </TabNavigator.Item>
              <TabNavigator.Item
                selected={this.state.selectedTab === 'settingsTab'}
                title="设置"
                renderIcon={() => <Image source={{uri: base64Icon_home, scale: 3}} />}
                renderSelectedIcon={() => <Image source={{uri: base64Icon_home, scale: 3}} />}
                onPress={() => this.setState({ selectedTab: 'settingsTab' })}>
                {this._addNavigator(Settings, '设置')}
              </TabNavigator.Item>
            </TabNavigator>
          :null
        }
        {this.state.isLoginShow ?
            <Login loginSuccess={this._loginSuccess} />:null
        }
      </View>
    );
  }

});

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    content: {
        flex: 1,
    },
    text: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navBarText: {
      fontSize: 16,
      marginVertical: 19,
      color: 'white',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1
    },
    navBarTitleText: {
      marginVertical: 19,
    },
    navBarLeftButton: {
      paddingLeft: 10,
    },
    navBarRightButton: {
      paddingRight: 10,
    },
    navBarButtonText: {
    },
});

AppRegistry.registerComponent('NewbieAPP', () => NewbieAPP);
