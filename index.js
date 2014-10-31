var request = require('request'),
	nlog = require('fly-nlog'),
	nconf = require('fly-nconf'),
	_ = require('lodash');

var _sendData = {
	request: 'sender data',
	data: []
};

nconf.load(function (error) {
});

exports.push = function (data) {

	var url = ['http://', CONFIG.zabbix.host, ':', CONFIG.zabbix.port].join(''),
		_metric = {};

	_metric.host = CONFIG.zabbix.monitoredHost;
	_metric.key = null;
	_metric.value = 1;

	var sendData = _.clone(_sendData, true);

	if (_.isArray(data)) {

		_.each(data, function (metric) {

			var newMetric = _.extend({}, _metric);

			if (_.isString(metric)) {

				newMetric.key = metric;
				sendData.data.push(newMetric);


			} else {

				sendData.data.push(_.extend(newMetric, metric));

			}

		});

	} else {

		if (_.isString(data)) {

			_metric.key = data;
			sendData.data.push(_metric);

		} else {

			sendData.data.push(_.extend(_metric, data));

		}

	}

	var post = {};
	post.url = url;
	post.json = sendData;

	request.post(post, function (error, response, result) {

		console.log(error);
		console.log(result);

	});

};