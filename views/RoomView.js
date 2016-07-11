'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  ScrollView,
  StyleSheet,
  Text,
  View,
} = ReactNative;

var Service = require('./service');
var Util = require('./util');
var LSM = require('./LocalStorageManager');
var RoomCabinetColumnPairView = require('./RoomCabinetColumnPairView');

var RoomView = React.createClass({

  getInitialState: function() {

    var that = this;
    
    var cabinetColumnPairData = LSM.fakeCabinetColumnPairData;
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
    var that =this;
    /*
    setTimeout(function() {
      that.refs._scrollView.scrollTo({y: 10, x: 10, animated: true});
    }, 2000); 

    setTimeout(function() {
      that.refs._scrollView.scrollTo({y: -10, x:-10, animated: true});
    }, 3000); 
    */
  },

  render() {
    return (
        <ScrollView ref="_scrollView" horizontal={false} maximumZoomScale={2} minimumZoomScale={0.5} contentContainerStyle={styles.container}>
          {this.state.cabinetColumnPairViews}
        </ScrollView>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#f00',
    marginTop: 20,
  },
});

module.exports = RoomView;