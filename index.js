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

exports.push = function (data) {

	var command = '';

	if (_.isArray(data)) {

		_.each(data, function (metric) {

			if (_.isString(metric)) {

				command = ['zabbix_sender -vv -z',
					CONFIG.zabbix.host,
					'-s fmdev-e1.dev.fly.me -k',
					metric,
					'-o',
					1].join(' ');

			} else {

				command = ['zabbix_sender -vv -z',
					CONFIG.zabbix.host,
					'-s fmdev-e1.dev.fly.me -k',
					metric.key,
					'-o',
					metric.hasOwnProperty('value') ? metric.value : 1].join(' ');

			}

			exec(command, function (error, data) {
				console.log(error);
				console.log(data);
			});

		});

	} else {

		if (_.isString(data)) {

			command = ['zabbix_sender -vv -z',
				CONFIG.zabbix.host,
				'-s fmdev-e1.dev.fly.me -k',
				data,
				'-o',
				1].join(' ');

		} else {

			command = ['zabbix_sender -vv -z',
				CONFIG.zabbix.host,
				'-s fmdev-e1.dev.fly.me -k',
				data.key,
				'-o',
				data.hasOwnProperty('value') ? data.value : 1].join(' ');

		}

		//console.log(command);
		exec(command, function (error) {
			console.log(error);
			console.log(data);
		});

	}

};