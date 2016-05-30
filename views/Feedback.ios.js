'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  AlertIOS,
  AsyncStorage,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} = ReactNative;

var Util = require('./util');
var Service = require('./service');

var Feedback = React.createClass({
  getInitialState: function() {
    return {
      content: ''
    };
  },

  componentDidMount: function() {

    
    
  },

  _getContent: function(val) {
    this.setState({
      content: val
    });
  },

  _postFeedback: function() {
    var path = Service.host + Service.feedback;
    var that = this;

    // feedback action
    Util.post(path, {
      content: that.state.content
    }, function(data) {
      if(data.status) {
        AlertIOS.alert('反馈', data.msg);
      } else {
        AlertIOS.alert('反馈', '提交成功');
      }
    });
  },

	render() {
	    return (
	      <ScrollView>
          <View>
            <TextInput multiline={true} 
                       onChangeText={this._getContent}
                       style={styles.textInput}
                       placeholder="请输入意见内容" />
          </View>
          <View style={{marginTop: 20}}>
            <TouchableHighlight onPress={this._postFeedback}>
              <View style={styles.btn}>
                <Text style={{color: '#fff'}}>提交反馈</Text>
              </View>
            </TouchableHighlight>
          </View>
        </ScrollView>
	    );
  	}
});

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    height: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 8,
    fontSize: 13,
    borderRadius: 4
  },

  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1DB8FF',
    height: 38,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 4
  }
});

module.exports = Feedback;