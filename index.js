var nlog = require('fly-nlog'),
	nconf = require('fly-nconf'),
	exec = require('child_process').exec,
	_ = require('lodash');

//nconf.load(function () {
//
//	//CONFIG.zabbix.host = 'zabbix.dev.fly.me';
//	//exports.push('3ds_authorize_declinded_by_antifrod-filter');
//
//});

var hostname = null;

exec('hostname -f', function (error, _hostname) {
	hostname = _hostname.replace(/[\n\r]+/g, '');

	//nlog.info({
	//	message: 'FLY_ZABBIX:HOSTNAME',
	//	hostname: _hostname
	//});
});

exports.push = function (data) {

	// exec('hostname -f', function (error, _hostname) {
	// 	hostname = _hostname.replace(/[\n\r]+/g, '');

		var command = '';

		if (_.isArray(data)) {

			_.each(data, function (metric) {

				var command = ['zabbix_sender -vv -s',
						hostname,
						'-z '+CONFIG.zabbix.host+' -k',
						metric,
						'-o'];
				var commandStr;

				if (_.isString(metric)) {

					command.push(1);
					commandStr = command.join(' ');

				} else {

					command.push(metric.hasOwnProperty('value') ? metric.value : 1);
					command = command.join(' ');

				}

				exec(command, function (error, data) {
					console.log(error);
					console.log(data);
				});

			});

		} else {

			if (_.isString(data)) {

					command.push(1);
					commandStr = command.join(' ');

			} else {

					command.push(metric.hasOwnProperty('value') ? metric.value : 1);
					command = command.join(' ');

			}

			exec(commandStr, function (error) {
				console.log(error);
				console.log(data);
			});

		}

	// });

};