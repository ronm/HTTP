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
	return class $http {
		constructor(url) {
			this.url = url;
			this.client = new XMLHttpRequest();
			return this._methods();
		}
	
		ajax(method, options = {}) {
			return new Promise((resolve, reject) => {
				var params = [], data = null;
	
				
				if ( options.data ) {
					for (var key in options.data) {
						if(options.data.hasOwnProperty(key)) { 
							params.push(encodeURI(key) + "=" + encodeURI(options.data[key])); 
						} 
					}
					
					if (method.toUpperCase() == "GET") {
						this.url += "?" + params.join("&");
					} else if (method.toUpperCase() === "POST") {
						data = params.join("&");
					}
				}
				
				this.client.addEventListener("load", () => (this.client.status >= 200 && this.client.status < 300) ? resolve(JSON.parse(this.client.response), this.client) : reject(this.client));
	
				this.client.addEventListener("error", () => reject(this.client));
				
				this.client.open(method, this.url);
	
				if ( options.data ) {
					this.client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				}
				
				if ( options.headers ) {
					options.headers.forEach(h => {
						var k = Object.keys(h)[0];
						this.client.setRequestHeader(k, h[k]);
					});
				}
	
				if ( data ) { 
					this.client.send(data);
				} else {
					this.client.send();
				}
			});	
		}
		
		_methods() {
			var methods = {};
			["get", "post", "put", "devare"].forEach(m => methods[m] = (o => this.ajax(m,o)));
	
			return methods;
		}
		
	}
}));