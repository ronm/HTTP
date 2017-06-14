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
	class Http {
		constructor(url, options = {}) {
			this._headers = {};
			this._data = {};
			this.client = new XMLHttpRequest();
		}
	
		request(method, data) {
			let isData = Object.keys(this.data()).length, 
				headers = Object.keys(this._headers);
				
			this.url = url + (isData && ["get","delete"].indexOf(method)>-1 ? ("?" + this._formatData()) : "");

			this.client.open(method, this.url);
			
			if ( headers.length ) {
				headers.forEach(key => this.client.setRequestHeader(key, this._headers[key]));
			}
			
			if ( isData && !this._headers["Content-type"]) {
				this.client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			}			
					
			return new Promise((good, bad) => {
				this.client.addEventListener("load", () => (this._is200()) ? good(this.client.response, this.client) : bad(this.client));
				this.client.addEventListener("error", () => bad(this.client));	
				this.client.send((isData && ["post","put"].indexOf(method)>-1)?this._formatData():null);
			});	
		}


		/*******************
		*** ajax methods ***
		*******************/		
		get(url,data,options) { return this.request("get",url,data,options); }
		post(url,data,options) { return this.request("post",url,data,options); }
		put(url,data,options) { return this.request("put",url,data,options); }
		delete(url,data,options) { return this.request("delete",url,data,options); }
	
	
		/**************
		*** helpers ***
		**************/
		headers(header = null) {
			if ( header ) {
				Object.keys(header).forEach(k => this._headers[k] = header[k]);
				return this;
			} else {
				return this._headers;
			}
		}
		
		data(data) {
			if ( data ) {
				Object.keys(data).forEach(k => this._data[encodeURI(k)] = encodeURI(data[k]));
				return this;
			} else {
				return this._data;
			}			
		}
		
		
		/**********************
		*** private helpers ***
		**********************/
		_formatData() {
			return Object.keys(this._data).map(key => key + "=" + this._data[key]).join("&");
		}
	
		_addHeaders(headers) {
			headers.forEach(h => {
				let k = Object.keys(h)[0];
				this.client.setRequestHeader(k, h[k]);
			});
		}
		
		_is200() {
			return this.client.status >= 200 && this.client.status < 300;
		}	
	}
	
	return function() { return new Http(); }
	
}));