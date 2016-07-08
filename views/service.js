var Service = {
	host: 'http://192.168.1.201:3000', //http://opspoc.csvw.com',
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

	getHostById: '/host/',

	version: '/version/',

	LS_F_HOSTIDS: 'LS_F_HOSTIDS',
	LS_F_CABINETIDS: 'LS_F_CABINETIDS',

	ws_url: 'ws://localhost:3000',

	
}

module.exports = Service;