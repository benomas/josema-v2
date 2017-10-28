var customJs =  {
	decimalAdjust:function(type, value, exp) {
		// Si el exp no está definido o es cero...
		if (typeof exp === 'undefined' || +exp === 0) {
		  return Math[type](value);
		}
		value = +value;
		exp = +exp;
		// Si el valor no es un número o el exp no es un entero...
		if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
		  return NaN;
		}
		// Shift
		value = value.toString().split('e');
		value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
		// Shift back
		value = value.toString().split('e');
		return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
	},
	round10:function(value, exp) {
	  return this.decimalAdjust('round', value, exp);
	},
	str_pad:function(value,stringBase){
		return String(stringBase + value).slice(-stringBase.length);
	},
	getSelectLabel:function(collection,value,valueProperty,labelProperty){

		if(typeof value==='undefined' || !value)
			return null;

		if(typeof valueProperty==='undefined')
			valueProperty='value';

		if(typeof labelProperty==='undefined')
			labelProperty='label';

		for(let i=0;i<collection.length;i++){
			if(	typeof collection[i][valueProperty] !=='undefined' &&
				collection[i][valueProperty]===value &&
				typeof collection[i][labelProperty] !=='undefined'
			)
				return collection[i][labelProperty];
		}
		return null;
	},
	getSelectItem:function(collection,value,valueProperty){

		if(typeof value==='undefined' || !value)
			return null;

		if(typeof valueProperty==='undefined')
			valueProperty='value';

		for(let i=0;i<collection.length;i++){
			if(	typeof collection[i][valueProperty] !=='undefined' &&
				collection[i][valueProperty]===value
			)
				return collection[i];
		}
		return null;
	},
	isDecimalFloat:function(tryFloat){

		if(typeof tryFloat ==='undefined')
			return false;

		var patt = new RegExp(/^[-]{0,1}[0-9]*[\.]{0,1}[0-9]*$/);
		var newParsedFloat;

		if(!patt.test(tryFloat))
			return false;

		newParsedFloat = parseFloat(tryFloat);

		if(isNaN(newParsedFloat))
			return false;
		
		return true;
	},
	isDecimalInt:function(tryInt){

		if(typeof tryInt ==='undefined')
			return false;

		var patt = new RegExp(/^[1-9]+[0-9]*$/);
		var newParsedFloat;

		if(!patt.test(tryInt))
			return false;

		newParsedFloat = parseFloat(tryInt);

		if(isNaN(newParsedFloat))
			return false;
		
		return true;
	}
}

module.exports = customJs;
