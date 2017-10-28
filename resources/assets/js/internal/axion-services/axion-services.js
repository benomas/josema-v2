window.axios = require('axios');
var axionService = function(servicePrefix,baseServiceUr){

	this.config = {
		//cross domain baseUrl
		//baseURL            : 'http://dev.cime/api/',
		baseURL            : '/',
		headers            : {
			'X-Requested-With' : 'XMLHttpRequest',
			//'X-CSRF-TOKEN'     : window.Laravel.csrfToken,
			'Content-Type'     : 'application/json'
		},
		timeout            : 15000,
		responseType       : 'json',
		maxContentLength   : 20000,
		callBackRedirector:null
		/*
			method: 'get', // default
			transformRequest: [function (data) {
				return data;
			}],

			transformResponse: [
				function (data) {
					return data;
				}
			],

			params: {
				ID: 12345
			},

			paramsSerializer: function(params) {
				return Qs.stringify(params, {arrayFormat: 'brackets'})
			},

			data: {
				firstName: 'Fred'
			},

			withCredentials: false, // default

			adapter: function (config) {
			},

			auth: {
				username: 'janedoe',
				password: 's00pers3cret'
			},


			onUploadProgress: function (progressEvent) {
			},

			onDownloadProgress: function (progressEvent) {
			},


			validateStatus: function (status) {
				return status >= 200 && status < 300;
			},

			maxRedirects: 5,

			httpAgent: new http.Agent({ keepAlive: true }),
			httpsAgent: new https.Agent({ keepAlive: true }),

			proxy: {
				host: '127.0.0.1',
				port: 9000,
				auth: {
				  username: 'mikeymike',
				  password: 'rapunz3l'
				}
			},

			cancelToken: new CancelToken(
			function (cancel) {

			})
		*/
	};

	this.config.baseURL = baseServiceUr || this.config.baseURL;
	this.config.baseURL = this.config.baseURL + ( servicePrefix || '' );
	newAxios = axios.create(this.config);
	newAxios.interceptors.request.use(function (config) {
	    // Do something before request is sent
	    return config;
  	}, function (error) {
	    // Do something with request error
	    return Promise.reject(error);
  	});

	// Add a response interceptor
	newAxios.interceptors.response.use(function (response) {
	    // Do something with response data
	    return response;
  	}, function (error) {
	    // Do something with response error
	    switch(error.response.status){
	    	case 401:
	    		window.location="/";
	    		break;
	    	case 409:
	    		location.reload(); 
	    		break;
	    	default:return Promise.reject(error);
	    }
  	});
	return newAxios;// Add a request interceptor
};

module.exports = axionService;

