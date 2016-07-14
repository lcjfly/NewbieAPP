'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} = ReactNative;

var ChatBoxView = require('./ChatBoxView');
var Service = require('./service');
var LSM = require('./LocalStorageManager');

var ChatView = React.createClass({
  getInitialState: function() {
    var chatboxs = [];
    /*
    var messages = [
      {
        name: "鲁辰杰",
        date: new Date(),
        text: "现在几点？",
        img: "",
        position: "left",
        id: 12345
      },
      {
        name: "匿名",
        date: new Date(),
        text: "现在是北京时间6点",
        img: "",
        position: "left",
        id: 123456
      },
    ];

    var chatboxs = [];
    for(var i=0;i<messages.length;i++) {
      chatboxs.push(<ChatBoxView message={messages[i]} />);
    }

    var that = this;
    setInterval(() => {
      chatboxs.push(<ChatBoxView message={messages[0]} />);
      that.setState({
        chatboxs: chatboxs
      });
    }, 3000); // simulating network
    */

    var that = this;
    LSM.getUsername(function(err, username) {
      that.setState({
        username: username
      });
      that._initWebSocket();
    });

    return {
      username: '',
      content: '',
      chatboxs: chatboxs,
    }
  },

  componentDidMount: function() {

  },

  render() {
    var _scrollView;
    return (
      <View style={styles.container}>
        <View style={{flex:1}}>
          <ScrollView 
            style={styles.chatboxlist} 
            ref={(scrollView) => { _scrollView = scrollView; }}
            onContentSizeChange={(contentWidth, contentHeight) => {
              //_scrollView.scrollTo({y: contentHeight/2});
            }}
          >
              {this.state.chatboxs}
          </ScrollView>
        </View>
        <View style={{flexDirection: 'row', padding: 5}}>
          <View style={{flex:1}}>
            <TextInput value={this.state.content}
                       style={{height: 40, borderColor: 'gray', borderWidth: 1, padding: 5}}
                       onChangeText={this._getContent}
                       placeholder="请输入..." />
          </View>
          <View>
            <TouchableHighlight onPress={this._handleSend}>
              <View style={styles.btn}>
                <Text style={{color: '#fff'}}>发送</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  },

    _getContent: function(val) {
    this.setState({
      content: val
    });
  },

  _initWebSocket: function() {

    var that = this;
    var W3CWebSocket = require('websocket').w3cwebsocket;

    this._ws = new W3CWebSocket(Service.ws_url);

    this._ws.onerror = function() {
        console.log('Connection Error');
    };

    this._ws.onopen = function() {
        console.log('WebSocket Client Connected');
    };

    this._ws.onclose = function() {
        console.log('echo-protocol Client Closed');
    };

    this._ws.onmessage = function(e) {
        if (typeof e.data === 'string') {
            console.log("Received: '" + e.data + "'");
            that.handleReceive(e.data);
        }
    };

  },

  _handleSend() {
    var chatMsg = [
        Math.round(Math.random() * 10000), // simulating server-side unique id generation
        this.state.username,
        this.state.content,
        (new Date()).Format("yyyy-MM-dd hh:mm:ss"),
    ];

    this._ws.send(JSON.stringify(chatMsg));
    this.setState({
      content: ''
    });
  },

  handleReceive(message = {}) {
    // make sure that your message contains :
    // text, name, image, position: 'left', date, uniqueId
    var msg = eval(message);
    var messageData = {
      id: msg[0],
      name: msg[1],
      text: msg[2],
      date: msg[3]
    };
    var chatboxs = this.state.chatboxs;
    chatboxs.push(<ChatBoxView message={messageData} />);
    this.setState({
      chatboxs: chatboxs
    });
  },

});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 50
  },
  chatboxlist: {
    flexDirection: 'column',
  },
  inputView: {
    flexDirection: 'row'
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1DB8FF',
    height: 38,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 4,
    marginLeft: 5
  }
});

module.exports = ChatView;