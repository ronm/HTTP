Http
=========

XMLHttpRequest Object

Usage
------

```js
import Http from './Http'
```

or

```html
<script type="text/javascript" src="http.js"></script>
```

then

```js
var http = new Http();

http.get(url = 'string', data = {}).then(res => console.log(res));
```


Methods
-------

#### get

```js
new Http().get(url,data);
```


#### post

```js
new Http().post(url,data);
```


#### delete

```js
new Http().delete(url,data);
```


#### put

```js
new Http().put(url,data);
```


#### jsonp

```js
new Http().jsonp(url);
```



Options
-------

Options are set when initializing the Http object.


#### headers: null (optional parameter)

`object`


```js
var http = new Http({headers: {"Content-type": "application/x-www-form-urlencoded"}});

http.get(url = 'string', data = {})	.then(res => console.log(res));
```