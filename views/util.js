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
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width
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

	//key
	key: 'keyxxx',

	default_u_count: 42,	// 机柜默认u数量
	default_cabinet_count_per_column: 24,	// 机房每列机柜数量
	default_u_height: Dimensions.get('window').width/20,	// 机柜每个u高度,
	default_room_cabinet_paddingTop: Dimensions.get('window').height/150,
	default_room_cabinet_paddingBottom: Dimensions.get('window').height/150,

	// base64 img
	base64Icon_menu: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAfCAMAAABNnRR0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAM1BMVEUAAAA7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pko7Pkr///9QX8CJAAAAD3RSTlMA9mllBwa4sfesraYEbGjgs2NSAAAAAWJLR0QQlbINLAAAAEJJREFUOMtj4CcSMDIMrEomIgEzwyggBrAQCVgZ2IgE7ETHJgcNUggHAydxgIubgYdYMNCRNEQAL5GAb4DLEKJVAgC5TSFHevfP6AAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNS0xMC0xNVQyMjo0OToyNCswODowMBdIpzMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTUtMTAtMTVUMjI6NDk6MjQrMDg6MDBmFR+PAAAATnRFWHRzb2Z0d2FyZQBJbWFnZU1hZ2ljayA2LjguOC0xMCBRMTYgeDg2XzY0IDIwMTUtMDctMTkgaHR0cDovL3d3dy5pbWFnZW1hZ2ljay5vcmcFDJw1AAAAGHRFWHRUaHVtYjo6RG9jdW1lbnQ6OlBhZ2VzADGn/7svAAAAGHRFWHRUaHVtYjo6SW1hZ2U6OkhlaWdodAAzOTCt18QXAAAAF3RFWHRUaHVtYjo6SW1hZ2U6OldpZHRoADUwMgVnMp0AAAAZdEVYdFRodW1iOjpNaW1ldHlwZQBpbWFnZS9wbmc/slZOAAAAF3RFWHRUaHVtYjo6TVRpbWUAMTQ0NDkyMDU2NFbP3tAAAAATdEVYdFRodW1iOjpTaXplADIuMzJLQkKoICh3AAAAWnRFWHRUaHVtYjo6VVJJAGZpbGU6Ly8vaG9tZS93d3dyb290L3d3dy5lYXN5aWNvbi5uZXQvY2RuLWltZy5lYXN5aWNvbi5jbi9zcmMvMTE5NTIvMTE5NTIyNy5wbmdfsmBnAAAAAElFTkSuQmCC',

	view_height: Dimensions.get('window').height - Navigator.NavigationBar.Styles.General.NavBarHeight,

	// 机柜类型
	CABINET_TYPE_STORAGE_HP_SUN: 'storage-hp-sun',
	CABINET_TYPE_IBMP: 'ibmp',
	CABINET_TYPE_NETWORK: 'network',
	CABINET_TYPE_PC: 'pc',
	CABINET_TYPE_CAE_HPC: 'cae-hpc',
	CABINET_TYPE_CABLE: 'cable',
	CABINET_TYPE_POWER: 'power',
	CABINET_TYPE_OTHER: 'other',

	CABINET_DEFAULT_COLOR: '#fff',
	CABINET_COLOR_STORAGE_HP_SUN: '#56a3d8',
	CABINET_COLOR_IBMP: '#077ac9',
	CABINET_COLOR_NETWORK: '#c95513',
	CABINET_COLOR_PC: '#f18f45',
	CABINET_COLOR_CAE_HPC: '#eec100',
	CABINET_COLOR_CABLE: '#aaa',
	CABINET_COLOR_POWER: '#808080',
	CABINET_COLOR_OTHER: '#86a6d9',

	TEXT_FAVIRATE_ADD: '加入收藏',
	TEXT_FAVIRATE_REMOVE: '移出收藏'

}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

module.exports = Util;