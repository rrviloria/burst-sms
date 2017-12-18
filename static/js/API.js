var jQuery = require('jQuery');


class API {
	static sendBurstSMS(data, headers={'Content-Type': 'application/x-www-form-urlencoded'}) {
		headers = jQuery.extends(headers, {
			'Authorization': thi.generateBasicToken()
		});
		return jQuery.ajax({
			'method': 'POST',
			'headers': headers,
			'url': 'https://api.transmitsms.com/send-sms.json',
			'data': data
		});
	},

	static generateBasicToken() {
		return 'Basic ' + window.btoa('cb5fd450acf95e69a47a8352c84288ca:burstsmsTEST@')
	}
}

module.exports default API