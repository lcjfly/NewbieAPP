'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  ActionSheetIOS,
  AlertIOS,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = ReactNative;

var VersionDetail = React.createClass({
  render() {
    return (
      	<View style={styles.host}>
      	  <View style={{flexDirection: 'column', flex: 1}}>
      	  	<Text style={styles.no}>
      	  		{this.props.data.no}
      	  	</Text>
      	  	<Text numberOfLines={3} style={styles.content}>
      	  		{this.props.data.content}
      	  	</Text>
      	  </View>
      	</View>
    );
  },
});

const styles = StyleSheet.create({
  no: {

  },
  content: {

  }
});

module.exports = VersionDetail;