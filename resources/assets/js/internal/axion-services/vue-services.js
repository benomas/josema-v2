if(typeof axionService==="undefined")
	var axionService = require('./axion-services.js');

var tree     = axionService('summary-tree');
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