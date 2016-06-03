var React = require('react-native');
var Dimensions = require('Dimensions');

var Service = require('./service');

var { 
	AsyncStorage,
	Navigator,
	PixelRatio
} = React;

var Util = {
	// ppi
	pixel: 1/PixelRatio.get(),

	size: {
		height: Dimensions.get('window').width,
		width: Dimensions.get('window').height
	},

	//将二维数组转成json对象
	  arr2Obj:function(arr){
	    var obj = {};
	    for(var i in arr){
	      var newArr = arr[i];
	      obj[arr[i][0]] = arr[i][1];
	    }
	    return obj;
	  },

	get: function(url, data, callback) {
		this._fetchMethod('GET', url, data, callback);
	},

	post: function(url, data, callback) {
		this._fetchMethod('POST', url, data, callback);
	},

	put: function(url, data, callback) {
		this._fetchMethod('PUT', url, data, callback);
	},

	delete: function(url, data, callback) {
		this._fetchMethod('DELETE', url, data, callback);
	},

	_fetchMethod: function(method, url, data, callback) {
		AsyncStorage.getItem('token', function(errs, value) {
	      if(!errs) {
	        var fetchOptions = {
				method: method,
				headers: {
					"Authorization": "AUTH "+value,
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
			};

			if(method !='GET') {
				fetchOptions.body = JSON.stringify(data);
			}

			fetch(url, fetchOptions)
				.then((response) => response.text())
				.then((responseText) => {
					callback(JSON.parse(responseText));
				});
		  }
	    });
	},

	setLocalFavirates: function(hostIds, cabinetIds) {
		AsyncStorage.multiSet([
          [Service.LS_F_HOSTIDS, JSON.stringify(hostIds)],
          [Service.LS_F_CABINETIDS, JSON.stringify(cabinetIds)],
        ], function(err) {
          if(err) {
          }else {
          }
        });
	},

	isFaviratedHost: function(hostid, callback) {
		AsyncStorage.getItem(Service.LS_F_HOSTIDS, function(err, value) {
	      if(!err) {
	      	var fHostIds = value;
	      	if(fHostIds.indexOf(hostid) != -1) {
	      		callback(null, true)	
	      	} else {
	      		callback(null, false)
	      	}
	      } else {
	      	console.log('isFaviratedHost failed \n\n');
	      }
	  });
	},

	isFaviratedCabinet: function(cabinetid, callback) {
		AsyncStorage.getItem(Service.LS_F_CABINETIDS, function(err, value) {
	      if(!err) {
	      	var fCabinetIds = value;
	      	console.log('fCabinetIds'+fCabinetIds);
	      	if(fCabinetIds.indexOf(cabinetid) != -1) {
	      		callback(null, true)	
	      	} else {
	      		callback(null, false)
	      	}
	      }
	  });
	},

	//key
	key: 'keyxxx',

	default_u_count: 42,	// 机柜默认u数量
	u_height: 15,	// 机柜每个u高度,

	//view_height: Navigator.NavigationBar.Styles.General.NavBarHeight - Navigator.NavigationBar.Styles.General.StatusBarHeight
}

module.exports = Util;