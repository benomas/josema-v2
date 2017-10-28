var customJs      = require("./custom-scripts");
var globalMethods =  {
	getPorcent:function(sublevel,minValue,maxValue){ 
		var calculetPercente = sublevel.tAct==0?0:customJs.round10(Number(100*(sublevel.cAct/sublevel.tAct)),0); 
		if(typeof minValue !=="undefined" && minValue > calculetPercente)
			return minValue;
		return calculetPercente;
	},
	getSubTree:function(tree,params){
		if(typeof params ==="undefined" || params.length===0)
			return tree;

		var paramKeys = Object.keys(params);
		var tempTree=tree;
		for(var i=0;i<paramKeys.length;i++){
			if(typeof tempTree[params[paramKeys[i]]] !=="undefined")
				tempTree=tempTree[params[paramKeys[i]]];
			else
				if(typeof tempTree.children!=="undefined" && typeof tempTree.children[params[paramKeys[i]]] !=="undefined")
					tempTree=tempTree.children[params[paramKeys[i]]];
		}
		return tempTree;
	},
	checkStrictOrder:function(){
		
	}
}

module.exports = globalMethods;
