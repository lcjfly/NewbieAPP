'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  AlertIOS,
  ScrollView,
  StyleSheet,
  Text,
  View,
} = ReactNative;

var Service = require('./service');
var RoomCabinetColumnPairView = require('./RoomCabinetColumnPairView');

var RoomView = React.createClass({

  getInitialState: function() {

    var that = this;
    // fake data
    var cabinetColumnPairData = [
      [
        [{index: 1, name: 'JG01'}, {index: 10, name: 'JG10'}],
        [{index: 2, name: 'JG02'}, {index: 11, name: 'JG11'}],
      ],
      [
        [{index: 5, name: 'JG05'}, {index: 9, name: 'JG09'}],
        [{index: 8, name: 'JG08'}, {index: 18, name: 'JG18'}],
      ]
    ];
    var cabinetColumnPairViews = [];

    for(var i=0;i<cabinetColumnPairData.length;i++) {
      cabinetColumnPairViews.push(
      <RoomCabinetColumnPairView nav={that.props.nav} roomCabinetColumnPairDatas={cabinetColumnPairData[i]} />);
    }

    return {
      cabinetColumnPairViews: cabinetColumnPairViews
    };
  },

  componentDidMount: function() {
    
  },

  render() {
    return (
        <ScrollView horizontal={true} maximumZoomScale={2} minimumZoomScale={0.5} contentContainerStyle={styles.container}>
          {this.state.cabinetColumnPairViews}
        </ScrollView>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 50
  },
});

module.exports = RoomView;