var domain= 'opspoc.csvw.com';
var http_port = 80;
var Service = {
	host: 'http://'+domain+':'+http_port,
	reg: '/user/reg',
	login: '/user/login',
	loginByToken: '/user/login/token',
	logout: '/user/logout',
	favirate: '/user/favirate',
	searchHost: '/host/search',
	hostFavirated: '/host/favirated/',
	searchCabinet: '/cabinet/search',
	feedback: '/feedback/new',
	favirateHost: '/user/favirate/host/',
	favirateCabinet: '/user/favirate/cabinet/',

	getCabinetById: '/cabinet/',
	getHostById: '/host/',

	version: '/version/',

	LS_F_HOSTIDS: 'LS_F_HOSTIDS',
	LS_F_CABINETIDS: 'LS_F_CABINETIDS',
	LS_HOSTS: 'LS_HOSTS',
	LS_CABINETS: 'LS_CABINETS',

	ws_url: 'ws://'+domain+':'+http_port,

	
}

module.exports = Service;