
/**
 * First we will load all of this project"s JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require("./bootstrap");
//require("vue-resource");
var TWEEN = require('@tweenjs/tween.js');
import Vue2Filters from "vue2-filters";
import VueRouter   from "vue-router";
import Toaster     from 'v-toaster';
import Spinner 	   from 'vue-simple-spinner';
import 'v-toaster/dist/v-toaster.css';

// var vueLangs        = require("./langs.js");
var customFilters = require("./custom-filters");
/*
axios.interceptors.response.use(function (response) {
    // Do something with response data
    console.log("test");
	return response;
}, function (error) {
	// Do something with response error
	return Promise.reject(error);
});
*/
var axionService  = require("./axion-services/axion-services.js");

Vue.use(Toaster, {timeout: 5000});
Vue.use(VueRouter);
Vue.use(Vue2Filters);


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
var vueAppSpiner=Vue.component("vue-spinner",require("./components/plugins/vue-spinner.vue"));
// Vue.component("v-select-manager",require("./components/plugins/v-select-manager.vue"));
var vueAppHeader      = Vue.component("vue-header",require("./components/header.vue"));
var vueAppHelp        = Vue.component("vue-help",require("./components/help.vue"));
var vueAppBreadcrumbs = Vue.component("vue-breadcrumbs",require("./components/breadcrumbs.vue"));
var vueAppHome        = Vue.component("vue-home",require("./components/home.vue"));
var vueAppLevel       = Vue.component("vue-level",require("./components/level.vue"));
var vueAppTheme       = Vue.component("vue-theme",require("./components/theme.vue"));
var vueAppDocument    = Vue.component("vue-document",require("./components/activities/document.vue"));
var vueAppInfogram    = Vue.component("vue-infogram",require("./components/activities/infogram.vue"));
var vueAppSummary     = Vue.component("vue-summary",require("./components/activities/summary.vue"));
var vueAppInstance    = Vue.component("vue-instance",require("./components/activities/instance.vue"));
var vueAppVideo       = Vue.component("vue-video",require("./components/activities/video.vue"));
var vueAppReview      = Vue.component("vue-review",require("./components/activities/review.vue"));
var vueAppProgressBar = Vue.component("vue-progress-bar",require("./components/progress-bar.vue"));
var vueSpinner        = Vue.component("vue-simple-spinner",Spinner);

var router = new VueRouter({
    routes: [
    	{
			path      : "",
			component : vueAppHome,
			name      : "start",
    	},
    	{
			path      : "/ayuda",
			component : vueAppHelp,
			name      : "help"
    	},
    	{
			path      : "/nivel/:level",
			component : vueAppLevel,
			name      : "level",
			props     : true
    	},
    	{
			path      : "/nivel/:level/modulo/:module/tema/:theme/",
			component : vueAppTheme,
			name      : "theme",
			props     : true,
			children: [
		        {
					path      : "/nivel/:level/modulo/:module/tema/:theme/actividad/lectura/:activity/",
					component : vueAppDocument,
					name      : "document",
					prop     :true
		        },
		        {
					path      : "/nivel/:level/modulo/:module/tema/:theme/actividad/infograma/:activity/",
					component : vueAppInfogram,
					name      : "infogram",
					prop     :true
		        },
		        {
					path      : "/nivel/:level/modulo/:module/tema/:theme/actividad/resumen/:activity/",
					component : vueAppSummary,
					name      : "summary",
					prop     :true
		        },
		        {
					path      : "/nivel/:level/modulo/:module/tema/:theme/actividad/caso/:activity/",
					component : vueAppInstance,
					name      : "instance",
					prop     :true
		        },
		        {
					path     : "/nivel/:level/modulo/:module/tema/:theme/actividad/video/:activity/",
					component: vueAppVideo,
					name     : "video",
					prop     :true
		        },
		        {
					path      : "/nivel/:level/modulo/:module/tema/:theme/actividad/evaluacion/:activity/",
					component : vueAppReview,
					name      : "review",
					prop     :true
		        }
	        ]
    	}
 	]
})

router.beforeEach(function (to, from, next) {
	if(window.outerWidth>768)
  		window.scrollTo(0, 0)
  	next();
});

import vueServices from './axion-services/vue-services';
Vue.use(vueServices);

var customJs      = require("./custom-scripts");

Vue.mixin({
  methods: {
    numericAnimator: (instance,propertys) => {
		var final     = typeof propertys["final"]!=="undefined"?propertys["final"]:100;
		var initial   = typeof propertys["initial"]!=="undefined"?propertys["initial"]:0;
		var limitTime = typeof propertys["limitTime"]!=="undefined"?propertys["limitTime"]:1000;
		var time      = typeof propertys["time"]!=="undefined"?propertys["time"]:10;
		var increment = typeof propertys["increment"]!=="undefined"?propertys["increment"]:1;
		if( increment * limitTime/time < final)
    		increment = Math.floor(final/(limitTime/time))*2;
    	
    	setTimeout(function iteration() {
            if(instance[propertys["target"]]===null)
                instance[propertys["target"]]=initial;
            else{
                if(instance[propertys["target"]]<final)
                    instance[propertys["target"]]=instance[propertys["target"]]+increment;
                if(instance[propertys["target"]]>final)
                    instance[propertys["target"]]=final;
            }

            if(instance[propertys["target"]]<final)
	        	setTimeout(iteration, time)
	     }, time)
    }
  }
});

const app = new Vue({
	el: "#vue-app",
	data:{
		ready:false,
		showSpinner:false,
		tree:null,
		user:null,
		breadcrumbData:[],
        waitTime:4000,
        minBarPorcente:12,
		customJs,
		enableRouting:true
	},
	beforeCreate:function(){
		/*
		var _this = this;
		_this.$options.services.activity.callBackRedirector = function(){
			var devaultToasterOnHiddenCallBack = _this.$toaster.options.onHidden;
			_this.$toaster.options.onHidden=function(){ window.location="/"};
            _this.$toaster.info("Redirigiendo");
            console.log("called");
		}
		*/
	},
	mounted:function(){
	},
	created:function(){
		this.getTree();
		this.$router.beforeResolve((to, from, next) => {
			if(this.enableRouting)
				next();
			else
                this.$toaster.warning("Sincronización en progreso, por favor espera");
		})
	},
    methods:{
		getTree:function(){
    		var _this = this;
    		_this.showSpinner=true;
			_this.ready=false;
    		_this.$options.services.tree.get("",{
			}).then(function (response) {
			    _this.tree = _this.treeInitializer(response.data.tree);
			    _this.user = response.data.user;
    			_this.showSpinner=false;
    			_this.ready=true;
			}).catch(function (error) {
    			_this.showSpinner=false;
			});
    	},
    	treeInitializer(tree){
    		if(typeof tree!=="undefined"){
				var childrenKeys = Object.keys(tree);
				if(childrenKeys.length)
					for(var i=0;i<childrenKeys.length;i++){
						this.linkToParent(tree[childrenKeys[i]]);
					}
    		}
    		return tree;
    	},
    	linkToParent:function(subTree,parent){
    		if(typeof subTree!=="undefined"){
    			subTree["relativeSegmentRoute"] = "/"+subTree.level.level_slug+"/"+subTree.sublevel_slug;
    			subTree["absoluteSegmentRoute"] = "/"+subTree.level.level_slug+"/"+subTree.sublevel_slug;
    			if(typeof parent!=="undefined"){
    				subTree["parent"]=parent;
    				subTree["absoluteSegmentRoute"]=parent["absoluteSegmentRoute"]+subTree["absoluteSegmentRoute"];
    			}
    			if(typeof subTree.children!=="undefined"){
    				var childrenKeys = Object.keys(subTree.children);
    				if(childrenKeys.length)
    					for(var i=0;i<childrenKeys.length;i++){
    						this.linkToParent(subTree.children[childrenKeys[i]],subTree);
    					}
    			}
    			else{
    				if(typeof subTree.children!=="activities"){
	    				var activityKeys = Object.keys(subTree.activities);
	    				if(activityKeys.length)
	    					for(var i=0;i<activityKeys.length;i++){
	    						subTree.activities[activityKeys[i]]["parent"]=subTree;
	    						subTree.activities[activityKeys[i]]["absoluteSegmentRoute"]=subTree["absoluteSegmentRoute"]+
	    						"/actividad/"+subTree.activities[activityKeys[i]]["activity_type"]["slug"]+"/"+activityKeys[i];
	    					}
    				}
    			}
    		}
    	},
		treeResume:function(){
			var resume ={
				tAct:0,
				cAct:0,
				tQue:0,
				hits:0
			};
			if(typeof this.tree!==undefined){
	    		var keys = Object.keys(this.tree);
	    		for(var i=0;i<keys.length;i++){
	    			resume.tAct+=parseInt(this.tree[keys[i]].tAct);
	    			resume.cAct+=parseInt(this.tree[keys[i]].cAct);
	    			resume.tQue+=parseInt(this.tree[keys[i]].tQue);
	    			resume.hits+=parseInt(this.tree[keys[i]].hits);
	    		}
			}
    		return resume;
		}
    },
	router: router
});
