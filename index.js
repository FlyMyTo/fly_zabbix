var request = require('request'),
	nlog = require('fly-nlog'),
	_ = require('lodash');

var _sendData = {
	request: 'sender data',
	data: []
};

exports.push = function (data) {

	var url = ['http://', CONFIG.zabbix.host, ':', CONFIG.zabbix.port].join(''),
		_metric = {};

	_metric.host = CONFIG.zabbix.monitoredHost;
	_metric.key = null;
	_metric.value = 1;

	var sendData = _.clone(_sendData, true);

	if (_.isArray(data)) {

		_.each(data, function (metric) {

			sendData.data.push(_.extend(_metric, metric));

		});

	} else {

		sendData.data.push(_.extend(_metric, data));

	}

	var post = {};
	post.url = url;
	post.json = sendData;

	request.post(post, function (error, response, result) {

		console.log(error);
		console.log(result);

	});

};