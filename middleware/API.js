var request = require('sync-request');
var getUrls = require('get-urls');
var bodyParser = require('body-parser');
var URL = require('url-parse');

var urlencodedParser = bodyParser.urlencoded({extended: false});

class API {
	static sendBurstSMS(data) {
		var message = data.message;
		var urls = getUrls(message);
		var config = process.env;

		urls.forEach(function(url) {
			var resp = this.generateShortURL(url);
			var respJson = JSON.parse(resp.getBody('utf8'));
			
			if(respJson.status_code <= 300) {
				console.log(respJson.data.url);
				var hostname = new URL(url).hostname
				var oldURL = url.replace(new URL(url).hostname, 'www.' + hostname)
				message = message.replace(oldURL, respJson.data.url);
				message = message.replace(url, respJson.data.url);
			}
		}.bind(this));
		var params = JSON.stringify('?to=' + data.to + '&message=' + message)
		console.log(params);
		var ret = request('GET', config.BURST_SMS_API_BASE_URL + 'send-sms.json' + params, {
			'headers': {
				'Authorization': this.generateBasicToken()
			}
		});
		return ret;
	}

	static generateShortURL(url) {
		var config = process.env;
		return request('GET', config.BITLY_API_BASE_URL + 'v3/shorten?access_token=' + config.BITLY_API_TOKEN + '&longUrl=' + url)
	}

	static generateBasicToken() {
		var config = process.env;
		return 'Basic ' + new Buffer(config.BURST_SMS_API_KEY + ':' + config.BURST_SMS_API_SECRET).toString('base64');
	}
}

module.exports = function(app) {
	app.post('/send-burst-sms', urlencodedParser, function(req, res) {
		res.json(JSON.parse(API.sendBurstSMS(req.body).getBody('utf8')));
	});

}