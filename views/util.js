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
	default_cabinet_count_per_column: 20,	// 机房每列机柜数量
	default_u_height: 15,	// 机柜每个u高度,

	// base64 img
	base64Icon_menu: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAfCAMAAABNnRR0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAM1BMVEUAAAA7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pkr///9QX8CJAAAAD3RSTlMA9mllBwa4sfesraYEbGjgs2NSAAAAAWJLR0QQlbINLAAAAEJJREFUOMtj4CcSMDIMrEomIgEzwyggBrAQCVgZ2IgE7ETHJgcNUggHAydxgIubgYdYMNCRNEQAL5GAb4DLEKJVAgC5TSFHevfP6AAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNS0xMC0xNVQyMjo0OToyNCswODowMBdIpzMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTUtMTAtMTVUMjI6NDk6MjQrMDg6MDBmFR+PAAAATnRFWHRzb2Z0d2FyZQBJbWFnZU1hZ2ljayA2LjguOC0xMCBRMTYgeDg2XzY0IDIwMTUtMDctMTkgaHR0cDovL3d3dy5pbWFnZW1hZ2ljay5vcmcFDJw1AAAAGHRFWHRUaHVtYjo6RG9jdW1lbnQ6OlBhZ2VzADGn/7svAAAAGHRFWHRUaHVtYjo6SW1hZ2U6OkhlaWdodAAzOTCt18QXAAAAF3RFWHRUaHVtYjo6SW1hZ2U6OldpZHRoADUwMgVnMp0AAAAZdEVYdFRodW1iOjpNaW1ldHlwZQBpbWFnZS9wbmc/slZOAAAAF3RFWHRUaHVtYjo6TVRpbWUAMTQ0NDkyMDU2NFbP3tAAAAATdEVYdFRodW1iOjpTaXplADIuMzJLQkKoICh3AAAAWnRFWHRUaHVtYjo6VVJJAGZpbGU6Ly8vaG9tZS93d3dyb290L3d3dy5lYXN5aWNvbi5uZXQvY2RuLWltZy5lYXN5aWNvbi5jbi9zcmMvMTE5NTIvMTE5NTIyNy5wbmdfsmBnAAAAAElFTkSuQmCC',

	//view_height: Navigator.NavigationBar.Styles.General.NavBarHeight - Navigator.NavigationBar.Styles.General.StatusBarHeight
}

module.exports = Util;