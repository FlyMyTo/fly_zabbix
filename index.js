var exec = require('child_process').exec,
	_ = require('lodash');

var hostname = null;

exec('hostname -f', function (error, _hostname) {
	hostname = _hostname.replace(/[\n\r]+/g, '');
});

exports.push = function (data) {

	data = _.isArray(data) ? data : [data];

	_.each(data, function (metric) {

		var command = ['zabbix_sender -vv',
			'-s ' + hostname,
			'-z ' + CONFIG.zabbix.host
		];

		if (_.isString(metric)) {

			command.push('-k ' + metric);
			command.push('-o ' + 1);

		} else {

			command.push('-k ' + metric.key);
			command.push(('-o ' + (metric.hasOwnProperty('value') ? metric.value : 1)));

		}

		command = command.join(' ');
		exec(command, function (error, data) {
			console.log('Zabbix error', error);
			console.log('Zabbix data', data);
			console.log('Zabbix command', command);
		});
	});

};