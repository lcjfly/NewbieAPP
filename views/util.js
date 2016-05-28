var React = require('react-native');
var Dimensions = require('Dimensions');

var { 
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

	post: function(url, data, callback) {
		var fetchOptions = {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		};

		fetch(url, fetchOptions)
			.then((response) => response.text())
			.then((responseText) => {
				callback(JSON.parse(responseText));
			});
	},

	postWithToken: function(url, token, data, callback) {
		var fetchOptions = {
			method: 'POST',
			headers: {
				"Authorization": "AUTH "+token,
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		};

		fetch(url, fetchOptions)
			.then((response) => response.text())
			.then((responseText) => {
				callback(JSON.parse(responseText));
			});
	},

	//key
	key: 'keyxxx'
}

module.exports = Util;