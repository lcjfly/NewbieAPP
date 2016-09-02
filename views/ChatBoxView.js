'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = ReactNative;

var ChatBoxView = React.createClass({
  getInitialState: function() {
    return {
      name: this.props.message.name,
      time: this.props.message.time!=null?this.props.message.time.toString():'',
      text: this.props.message.text,
      img: this.props.message.img,
      position: this.props.message.position,
      id: this.props.message.id
    }
  },

  componentDidMount: function() {

  },

  render() {
    return (
		<View style={styles.chatbox}>
      		<View style={{flex: 1}}>
          		<View style={styles.name}>
          			<Text>{this.state.name}</Text>
	          	</View>
	          	<View style={styles.textView}>
	          		<Text style={styles.text}>{this.state.text}</Text>
	          	</View>
	          	<View style={styles.timeView}>
	          		<Text style={styles.time}>{this.state.time}</Text>
	          	</View>
          	</View>
        </View>
    );
  },
});

const styles = StyleSheet.create({
	chatbox: {
		flexDirection: 'row',
		padding: 5,
		paddingLeft: 10
	},
	img: {
		width: 50,
		height: 50,
		padding:3
	},
	name: {

	},
	textView: {
		borderLeftWidth: 3,
		borderColor: 'green'
	},
	text: {
		fontSize: 20,
		marginLeft: 10,
	},
	time: {
		fontSize: 10
	}
});

module.exports = ChatBoxView;