'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Alert,
  StyleSheet,
  Linking,
  Platform,
  ActionSheetIOS,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Navigator,
} = ReactNative;

var STATUS_BAR_HEIGHT = Navigator.NavigationBar.Styles.General.StatusBarHeight;

var GiftedMessenger = require('react-native-gifted-messenger');
var Communications = require('react-native-communications');
var WebSocket = require('WebSocket');
var Service = require('./service');
var HostMessage = require('./HostMessage');

var cView = React.createClass({
  getInitialState: function() {
    return {

    }
  },

  componentDidMount: function() {

  },

  _onClick: function() {
      Alert.alert('you clicked the msg');
  },

  render() {
    return (
      <TouchableOpacity onPress={this._onClick}>
        <View>
          <Text style={{color: '#000'}}>{this.props.msg}aaa</Text>
        </View>
      </TouchableOpacity>
    );
  },

});

var Message = React.createClass({

  _initWebSocket: function() {
    
    this._ws = new WebSocket(Service.ws_url);
    this._ws.onopen = () => {
      // connection opened
      console.log('on open');
      this._ws.send('something');
    };

    this._ws.onmessage = (e) => {
      // a message was received
      console.log('on message: '+e.data);
      this.handleReceive({
        text: e.data,
        name: 'from server',
        image: '',
        position: 'left',
        date: new Date(),
        uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
      });
    };

    this._ws.onerror = (e) => {
      // an error occurred
      console.log('on error: '+e.message);
    };

    this._ws.onclose = (e) => {
      // connection closed
      console.log('on close: '+e.code, e.reason);
    };
  },

  getInitialState: function() {
    this._initWebSocket();
    this._isMounted = false;
    this._messages = this.getInitialMessages();

    this.state = {
      messages: this._messages,
      isLoadingEarlierMessages: false,
      typingMessage: '',
      allLoaded: false,
    };

    return {};

  },

  componentDidMount() {
    this._isMounted = true;

    /*
    setTimeout(() => {
      this.setState({
        typingMessage: 'React-Bot is typing a message...',
      });
    }, 1000); // simulating network
    
    setTimeout(() => {
      this.setState({
        typingMessage: '',
      });
    }, 3000); // simulating network


    setTimeout(() => {
      this.handleReceive({
        text: 'Hello Awesome Developer',
        name: 'React-Bot',
        image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
        position: 'left',
        date: new Date(),
        uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
      });
    }, 3300); // simulating network
    */
  },

  componentWillUnmount() {
    this._isMounted = false;
  },

  getInitialMessages() {
    var that = this;
    return [
      {
        text: 'Are you building a chat app?',
        name: 'React-Bot',
        image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
        position: 'left',
        date: new Date(2016, 3, 14, 13, 0),
        uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
      },
      {
        text: "Yes, and I use Gifted Messenger!",
        name: 'Awesome Developer',
        image: null,
        position: 'right',
        date: new Date(2016, 3, 14, 13, 1),
        uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
      },
      {
        text: '[host1]',
        image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
        name: 'lcj',
        position: 'left',
        date: new Date(2016, 0, 2, 11, 0),
        uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
        nav: that.props.navigator
      }
    ];
  },

  setMessageStatus(uniqueId, status) {
    let messages = [];
    let found = false;

    for (let i = 0; i < this._messages.length; i++) {
      if (this._messages[i].uniqueId === uniqueId) {
        let clone = Object.assign({}, this._messages[i]);
        clone.status = status;
        messages.push(clone);
        found = true;
      } else {
        messages.push(this._messages[i]);
      }
    }

    if (found === true) {
      this.setMessages(messages);
    }
  },

  setMessages(messages) {
    this._messages = messages;

    // append the message
    this.setState({
      messages: messages,
    });
  },

  handleSend(message = {}) {

    this._ws.send(message.text);

    /*
    // Your logic here
    // Send message.text to your server

    message.uniqueId = Math.round(Math.random() * 10000); // simulating server-side unique id generation
    this.setMessages(this._messages.concat(message));

    // mark the sent message as Seen
    setTimeout(() => {
      this.setMessageStatus(message.uniqueId, 'Seen'); // here you can replace 'Seen' by any string you want
    }, 1000);

    // if you couldn't send the message to your server :
    // this.setMessageStatus(message.uniqueId, 'ErrorButton');
    */
  },

  onLoadEarlierMessages() {

    // display a loader until you retrieve the messages from your server
    this.setState({
      isLoadingEarlierMessages: true,
    });

    // Your logic here
    // Eg: Retrieve old messages from your server

    // IMPORTANT
    // Oldest messages have to be at the begining of the array
    var earlierMessages = [
      {
        text: 'React Native enables you to build world-class application experiences on native platforms using a consistent developer experience based on JavaScript and React. https://github.com/facebook/react-native',
        name: 'React-Bot',
        image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
        position: 'left',
        date: new Date(2016, 0, 1, 20, 0),
        uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
      }, {
        text: 'This is a touchable phone number 0606060606 parsed by taskrabbit/react-native-parsed-text',
        name: 'Awesome Developer',
        image: null,
        position: 'right',
        date: new Date(2016, 0, 2, 12, 0),
        uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
      }, {
        text: '[host1]',
        image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
        name: 'lcj',
        position: 'left',
        date: new Date(2016, 0, 2, 11, 0),
        uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
      },
    ];

    setTimeout(() => {
      this.setMessages(earlierMessages.concat(this._messages)); // prepend the earlier messages to your list
      this.setState({
        isLoadingEarlierMessages: false, // hide the loader
        allLoaded: true, // hide the `Load earlier messages` button
      });
    }, 1000); // simulating network

  },

  handleReceive(message = {}) {
    // make sure that your message contains :
    // text, name, image, position: 'left', date, uniqueId
    this.setMessages(this._messages.concat(message));
  },

  onErrorButtonPress(message = {}) {
    // Your logic here
    // re-send the failed message

    // remove the status
    this.setMessageStatus(message.uniqueId, '');
  },

  // will be triggered when the Image of a row is touched
  onImagePress(message = {}) {
    // Your logic here
    // Eg: Navigate to the user profile
  },

  render() {
    return (
        <GiftedMessenger
          ref={(c) => this._GiftedMessenger = c}

          styles={{
            bubbleRight: {
              marginLeft: 70,
              backgroundColor: '#007aff',
            },
          }}

          autoFocus={false}
          messages={this.state.messages}
          handleSend={this.handleSend.bind(this)}
          onErrorButtonPress={this.onErrorButtonPress.bind(this)}
          maxHeight={Dimensions.get('window').height - Navigator.NavigationBar.Styles.General.NavBarHeight - STATUS_BAR_HEIGHT}

          loadEarlierMessagesButton={!this.state.allLoaded}
          onLoadEarlierMessages={this.onLoadEarlierMessages.bind(this)}

          senderName='Awesome Developer'
          senderImage={null}
          onImagePress={this.onImagePress}
          displayNames={true}

          parseText={true} // enable handlePhonePress, handleUrlPress and handleEmailPress
          handlePhonePress={this.handlePhonePress}
          handleUrlPress={this.handleUrlPress}
          handleEmailPress={this.handleEmailPress}

          isLoadingEarlierMessages={this.state.isLoadingEarlierMessages}

          typingMessage={this.state.typingMessage}
        />
    );
  },

  handleUrlPress(url) {
    Linking.openURL(url);
  },

  // TODO
  // make this compatible with Android
  handlePhonePress(phone) {
    if (Platform.OS !== 'android') {
      var BUTTONS = [
        'Text message',
        'Call',
        'Cancel',
      ];
      var CANCEL_INDEX = 2;

      ActionSheetIOS.showActionSheetWithOptions({
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            Communications.phonecall(phone, true);
            break;
          case 1:
            Communications.text(phone);
            break;
        }
      });
    }
  },

  handleEmailPress(email) {
    Communications.email(email, null, null, null, null);
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

module.exports = Message;