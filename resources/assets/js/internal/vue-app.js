
/**
 * First we will load all of this project"s JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require("./bootstrap");
//require("vue-resource");
require('chart.js');
// vue-charts package
require('hchs-vue-charts');
var TWEEN = require('@tweenjs/tween.js');
import Vue2Filters from "vue2-filters";
import VueRouter   from "vue-router";
import Toaster     from 'v-toaster';
import Spinner 	   from 'vue-simple-spinner';
import 'v-toaster/dist/v-toaster.css';

var customFilters = require("./custom-filters");
var axionService  = require("./axion-services/axion-services.js");

Vue.use(Toaster, {timeout: 5000});
Vue.use(VueRouter);
Vue.use(Vue2Filters);
Vue.use(VueCharts);


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
var vueAppSpiner         = Vue.component("vue-spinner",require("./components/plugins/vue-spinner.vue"));
var vueAppHeader         = Vue.component("vue-header",require("./components/header.vue"));
var vueAppHelp           = Vue.component("vue-help",require("./components/help.vue"));
var vueAppBreadcrumbs    = Vue.component("vue-breadcrumbs",require("./components/breadcrumbs.vue"));
var vueAppProgressDetail = Vue.component("vue-progress-detail",require("./components/progress-detail.vue"));
var vueAppProgressBar    = Vue.component("vue-progress-bar",require("./components/progress-bar.vue"));
var vueAppHome           = Vue.component("vue-home",require("./components/home.vue"));
var vueAppLevel          = Vue.component("vue-level",require("./components/level.vue"));
var vueAppRecursiveLink  = Vue.component("vue-recursive-link",require("./components/recursive-link.vue"));
var vueSpinner           = Vue.component("vue-simple-spinner",Spinner);

var router = new VueRouter({routes: []})

import vueServices from './axion-services/vue-services';
Vue.use(vueServices);

var customJs           = require("./custom-scripts");

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
		ready         :false,
		showSpinner   :false,
		breadcrumbData:[],
		minBarPorcente:9,
		customJs,
		enableRouting :true,
		prueba:"esto es una prueba"
	},
	mounted:function(){
	},
	created:function(){
	},
    methods:{
    },
	router:router
});
