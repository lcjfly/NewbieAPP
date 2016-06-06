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
var RoomCabinetColumnPairView = require('./RoomCabinetColumnPairView');

var RoomView = React.createClass({

  getInitialState: function() {

    var that = this;
    // fake data
    var cabinetColumnPairData = [
      [
        [
          {index: 0, name: ' ', type: Util.CABINET_TYPE_POWER},
          {index: 1, name: 'JG173', type: Util.CABINET_TYPE_STORAGE_HP_SUN},
          {index: 2, name: 'JG179', type: Util.CABINET_TYPE_STORAGE_HP_SUN},
          {index: 3, name: 'JG180', type: Util.CABINET_TYPE_STORAGE_HP_SUN},
          {index: 5, name: 'JG17', type: Util.CABINET_TYPE_CABLE},
          {index: 6, name: 'JG290', type: Util.CABINET_TYPE_STORAGE_HP_SUN},
          {index: 7, name: 'JG291', type: Util.CABINET_TYPE_STORAGE_HP_SUN},
          {index: 8, name: 'JG295', type: Util.CABINET_TYPE_STORAGE_HP_SUN},
          {index: 15, name: 'JG08', type: Util.CABINET_TYPE_CABLE},
          {index: 16, name: 'JG09', type: Util.CABINET_TYPE_STORAGE_HP_SUN},
          {index: 18, name: 'JG10', type: Util.CABINET_TYPE_NETWORK},
          {index: 19, name: 'JG11', type: Util.CABINET_TYPE_NETWORK},
          {index: 20, name: 'JG12', type: Util.CABINET_TYPE_NETWORK},
          {index: 21, name: 'JG13', type: Util.CABINET_TYPE_NETWORK},
          {index: 22, name: 'JG14', type: Util.CABINET_TYPE_NETWORK},
        ],
        [
          {index: 0, name: 'SPM-9', type: Util.CABINET_TYPE_POWER},
          {index: 1, name: 'JG292', type: Util.CABINET_TYPE_STORAGE_HP_SUN},
          {index: 2, name: 'JG171', type: Util.CABINET_TYPE_STORAGE_HP_SUN},
          {index: 3, name: 'JG184', type: Util.CABINET_TYPE_STORAGE_HP_SUN},
          {index: 4, name: 'JG293', type: Util.CABINET_TYPE_OTHER},
          {index: 5, name: 'JG16', type: Util.CABINET_TYPE_CABLE},
          {index: 6, name: 'JG294', type: Util.CABINET_TYPE_OTHER},
          {index: 8, name: 'JG151', type: Util.CABINET_TYPE_OTHER},
          {index: 9, name: 'JG152', type: Util.CABINET_TYPE_OTHER},
          {index: 10, name: 'JG15', type: Util.CABINET_TYPE_STORAGE_HP_SUN},
          {index: 15, name: 'JG01', type: Util.CABINET_TYPE_NETWORK},
          {index: 16, name: 'JG02', type: Util.CABINET_TYPE_NETWORK},
          {index: 17, name: 'JG03', type: Util.CABINET_TYPE_NETWORK},
          {index: 18, name: 'JG04', type: Util.CABINET_TYPE_NETWORK},
          {index: 19, name: 'JG05', type: Util.CABINET_TYPE_NETWORK},
          {index: 20, name: 'JG06', type: Util.CABINET_TYPE_NETWORK},
          {index: 21, name: 'JG07', type: Util.CABINET_TYPE_NETWORK},
          {index: 22, name: 'SPM-10', type: Util.CABINET_TYPE_POWER},
        ]
      ],
      [
        [
          {index: 0, name: 'SPM-7', type: Util.CABINET_TYPE_POWER}, 
          {index: 1, name: 'JG279', type: Util.CABINET_TYPE_IBMP},
          {index: 2, name: 'JG278', type: Util.CABINET_TYPE_IBMP},
          {index: 3, name: 'JG277', type: Util.CABINET_TYPE_IBMP},
          {index: 4, name: 'JG276', type: Util.CABINET_TYPE_IBMP},
          {index: 5, name: 'JG275', type: Util.CABINET_TYPE_IBMP},
          {index: 6, name: 'JG274', type: Util.CABINET_TYPE_IBMP},
          {index: 7, name: 'JG273', type: Util.CABINET_TYPE_IBMP},
          {index: 8, name: 'JG272', type: Util.CABINET_TYPE_IBMP},
          {index: 9, name: 'JG271', type: Util.CABINET_TYPE_IBMP},
          {index: 10, name: 'JG270', type: Util.CABINET_TYPE_IBMP},
          {index: 11, name: 'JG27', type: Util.CABINET_TYPE_CABLE},
          {index: 12, name: 'JG28', type: Util.CABINET_TYPE_CABLE},
          {index: 13, name: 'JG280', type: Util.CABINET_TYPE_PC},
          {index: 14, name: 'JG281', type: Util.CABINET_TYPE_PC},
          {index: 15, name: 'JG282', type: Util.CABINET_TYPE_PC},
          {index: 16, name: 'JG283', type: Util.CABINET_TYPE_PC},
          {index: 17, name: 'JG284', type: Util.CABINET_TYPE_PC},
          {index: 18, name: 'JG285', type: Util.CABINET_TYPE_PC},
          {index: 19, name: 'JG286', type: Util.CABINET_TYPE_STORAGE_HP_SUN},
          {index: 20, name: ' ', type: Util.CABINET_TYPE_STORAGE_HP_SUN},
          {index: 21, name: 'JG288', type: Util.CABINET_TYPE_STORAGE_HP_SUN},
          {index: 22, name: ' ', type: Util.CABINET_TYPE_STORAGE_HP_SUN},
          {index: 23, name: 'SPM-8', type: Util.CABINET_TYPE_POWER}, 
        ],
        [
          {index: 0, name: 'SPM-5', type: Util.CABINET_TYPE_POWER}, 
          {index: 1, name: ' ', type: Util.CABINET_TYPE_IBMP},
          {index: 2, name: 'JG258', type: Util.CABINET_TYPE_IBMP},
          {index: 3, name: 'JG257', type: Util.CABINET_TYPE_IBMP},
          {index: 4, name: 'JG256', type: Util.CABINET_TYPE_IBMP},
          {index: 5, name: 'JG255', type: Util.CABINET_TYPE_IBMP},
          {index: 6, name: 'JG254', type: Util.CABINET_TYPE_IBMP},
          {index: 7, name: 'JG253', type: Util.CABINET_TYPE_IBMP},
          {index: 8, name: 'JG252', type: Util.CABINET_TYPE_IBMP},
          {index: 9, name: 'JG251', type: Util.CABINET_TYPE_IBMP},
          {index: 10, name: 'JG250', type: Util.CABINET_TYPE_IBMP},
          {index: 11, name: 'JG25', type: Util.CABINET_TYPE_CABLE},
          {index: 12, name: 'JG26', type: Util.CABINET_TYPE_CABLE},
          {index: 13, name: 'JG260', type: Util.CABINET_TYPE_PC},
          {index: 14, name: 'JG261', type: Util.CABINET_TYPE_PC},
          {index: 15, name: 'JG262', type: Util.CABINET_TYPE_STORAGE_HP_SUN},
          {index: 16, name: 'JG263', type: Util.CABINET_TYPE_STORAGE_HP_SUN},
          {index: 17, name: 'JG264', type: Util.CABINET_TYPE_STORAGE_HP_SUN},
          {index: 18, name: 'JG265', type: Util.CABINET_TYPE_STORAGE_HP_SUN},
          {index: 19, name: 'JG266', type: Util.CABINET_TYPE_STORAGE_HP_SUN},
          {index: 20, name: 'JG267', type: Util.CABINET_TYPE_STORAGE_HP_SUN},
          {index: 21, name: 'JG288', type: Util.CABINET_TYPE_STORAGE_HP_SUN},
          {index: 22, name: 'JG269', type: Util.CABINET_TYPE_STORAGE_HP_SUN},
          {index: 23, name: 'SPM-6', type: Util.CABINET_TYPE_POWER}, 
        ],
      ],
      [
        [
          {index: 0, name: 'SPM-3', type: Util.CABINET_TYPE_POWER}, 
          {index: 1, name: 'JG239', type: Util.CABINET_TYPE_PC},
          {index: 2, name: 'JG238', type: Util.CABINET_TYPE_PC},
          {index: 3, name: 'JG237', type: Util.CABINET_TYPE_PC},
          {index: 4, name: 'JG236', type: Util.CABINET_TYPE_PC},
          {index: 5, name: 'JG235', type: Util.CABINET_TYPE_PC},
          {index: 6, name: 'JG234', type: Util.CABINET_TYPE_CAE_HPC},
          {index: 7, name: 'JG233', type: Util.CABINET_TYPE_CAE_HPC},
          {index: 8, name: 'JG232', type: Util.CABINET_TYPE_CAE_HPC},
          {index: 9, name: 'JG231', type: Util.CABINET_TYPE_CAE_HPC},
          {index: 10, name: 'JG230', type: Util.CABINET_TYPE_CAE_HPC},
          {index: 11, name: 'JG23', type: Util.CABINET_TYPE_CABLE},
          {index: 12, name: 'JG24', type: Util.CABINET_TYPE_CABLE},
          {index: 13, name: 'JG240', type: Util.CABINET_TYPE_PC},
          {index: 14, name: 'JG241', type: Util.CABINET_TYPE_PC},
          {index: 15, name: 'JG242', type: Util.CABINET_TYPE_PC},
          {index: 16, name: 'JG243', type: Util.CABINET_TYPE_PC},
          {index: 17, name: 'JG244', type: Util.CABINET_TYPE_PC},
          {index: 18, name: 'JG245', type: Util.CABINET_TYPE_PC},
          {index: 19, name: 'JG246', type: Util.CABINET_TYPE_PC},
          {index: 20, name: 'JG247', type: Util.CABINET_TYPE_PC},
          {index: 21, name: 'JG248', type: Util.CABINET_TYPE_PC},
          {index: 22, name: 'JG249', type: Util.CABINET_TYPE_PC},
          {index: 23, name: 'SPM-4', type: Util.CABINET_TYPE_POWER},
        ],
        [
          {index: 0, name: 'SPM-1', type: Util.CABINET_TYPE_POWER}, 
          {index: 1, name: 'JG219', type: Util.CABINET_TYPE_STORAGE_HP_SUN},
          {index: 2, name: 'JG218', type: Util.CABINET_TYPE_STORAGE_HP_SUN},
          {index: 3, name: 'JG217', type: Util.CABINET_TYPE_PC},
          {index: 4, name: 'JG216', type: Util.CABINET_TYPE_STORAGE_HP_SUN},
          {index: 5, name: 'JG215', type: Util.CABINET_TYPE_PC},
          {index: 6, name: 'JG214', type: Util.CABINET_TYPE_PC},
          {index: 7, name: 'JG213', type: Util.CABINET_TYPE_CAE_HPC},
          {index: 8, name: 'JG212', type: Util.CABINET_TYPE_IBMP},
          {index: 9, name: 'JG211', type: Util.CABINET_TYPE_IBMP},
          {index: 10, name: 'JG210', type: Util.CABINET_TYPE_CAE_HPC},
          {index: 11, name: 'JG21', type: Util.CABINET_TYPE_CABLE},
          {index: 12, name: 'JG22', type: Util.CABINET_TYPE_CABLE},
          {index: 13, name: 'JG220', type: Util.CABINET_TYPE_PC},
          {index: 14, name: 'JG221', type: Util.CABINET_TYPE_PC},
          {index: 15, name: 'JG222', type: Util.CABINET_TYPE_PC},
          {index: 16, name: 'JG223', type: Util.CABINET_TYPE_PC},
          {index: 17, name: 'JG224', type: Util.CABINET_TYPE_PC},
          {index: 18, name: 'JG225', type: Util.CABINET_TYPE_PC},
          {index: 19, name: 'JG226', type: Util.CABINET_TYPE_PC},
          {index: 20, name: 'JG227', type: Util.CABINET_TYPE_PC},
          {index: 21, name: 'JG228', type: Util.CABINET_TYPE_PC},
          {index: 22, name: 'JG229', type: Util.CABINET_TYPE_PC},
          {index: 23, name: 'SPM-2', type: Util.CABINET_TYPE_POWER},
        ],
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
        <ScrollView ref="_scrollView" horizontal={true} maximumZoomScale={2} minimumZoomScale={0.5} contentContainerStyle={styles.container}>
          {this.state.cabinetColumnPairViews}
        </ScrollView>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#f00'
  },
});

module.exports = RoomView;