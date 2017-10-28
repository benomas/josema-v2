if(typeof axionService==="undefined")
	var axionService = require('./axion-services.js');

var passportService     = axionService('');

const vueServices = {
	install(Vue, options) {
		Vue.mixin({
			services:{
				passportService:passportService
			}
	    });
	}
};
export default vueServices;