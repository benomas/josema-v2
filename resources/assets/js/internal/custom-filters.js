if(typeof customJs==='undefined')
	var customJs = require('./custom-scripts');

if(typeof Vue !=='undefined'){

	Vue.filter('strPad', function (value,stringBase) {
		if(typeof stringBase==='undefined')
			stringBase='0000';

		return customJs.str_pad(value,stringBase);
	});

	Vue.filter('round', function (value, exp) {
		if(typeof value ==='undefined')
			return 0;
		return customJs.round10(value, exp);
	});
}