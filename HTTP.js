//import 'core-js/modules/es6.promise'
//https://gist.github.com/EtienneR/2f3ab345df502bd3d13e

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.Http = factory();
  }
}(this, function () {
	return class Http {
		constructor(options = {}) {
			// store headers
			this.headers = {};
			this._addHeaders(options.headers);
			
			// create client
			this.client = new XMLHttpRequest();
		}
	
		request(method, url, data) {
			
			//open url
			this.client.open(method, url + (data && ["get","delete"].indexOf(method)>-1 ? ("?" + this._formatData(data)) : ""));
			
			// headers
			Object.keys(this.headers).forEach(key => this.client.setRequestHeader(key, this.headers[key]));
			if ( data && !this.headers["Content-type"]) {
				this.client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			}

			// promise
			return new Promise((good, bad) => { 
				// client bindings
				this.client.addEventListener("load", () => (this._is200()) ? good(this.client.response, this.client) : bad(this.client));
				this.client.addEventListener("error", () => bad(this.client));				
				
				// send request
				this.client.send((data && ["post","put"].indexOf(method)>-1)?this._formatData(data):null)
			});
		}


		/*******************
		*** ajax methods ***
		*******************/		
		get(url,data) { return this.request("get",url,data); }
		post(url,data) { return this.request("post",url,data); }
		put(url,data) { return this.request("put",url,data); }
		delete(url,data) { return this.request("delete",url,data); }
		
		
		/**********************
		*** private helpers ***
		**********************/
		_formatData(data = {}) {
			return Object.keys(data).map(key => key + "=" + data[key]).join("&");
		}
		
		_addHeaders(headers = {}) {
			Object.keys(headers).forEach(k => this.headers[k] = headers[k]);
		}		
		
		_is200() {
			return this.client.status >= 200 && this.client.status < 300;
		}
		
		// *** Options
		// add form headers by deafult for post
		// parseJSON
	}	
}));