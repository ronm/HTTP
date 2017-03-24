//import "babel-polyfill"
//import 'core-js'
import 'core-js/modules/es6.promise'

class $http {
	constructor(url) {
		this.url = url;
		this.client = new XMLHttpRequest();
		return this._methods();
	}

	ajax(method, options = {}) {
		return new Promise((resolve, reject) => {
			var params = [];

			if ( options.data ) {
				for (var key in options.data) { 
					if(options.data.hasOwnProperty(key)) { 
						params.push(encodeURI(key) + "=" + encodeURI(options.data[key])); 
					} 
				}
				
				this.url += "?" + params.join("&");
			}
			
			this.client.addEventListener("load", () => (this.client.status >= 200 && this.client.status < 300) ? resolve(this.client.response, this.client) : reject(this.client));

			this.client.addEventListener("error", () => reject(client));
			
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

			this.client.send();			
		});	
	}
	
	_methods() {
		var methods = {};
		["get", "post", "put", "devare"].forEach(m => methods[m] = (o => this.ajax(m,o)));

		return methods;
	}
}

module.exports = $http;