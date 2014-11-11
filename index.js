var nlog = require('fly-nlog'),
	nconf = require('fly-nconf'),
	exec = require('child_process').exec,
	_ = require('lodash');

var hostname = null;

exec('hostname -f', function (error, _hostname) {
	hostname = _hostname.replace(/[\n\r]+/g, '');
});

exports.push = function (data) {

		var command = ['zabbix_sender -vv',
			"-s " + hostname,
			'-z '+CONFIG.zabbix.host,
		];

		var dataArr = _.isArray(data) ? data : [data];

		_.each(data, function (metric) {

			if (_.isString(metric)) {

				command.push("-k " + metric);
				command.push('-o ' + 1);

			} else {

				command.push("-k " + metric.key);
				command.push('-o ' + metric.hasOwnProperty('value') ? metric.value : 1);
				
			}

			exec(command.join(' '), function (error, data) {
				console.log(error);
				console.log(data);
			});
		});

};