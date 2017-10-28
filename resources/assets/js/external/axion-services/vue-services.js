if(typeof axionService==="undefined")
	var axionService = require('./axion-services.js');

var tree     = axionService('tree');
var activity = axionService('');

const vueServices = {
	install(Vue, options) {
		Vue.mixin({
			services:{
				tree:tree,
				activity:activity
			}
	    });
	}
};
export default vueServices;